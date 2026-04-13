import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useBlogs } from "../../../hooks/useBlogs";

const buildMultilingualTags = (tagsEN = [], tagsAR = [], tagsTR = []) => {
  const maxLength = Math.max(tagsEN.length, tagsAR.length, tagsTR.length);

  return Array.from({ length: maxLength }, (_, index) => ({
    en: tagsEN[index] || "",
    ar: tagsAR[index] || "",
    tr: tagsTR[index] || "",
  })).filter((tag) => tag.en || tag.ar || tag.tr);
};

export const useCreateBlog = () => {
  const navigate = useNavigate();
  const { postBlog, isPosting, error } = useBlogs();

  const [blogData, setBlogData] = useState({
    en: { title: "", excerpt: "", authorRole: "", content: "" },
    ar: { title: "", excerpt: "", authorRole: "", content: "" },
    tr: { title: "", excerpt: "", authorRole: "", content: "" },
  });

  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]);

  const [tagsEN, setTagsEN] = useState([]);
  const [tagsAR, setTagsAR] = useState([]);
  const [tagsTR, setTagsTR] = useState([]);

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);

  const resetForm = () => {
    setBlogData({
      en: { title: "", excerpt: "", authorRole: "", content: "" },
      ar: { title: "", excerpt: "", authorRole: "", content: "" },
      tr: { title: "", excerpt: "", authorRole: "", content: "" },
    });
    setCategory("");
    setPublished(false);
    setAuthorName("");
    setRelatedPosts([]);
    setTagsEN([]);
    setTagsAR([]);
    setTagsTR([]);
    setCoverImage(null);
    setCoverPreview(null);
    setThumbnailFile(null);
    setThumbnailPreviews([]);
  };

  const handleLangChange = (lang, data) => {
    setBlogData((prev) => ({ ...prev, [lang]: data }));
  };

  const onCoverChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    } else {
      setCoverImage(null);
      setCoverPreview(null);
    }
  };

  const onThumbnailsChange = (e) => {
    const files = Array.from(e?.target?.files || []);
    const firstFile = files[0] || null;

    setThumbnailFile(firstFile);
    setThumbnailPreviews(firstFile ? [firstFile] : []);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      const title = {
        en: blogData.en?.title || "",
        ar: blogData.ar?.title || "",
        tr: blogData.tr?.title || "",
      };

      const content = {
        en: blogData.en?.content || "",
        ar: blogData.ar?.content || "",
        tr: blogData.tr?.content || "",
      };
      const excerpt = {
        en: blogData.en?.excerpt || "",
        ar: blogData.ar?.excerpt || "",
        tr: blogData.tr?.excerpt || "",
      };
      const author = {
        name: authorName || "",
        role: {
          en: blogData.en?.authorRole || "",
          ar: blogData.ar?.authorRole || "",
          tr: blogData.tr?.authorRole || "",
        },
      };

      const tags = buildMultilingualTags(tagsEN, tagsAR, tagsTR);

      formData.append("title", JSON.stringify(title));
      formData.append("content", JSON.stringify(content));
      formData.append("excerpt", JSON.stringify(excerpt));
      formData.append("author", JSON.stringify(author));
      formData.append("tags", JSON.stringify(tags));
      formData.append(
        "relatedPosts",
        JSON.stringify(
          relatedPosts
            .map((post) =>
              typeof post === "string" ? post : post?._id || post?.id,
            )
            .filter(Boolean),
        ),
      );

      if (category) formData.append("category", category);
      formData.append("published", published ? "true" : "false");

      if (coverImage) {
        formData.append("image", coverImage);
      }

      if (thumbnailFile) {
        formData.append("thumbnailImage", thumbnailFile);
      }

      await postBlog(formData).unwrap();

      toast.success("Blog added successfully");
      resetForm();

      setTimeout(() => {
        navigate("/all-blogs");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create blog");
    }
  };

  return {
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
    resetForm,

    isLoading: isPosting,
    error,
  };
};
