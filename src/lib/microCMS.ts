const updateBlogStatustoDraft = async (id: string) => {
  console.log("id", id);
  const response = await fetch(
    `https://${process.env
      .MICROCMS_SERVICE_DOMAIN!}.microcms-management.io/api/v1/contents/blog/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: ["DRAFT"],
      }),
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY!,
      },
    }
  );

  // レスポンスが成功でない場合はエラーを投げる
  if (!response.ok) {
    const errorText = await response.text();
    console.error("ステータス更新エラーレスポンス:", errorText);
    throw new Error(
      `ステータス更新に失敗しました: ${response.status} - ${errorText}`
    );
  }

  // レスポンスが成功の場合のみJSONパースを実行
  try {
    return await response.json();
  } catch (error) {
    console.error("JSONパースエラー:", error);
    throw new Error("レスポンスの解析に失敗しました");
  }
};

export default updateBlogStatustoDraft;
