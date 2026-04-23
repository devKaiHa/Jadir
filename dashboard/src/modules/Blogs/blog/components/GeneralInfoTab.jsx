import { useState, useEffect } from "react";
import { Alert } from "@/components";
import { CrudAvatarUpload } from "../../../../partials/crud/CrudAvatarUpload";
import { useCategories } from "../../../hooks/useCategories";
import { useBlogs } from "../../../hooks/useBlogs";
import MultiSelect from "../../../../components/MultiSelect";

const GeneralInfoTab = ({
  category,
  setCategory,
  published,
  setPublished,
  tagsEN,
  setTagsEN,
  tagsAR,
  setTagsAR,
  coverPreview,
  onCoverChange,
  thumbnailPreviews,
  onThumbnailsChange,
  authorName,
  setAuthorName,
  relatedPosts,
  setRelatedPosts,
  currentBlogId,
}) => {
  const { categories, isLoading, error } = useCategories({
    limit: 100,
  });
  const { blogs: allBlogs, isLoading: isBlogsLoading } = useBlogs({
    limit: 200,
  });

  const normalizedRelatedPosts = (relatedPosts || [])
    .map((item) => {
      if (typeof item === "string") {
        return allBlogs.find((blog) => blog?._id === item) || null;
      }
      return item;
    })
    .filter(Boolean);

  const [tagsInput, setTagsInput] = useState({
    en: (tagsEN || []).join(", "),
    ar: (tagsAR || []).join(", "),
  });

  useEffect(() => {
    setTagsInput({
      en: (tagsEN || []).join(", "),
      ar: (tagsAR || []).join(", "),
    });
  }, [tagsEN, tagsAR]);

  const handleTagsBlur = (lang) => {
    const tagsArray = (tagsInput[lang] || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (lang === "en") setTagsEN(tagsArray);
    if (lang === "ar") setTagsAR(tagsArray);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Publishing Setup</h3>
              <p className="mt-1 text-sm text-gray-500">
                Assign the post to a category, control the publish state, and define the author.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Blog Category
                </label>
                <select
                  name="category"
                  value={category || ""}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input"
                  disabled={isLoading || !!error}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat?.name?.en || cat?.name?.ar}
                    </option>
                  ))}
                </select>

                {error && (
                  <Alert variant="danger" className="mt-3">
                    Failed to load categories
                  </Alert>
                )}
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Published
                </label>
                <select
                  className="input"
                  value={published ? "true" : "false"}
                  onChange={(e) => setPublished(e.target.value === "true")}
                >
                  <option value="false">Draft</option>
                  <option value="true">Published</option>
                </select>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:col-span-2">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Author Name
                </label>
                <input
                  type="text"
                  className="input"
                  value={authorName || ""}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter author name"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add comma-separated tags for each language to improve organization and discovery.
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {["en", "ar"].map((lang) => (
                <div
                  key={lang}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                >
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Tags ({lang})
                  </label>
                  <input
                    type="text"
                    name={`tags-${lang}`}
                    className="input"
                    placeholder={`Comma-separated (${lang})`}
                    value={tagsInput[lang] || ""}
                    onChange={(e) =>
                      setTagsInput((prev) => ({
                        ...prev,
                        [lang]: e.target.value,
                      }))
                    }
                    onBlur={() => handleTagsBlur(lang)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        e.target.blur();
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900">Related Posts</h3>
              <p className="mt-1 text-sm text-gray-500">
                Connect supporting or follow-up posts so readers can navigate across related content.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Select Related Posts
              </label>
              <div className="w-full">
                <MultiSelect
                  options={(allBlogs || []).filter(
                    (item) => item?._id && item._id !== currentBlogId,
                  )}
                  selected={normalizedRelatedPosts}
                  onChange={setRelatedPosts}
                  placeholder={
                    isBlogsLoading ? "Loading blogs..." : "Select related posts"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Cover Image</h3>
              <p className="mt-1 text-sm text-gray-500">
                Main visual for the blog page and article header.
              </p>
            </div>
            <div className="p-2">
              <CrudAvatarUpload
                onChange={onCoverChange}
                value={coverPreview}
                initialImageURL={
                  typeof coverPreview === "string" ? `${coverPreview}` : ""
                }
                adviceMessage="Cover Image | Max 1MB | Aspect Ratio 16:9"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Thumbnail Image</h3>
              <p className="mt-1 text-sm text-gray-500">
                Compact visual used in listings and cards.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onThumbnailsChange({ target: { files: file ? [file] : [] } });
                }}
                className="mb-4"
              />

              {thumbnailPreviews?.length > 0 ? (
                <ul className="space-y-2">
                  {thumbnailPreviews.map((file, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-white p-3"
                    >
                      <span className="truncate text-sm text-gray-700">
                        {file?.name || file}
                      </span>
                      <button
                        type="button"
                        onClick={() => onThumbnailsChange({ target: { files: [] } })}
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-500">No thumbnail selected yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoTab;
