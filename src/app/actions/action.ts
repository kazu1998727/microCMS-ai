"use server";

const insertBlogAction = async (formData: FormData) => {
  const title = formData.get("title");
  const context = formData.get("context");

  const response = await fetch(
    `https://${process.env.MICROCMS_SERVICE_DOMAIN!}.microcms.io/api/v1/blog`,
    {
      method: "POST",
      body: JSON.stringify({ title, context }),
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.MICROCMS_API_KEY!,
      },
    }
  );
  const data = await response.json();

  return data;
};

const generateRichBlogAction = async (formData: FormData) => {
  const context = formData.get("context");
  const response = await fetch(
    `http://localhost:3000/api/blog/generate-rich-blog-blog`,
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
