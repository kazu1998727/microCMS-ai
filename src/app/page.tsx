"use client";

import { useState } from "react";
import { generateBlogAction, generateRichBlogAction, insertBlogAction } from "./actions/action";

type FormState = "input" | "confirm" | "submitting" | "completed";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    context: "",
  });
  const [formState, setFormState] = useState<FormState>("input");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{ content?: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataObj = new FormData();
      formDataObj.append("context", formData.context);
      
      const result = await generateBlogAction(formDataObj);


      setGeneratedContent({
        content: result.response,
      });

      // 編集データを初期化
      setEditData({
        title: formData.title,
        content: result.response,
      });

      setFormState("confirm");
    } catch (error) {
      console.error("生成エラー:", error);
      setFormState("input");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    
    try {
      const formDataObj = new FormData();
      formDataObj.append("title", editData.title || formData.title);
      // formDataObj.append("context", editData.content || generatedContent?.content || formData.context);

      const generatedText = await generateRichBlogAction(editData.content);
      formDataObj.append("context", generatedText.response);
      await insertBlogAction(formDataObj);
      setFormState("completed");
    } catch (error) {
      console.error("投函エラー:", error);
      setFormState("confirm");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setFormState("input");
    setGeneratedContent(null);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSave = () => {
    setGeneratedContent({
      content: editData.content,
    });
    setIsEditing(false);
  };

  const handleReset = () => {
    setFormData({ title: "", context: "" });
    setFormState("input");
    setGeneratedContent(null);
    setIsSubmitting(false);
    setIsEditing(false);
    setEditData({ title: "", content: "" });
  };

  if (formState === "completed") {
    return (
      <div className="font-sans min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                投函完了！
              </h1>
              <p className="text-gray-600 mb-8">
                コンテンツが正常に投稿されました。
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
            >
              新しいコンテンツを作成
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (formState === "confirm") {
    return (
      <div className="font-sans min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                投稿内容の確認
              </h1>
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 text-sm font-medium"
              >
                {isEditing ? "プレビュー" : "編集"}
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  タイトル
                </h2>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="タイトルを入力してください"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {editData.title || formData.title}
                  </p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  コンテンツ
                </h2>
                {isEditing ? (
                  <textarea
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-vertical"
                    placeholder="コンテンツを入力してください"
                  />
                ) : (
                  <textarea
                    value={editData.content}
                    onChange={(e) =>
                      setEditData({ ...editData, content: e.target.value })
                    }
                    rows={12}
                    className="w-full px-4 py-3 border border-gray-300  text-gray-700 bg-gray-50 p-4 rounded-lg  focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-vertical"
                    disabled={true}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              >
                戻る
              </button>

              {isEditing ? (
                <div className="flex space-x-4">
                  <button
                    onClick={handleEditSave}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium"
                  >
                    保存
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                  >
                    キャンセル
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "投函中..." : "投函する"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            コンテンツ作成フォーム
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              >
                リセット
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "生成中..." : "生成して確認"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
