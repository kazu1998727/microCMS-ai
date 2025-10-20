"use server";

// src/app/actions/action.ts の修正

const insertBlogAction = async (formData: FormData) => {
  const title = formData.get("title");
  const context = formData.get("context");

  // console.log("送信データ:", { title, context });
  
  if (!title || !context) {
    throw new Error("タイトルとコンテンツは必須です");
  }

  // microCMSのAPIに送信するデータ形式を修正
  const requestBody = {
    title: title.toString(),
    content: context.toString(),
    // 必要に応じて他のフィールドも追加
    // status: "DRAFT", // 下書きとして保存する場合
    // publishedAt: new Date().toISOString(), // 公開日時
  };

  // console.log("送信するリクエストボディ:", requestBody);

  const response = await fetch(
    `https://${process.env
      .MICROCMS_SERVICE_DOMAIN!}.microcms.io/api/v1/blog?status=${process.env
      .MICROCMS_SERVICE_DOMAIN!}`,
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.MICROCMS_API_KEY!,
      },
    }
  );

  // エラーレスポンスの詳細を取得
  if (!response.ok) {
    const errorText = await response.text();
    console.error("エラーレスポンス:", errorText);
    throw new Error(`投稿に失敗しました: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data;
};

const generateRichBlogAction = async (context:string) => {
  // const context = formData.get("context");
  const response = await fetch(
    `http://localhost:3000/api/blog/generate-rich-blog`,
    {
      method: "POST",
      body: JSON.stringify({ context }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

const generateBlogAction = async (formData: FormData) => {
  const context = formData.get("context");
  const response = await fetch(`http://localhost:3000/api/blog/generate-blog`, {
    method: "POST",
    body: JSON.stringify({ context }),
  });
  return response.json();
};

export { insertBlogAction, generateRichBlogAction, generateBlogAction };
