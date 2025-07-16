// node.jsの標準ライブラリであるhttpとurlを読み込む
import http from 'node:http';
import { URL } from 'node:url';

// 環境変数PORTが設定されていればその値を、なければ8888をポートとして使用する
const PORT = process.env.PORT || 8888;

// httpサーバーを作成する
const server = http.createServer((req, res) => {
  // リクエストURLをパースする
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = requestUrl.pathname;
  console.log(`Request for ${path} received.`);

  // レスポンスのヘッダーを設定する。文字コードをutf-8に指定
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  // パスに応じて処理を分岐する
  if (path === '/') {
    // ルートパスへのアクセス
    console.log("Routing for /");
    res.writeHead(200); // ステータスコード 200 (OK)
    res.end('ひようら検索データベース');
  } else if (path === '/ask') {
    // /ask パスへのアクセス
    console.log("Routing for /ask");
    // クエリパラメータ 'q' を取得する
    const query = requestUrl.searchParams.get('q');
    if (query) {
      res.writeHead(200); // ステータスコード 200 (OK)
      res.end(`Your question is '${query}'`);
    } else {
      res.writeHead(400); // ステータスコード 400 (Bad Request)
      res.end('質問が指定されていません。');
    }
  } else {
    // それ以外のパスへのアクセス
    console.log("Routing for 404 Not Found");
    res.writeHead(404); // ステータスコード 404 (Not Found)
    res.end('ページが見つかりません。');
  }
});

// 指定したポートでサーバーを起動する
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});