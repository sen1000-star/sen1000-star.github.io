# English Audio

QRコードから教材音声を再生するためのGitHub Pages用サイトです。

音声一覧は `/list.html` にあります。タイトル検索・年度の絞り込みに対応し、`tracks.json` の登録内容を表示します。

## 検索への掲載について

`index.html` と `list.html` に `noindex,nofollow,noarchive` を設定しています。Googleなど、この指示を守る検索エンジンにページを掲載しないよう指示します。`noindex` を読み取れるよう、HTMLページのクロールをrobots.txtで禁止しません。

これはアクセス制限ではありません。URLを知る人は閲覧でき、公開GitHubリポジトリや直接のWAV・JSON URLにはHTMLのmeta設定は適用されません。完全な非公開が必要な場合は認証付きの配信先が必要です。

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
