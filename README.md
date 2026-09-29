# English Audio

QRコードから教材音声を再生するためのGitHub Pages用サイトです。

## 音声の追加例

1. `audio` フォルダに `smart-stickers.mp3` を置きます。
2. `tracks.json` を次のように編集します。

```json
{
  "smart-stickers": {
    "title": "Smart Stickers",
    "subtitle": "Eiken Pre-1 2019-2",
    "file": "audio/smart-stickers.mp3"
  }
}
```

3. QRコードには次のURLを設定します。

`https://sen1000-star.github.io/?track=smart-stickers`
