"use server";

import updateBlogStatustoDraft from "@/lib/microCMS";

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
  };

  // console.log("送信するリクエストボディ:", requestBody);

  const response = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN!}.microcms.io/api/v1/blog`,
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

  const id = await data.id;

  //ブログのステータスを下書きに変更
  try {
    const responseDraft = await updateBlogStatustoDraft(id);
    console.log("ステータス更新成功:", responseDraft);
  } catch (error) {
    console.error("ステータス更新エラー:", error);
    // ステータス更新に失敗しても、ブログの作成は成功しているので警告のみ
    console.warn("ブログは作成されましたが、ステータスの更新に失敗しました");
  }

  return data;
};

const generateRichBlogAction = async (context: string) => {
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
