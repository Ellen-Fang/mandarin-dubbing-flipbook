# Mandarin Dubbing Perception Flipbook

這是一個可部署到 GitHub Pages 的靜態翻頁網站，用來展示完整研究文件。

## 檔案結構

```text
index.html
style.css
script.js
assets/
  report.pdf
  pages/
    page-01.webp
    page-02.webp
    ...
```

## 部署到 GitHub Pages

1. 建立 repo，例如 `mandarin-dubbing-flipbook`。
2. 將本資料夾內所有檔案上傳到 repo 根目錄。
3. 進入 GitHub repo 的 Settings → Pages。
4. Source 選擇 `Deploy from a branch`。
5. Branch 選擇 `main`，資料夾選 `/root`。
6. 儲存後等待 GitHub Pages 產生網址。

## 建議

- QR Code 請使用 GitHub Pages 產生的網址。
- `assets/report.pdf` 是完整研究 PDF。
- 翻頁器使用已轉好的 WebP 頁面圖片，不需要後端。
