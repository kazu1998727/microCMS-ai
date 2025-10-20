// src/app/api/[...route].ts
import { generateBlog, generateRichBlog } from "@/lib/gemini";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");


//ブログ作成
app.post("/blog", async (c) => {
  const { title, context } = await c.req.json();
  return c.json({
    message: "Blog created",
    title,
    context,
  });
});

app.post("/blog/generate-rich-blog", async (c) => {
  const { context } = await c.req.json();
  const response = await generateRichBlog(context);
  // console.log(response);
  return c.json({
    message: "Blog generated",
    response,
  });
});

app.post("/blog/generate-blog", async (c) => {
  const { context } = await c.req.json();
  const response = await generateBlog(context);
  return c.json({
    message: "Blog generated",
    response,
  });
});

export const POST = handle(app);