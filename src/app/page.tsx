"use client";

import { useState } from "react";
import { generateRichBlogAction } from "./actions/action";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    context: "",
  });

 
  return (
    <div className="font-sans min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            コンテンツ作成フォーム
          </h1>

          <form action={generateRichBlogAction} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                タイトル
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="タイトルを入力してください"
                required
              />
            </div>

            <div>
              <label
                htmlFor="context"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                コンテキスト
              </label>
              <textarea
                id="context"
                name="context"
                value={formData.context}
                onChange={(e) =>
                  setFormData({ ...formData, context: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-vertical"
                placeholder="コンテキストを入力してください"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({ ...formData, title: "", context: "" });
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              >
                リセット
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
