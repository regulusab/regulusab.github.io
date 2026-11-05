#!/usr/bin/env python3
"""從 /workspace/portal-inbox/<key>/ 同步 info.txt 與 icon.png 到 sites.json / icons/，並 commit + push。
info.txt 格式：可用「name: / 名稱：」「intro: / 簡介：」「url: / 網址：」標籤行，或三行純文字（名稱、簡介、網址）。
用法：python3 sync.py [--no-push]"""
import json, os, re, shutil, subprocess, sys
REPO = os.path.dirname(os.path.abspath(__file__))
INBOX = "/workspace/portal-inbox"
KEYS = {"name": ("name", "名稱", "名字", "站名"), "intro": ("intro", "description", "desc", "簡介", "介紹", "說明"), "url": ("url", "網址", "link", "連結")}

def parse(path):
    lines = [l.strip() for l in open(path, encoding="utf-8-sig") if l.strip()]
    out, plain = {}, []
    for l in lines:
        m = re.match(r"^([^:：]{1,20})\s*[:：]\s*(.+)$", l)
        k = m and next((f for f, al in KEYS.items() if m.group(1).strip().lower() in al), None)
        if k: out[k] = m.group(2).strip()
        else: plain.append(l)
    if not out and plain:
        for f, v in zip(("name", "intro", "url"), plain): out[f] = v
    if "url" in out and not re.match(r"^https?://", out["url"]): out.pop("url")
    return out

def main():
    sj = os.path.join(REPO, "sites.json")
    sites = json.load(open(sj, encoding="utf-8"))
    for s in sites:
        d = os.path.join(INBOX, s["key"])
        info, icon = os.path.join(d, "info.txt"), os.path.join(d, "icon.png")
        if os.path.isfile(info):
            data = parse(info); s.update(data)
            if data: print(f"[{s['key']}] info: {data}")
        if os.path.isfile(icon):
            dst = os.path.join(REPO, "icons", f"{s['key']}.png")
            try:
                from PIL import Image
                im = Image.open(icon).convert("RGBA"); im.thumbnail((256, 256)); im.save(dst, optimize=True)
            except ImportError:
                shutil.copyfile(icon, dst)
            s["icon"] = f"icons/{s['key']}.png"; print(f"[{s['key']}] icon updated")
        s["placeholder"] = not (os.path.isfile(info) and os.path.isfile(icon))
    json.dump(sites, open(sj, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    # 更新 nav.js 內嵌清單
    nj = os.path.join(REPO, "nav", "nav.js")
    lst = json.dumps([{"key": s["key"], "name": s["name"], "url": s["url"]} for s in sites], ensure_ascii=False)
    src = open(nj, encoding="utf-8").read()
    open(nj, "w", encoding="utf-8").write(re.sub(r"var SITES=.*?;\n", lambda m: f"var SITES={lst};\n", src, count=1, flags=re.S))
    git = lambda *a: subprocess.run(["git", "-C", REPO, *a], check=True, capture_output=True, text=True).stdout
    git("add", "-A", "sites.json", "icons", "nav/nav.js")
    if not git("status", "--porcelain", "sites.json", "icons", "nav"):
        print("沒有變更。"); return
    git("commit", "-m", "sync: 從 portal-inbox 更新網站資料")
    if "--no-push" not in sys.argv: git("push", "origin", "main"); print("已推送。")
    else: print("已 commit（未推送）。")

if __name__ == "__main__": main()
