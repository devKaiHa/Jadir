import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import Tabs from "../../../../components/Global/Tabs";

import BlogLangForm from "./BlogLangForm";
import GeneralInfoTab from "./GeneralInfoTab";
import LoadingCard from "../../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../../components/Global/ErrorMessageCard";
import { useBlogs, useOneBlog } from "../../../hooks/useBlogs";

const buildTagsByLanguage = (tags = []) => {
  return {
    en: tags.map((tag) => tag?.en || "").filter(Boolean),
    ar: tags.map((tag) => tag?.ar || "").filter(Boolean),
  };
};

const buildMultilingualTags = (tagsEN = [], tagsAR = []) => {
  const maxLength = Math.max(tagsEN.length, tagsAR.length);

  return Array.from({ length: maxLength }, (_, index) => ({
    en: tagsEN[index] || "",
    ar: tagsAR[index] || "",
  })).filter((tag) => tag.en || tag.ar);
};

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { blog, isLoading, error } = useOneBlog(id);
  const { updateBlog, isUpdating } = useBlogs();

  const [category, setCategory] = useState("");
  const [published, setPublished] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [relatedPosts, setRelatedPosts] = useState([]);

  const [tagsEN, setTagsEN] = useState([]);
  const [tagsAR, setTagsAR] = useState([]);

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreviews, setThumbnailPreviews] = useState([]);

  const [blogData, setBlogData] = useState({
    en: { title: "", excerpt: "", authorRole: "", content: "" },
    ar: { title: "", excerpt: "", authorRole: "", content: "" },
  });

  useEffect(() => {
    if (!blog) return;

    const tagsByLang = buildTagsByLanguage(blog.tags || []);

    setCategory(blog.category?._id || blog.category || "");
    setPublished(!!blog.published);
    setAuthorName(blog.author?.name || "");
    setRelatedPosts(blog.relatedPosts || []);

    setTagsEN(tagsByLang.en);
    setTagsAR(tagsByLang.ar);

    setCoverPreview(blog.image || null);
    setCoverImage(null);

    if (blog.thumbnailImage) {
      setThumbnailPreviews([blog.thumbnailImage]);
    } else {
      setThumbnailPreviews([]);
    }
    setThumbnailFile(null);

    setBlogData({
      en: {
        title: blog.title?.en || "",
        excerpt: blog.excerpt?.en || "",
        authorRole: blog.author?.role?.en || "",
        content: blog.content?.en || "",
      },
      ar: {
        title: blog.title?.ar || "",
        excerpt: blog.excerpt?.ar || "",
        authorRole: blog.author?.role?.ar || "",
        content: blog.content?.ar || "",
      },
    });
  }, [blog]);

  const handleLangChange = (lang, data) => {
    setBlogData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        ...data,
      },
    }));
  };

  const handleCoverChange = (selectedAvatar) => {
    const file = selectedAvatar?.[0]?.file;

    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    } else {
      setCoverImage(null);
      setCoverPreview(typeof blog?.image === "string" ? blog.image : null);
    }
  };

  const handleThumbnailsChange = (e) => {
    const files = Array.from(e?.target?.files || []);
    const firstFile = files[0] || null;

    setThumbnailFile(firstFile);
    setThumbnailPreviews(firstFile ? [firstFile] : []);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      const title = {
        en: blogData.en?.title || "",
        ar: blogData.ar?.title || "",
      };

      const content = {
        en: blogData.en?.content || "",
        ar: blogData.ar?.content || "",
      };
      const excerpt = {
        en: blogData.en?.excerpt || "",
        ar: blogData.ar?.excerpt || "",
      };
      const author = {
        name: authorName || "",
        role: {
          en: blogData.en?.authorRole || "",
          ar: blogData.ar?.authorRole || "",
        },
      };

      const tags = buildMultilingualTags(tagsEN, tagsAR);

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

      if (category) {
        formData.append("category", category);
      }

      formData.append("published", published ? "true" : "false");

      if (coverImage instanceof File) {
        formData.append("image", coverImage);
      }

      if (thumbnailFile instanceof File) {
        formData.append("thumbnailImage", thumbnailFile);
      }

      await updateBlog({ id, data: formData }).unwrap();

      toast.success("Blog updated successfully");

      setTimeout(() => {
        navigate("/all-blogs");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update blog");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

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
          currentBlogId={id}
          tagsEN={tagsEN}
          setTagsEN={setTagsEN}
          tagsAR={tagsAR}
          setTagsAR={setTagsAR}
          coverPreview={coverPreview}
          onCoverChange={handleCoverChange}
          thumbnailPreviews={thumbnailPreviews}
          onThumbnailsChange={handleThumbnailsChange}
        />
      ),
    },
    ...["en", "ar"].map((lang) => ({
      key: `Blog_${lang}`,
      label: `Blog ${lang.toUpperCase()}`,
      icon: "ki-outline ki-clipboard",
      content: (
        <BlogLangForm
          language={lang}
          value={blogData[lang]}
          onChange={handleLangChange}
        />
      ),
    })),
  ];

  return (
    <Container>
      <Tabs tabs={tabConfig} />

      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Blog"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateBlog;
