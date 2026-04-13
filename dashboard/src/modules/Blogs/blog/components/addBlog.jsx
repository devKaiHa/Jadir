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
    tagsTR,
    setTagsTR,

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
          tagsTR={tagsTR}
          setTagsTR={setTagsTR}
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
    {
      key: "Blog_tr",
      label: "Blog TR",
      icon: "ki-outline ki-clipboard",
      content: (
        <BlogLangForm
          language="tr"
          value={blogData.tr}
          onChange={handleLangChange}
        />
      ),
    },
  ];

  return (
    <Container>
      <Tabs tabs={tabConfig} />

      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Blog"}
        </button>

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
