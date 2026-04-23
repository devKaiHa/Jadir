import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Tabs from "../../../../components/Global/Tabs";
import BlogLangForm from "./BlogLangForm";
import GeneralInfoTab from "./GeneralInfoTab";
import { useCreateBlog } from "../hooks/useCreateBlog";

const AddBlog = () => {
  const {
    blogData,
    handleLangChange,
    category,
    setCategory,
    published,
    setPublished,
    authorName,
    setAuthorName,
    relatedPosts,
    setRelatedPosts,
    tagsEN,
    setTagsEN,
    tagsAR,
    setTagsAR,
    coverPreview,
    onCoverChange,
    thumbnailPreviews,
    onThumbnailsChange,
    handleSave,
    isLoading,
    error,
  } = useCreateBlog();

  const tabConfig = [
    {
      key: "tab_info",
      label: "General Info",
      icon: "ki-outline ki-user-square",
      content: (
        <GeneralInfoTab
          category={category}
          setCategory={setCategory}
          published={published}
          setPublished={setPublished}
          authorName={authorName}
          setAuthorName={setAuthorName}
          relatedPosts={relatedPosts}
          setRelatedPosts={setRelatedPosts}
          tagsEN={tagsEN}
          setTagsEN={setTagsEN}
          tagsAR={tagsAR}
          setTagsAR={setTagsAR}
          coverPreview={coverPreview}
          onCoverChange={onCoverChange}
          thumbnailPreviews={thumbnailPreviews}
          onThumbnailsChange={onThumbnailsChange}
        />
      ),
    },
    {
      key: "Blog_en",
      label: "Blog EN",
      icon: "ki-outline ki-clipboard",
      content: (
        <BlogLangForm
          language="en"
          value={blogData.en}
          onChange={handleLangChange}
        />
      ),
    },
    {
      key: "Blog_ar",
      label: "Blog AR",
      icon: "ki-outline ki-clipboard",
      content: (
        <BlogLangForm
          language="ar"
          value={blogData.ar}
          onChange={handleLangChange}
        />
      ),
    },
  ];

  return (
    <Container>
      <div className="space-y-6">
        <Tabs tabs={tabConfig} />

        <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create Blog"}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-500 mt-2">
            Failed to create blog. Check console for details.
          </p>
        )}
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddBlog;
