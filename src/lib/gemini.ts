import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// 環境変数を読み込み
dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateRichBlog(context: string) {
  const systemInstruction = `
【あなたの役割】
- ブログのcontextをリッチエディタに変換する
- 文章から読み取って、見出し、段落、リスト、テーブル、リンク、画像、ファイルを生成する

【ブログのcontext】
${context}

【重要な出力ルール】
- 必ずHTMLのみを返してください
- マークダウン記法は一切使用しないでください
- 説明文やコメントは含めないでください
- プレーンテキストとしてHTMLタグのみを出力してください
- 改行は含めないでください（1行のHTMLとして出力）

【基本ルール】
- リクエストに渡すHTML文字列は、ダブルクォーテーションのエスケープ(\")もしくはシングルクォーテーション(')への置換が必要となります。
- 表示の都合上、当ドキュメントでは改行を含めてHTMLを表示していますが、実際のリクエストには改行を含めないでください。


#### 見出し・段落
<h1>見出し1</h1>  <!-- h1〜h5対応 -->
<p>段落テキスト</p>
<p>改行は<br>brタグで実現</p>


#### テキスト装飾
<strong>太字</strong>
<em>斜体</em>
<u>下線</u>
<s>打ち消し線</s>
<code>インラインコード</code>
<span style='color: #ff0000'>文字色指定</span>


#### テキスト配置
<p>左揃え（デフォルト）</p>
<p style='text-align:center'>中央揃え</p>
<p style='text-align:right'>右揃え</p>

### ブロック要素
#### 引用・区切り線
<blockquote>引用テキスト</blockquote>
<hr>

#### コードブロック
<!-- 基本形 -->
<pre><code>コード内容</code></pre>

<!-- ファイル名と言語指定 -->
<div data-filename='greeting.js'>
  <pre><code class='language-javascript'>const greeting = 'Hello';</code></pre>
</div>

### リスト
#### 番号付きリスト
<ol>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
</ol>

#### 箇条書きリスト
<ul>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
</ul>


#### テーブル
<table>
  <tbody>
    <tr>
      <th colspan='1' rowspan='1'><p>ヘッダー</p></th>
      <td colspan='1' rowspan='1'><p>データ</p></td>
    </tr>
  </tbody>
</table>


#### リンク
<!-- 基本リンク -->
<p><a href='https://example.com'>リンクテキスト</a></p>

<!-- 別タブで開く -->
<p><a href='https://example.com' target='_blank'>外部リンク</a></p>


#### 画像
<!-- 基本形（microCMSドメインのみ） -->
<img src='https://images.microcms-assets.io/assets/service/test/file.png' 
     alt='' width='1200' height='630' />

<!-- カスタムサイズ指定 -->
<img src='https://images.microcms-assets.io/assets/service/test/file.png?w=1200&h=630' 
     alt='' width='1200' height='630' />

<!-- キャプション付き -->
<figure>
  <img src='画像URL' alt='' width='1200' height='630' />
  <figcaption>キャプション</figcaption>
</figure>

<!-- 画像配置 -->
<figure style='text-align: center;'>
  <img src='画像URL' alt='' width='1200' height='630' />
</figure>


#### ファイル
<p><a data-embed-type='file' 
      href='https://files.microcms-assets.io/assets/service/test/file.pdf'>
      file.pdf
</a></p>

【重要な制限事項】
-非対応機能
- 文字サイズの指定
- 埋め込み編集
- 外部URLの画像（microCMSドメイン以外）
- 外部URLのファイル

注意点
- ネスト制限: リストの深いネストは保存制約でエラーの可能性
- カラーコード: HEX/RGB/RGBA形式対応（レスポンスはHEX形式）
- ツールバー設定: オフの装飾ボタンに対応するタグは無視される
- パースエラー: 失敗時は<p>タグのテキストとして処理

API設定依存
- カラープリセット有効時：指定色のみ適用可能
- カスタムドメイン設定時：設定ドメインの画像/ファイル使用可能

`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemInstruction,
    
  });

  return response.text;
}

export async function generateBlog(context: string) {
  const systemInstruction = `
     あなたはブログのcontextを校正するエージェントです。

     【あなたの役割】
     - ブログのcontextを校正する

     【ブログのcontext】
     ${context}

     【基本ルール】
     - ブログのcontextを校正する
     - 文章は大きく変更しない
     - 整える程度で良い

     `;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemInstruction,
  });

  return response.text;
}
