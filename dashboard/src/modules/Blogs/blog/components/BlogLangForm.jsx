import { useEffect, useState } from "react";

const BlogLangForm = ({ language, value = {}, onChange }) => {
  const [localValue, setLocalValue] = useState({
    title: value.title || "",
    excerpt: value.excerpt || "",
    authorRole: value.authorRole || "",
    content: value.content || "",
  });

  useEffect(() => {
    setLocalValue((prev) => ({
      title: value.title || prev.title,
      excerpt: value.excerpt || prev.excerpt,
      authorRole: value.authorRole || prev.authorRole,
      content: value.content || prev.content,
    }));
  }, [value.title, value.excerpt, value.authorRole, value.content]);

  const handleChange = (key, val) => {
    setLocalValue((prev) => {
      const updated = { ...prev, [key]: val };
      onChange?.(language, updated);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Article Content ({language.toUpperCase()})
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the localized title, excerpt, author role, and full article
            body.
          </p>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Title ({language})
            </label>
            <input
              name="title"
              type="text"
              value={localValue.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder={`Enter title in ${language.toUpperCase()}`}
              className="input"
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Excerpt ({language})
            </label>
            <div className="w-full bg-white">
              <textarea
                value={localValue.excerpt}
                onChange={(e) => handleChange("excerpt", e.target.value)}
                className="input min-h-[180px] w-full p-3 bg-white text-black tracking-[1px] leading-[20px]"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Author Role ({language})
            </label>
            <input
              name="authorRole"
              type="text"
              value={localValue.authorRole}
              onChange={(e) => handleChange("authorRole", e.target.value)}
              placeholder={`Enter author role in ${language.toUpperCase()}`}
              className="input"
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
              Content ({language})
            </label>
            <div className="w-full bg-white">
              <textarea
                value={localValue.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className="input min-h-[180px] w-full p-3 bg-white text-black tracking-[1px] leading-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLangForm;
