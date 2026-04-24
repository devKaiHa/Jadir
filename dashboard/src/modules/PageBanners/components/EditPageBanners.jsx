import { Container } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { imageURL } from "../../../Api/GlobalData";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import { usePageBanners } from "../../hooks/usePageBanners";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const PAGE_FIELDS = [
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "projects", label: "Projects" },
  { key: "blogs", label: "Blogs" },
  { key: "careers", label: "Careers" },
  { key: "search", label: "Search" },
  { key: "contact", label: "Contact" },
];

const createEmptyDrafts = () =>
  PAGE_FIELDS.reduce((acc, field) => {
    acc[field.key] = {
      existing: "",
      preview: "",
      file: null,
    };

    return acc;
  }, {});

const toImageUrl = (value = "") => {
  if (!value) return "";
  if (/^blob:|^data:|^https?:\/\//i.test(value)) return value;
  return `${imageURL}/${value.replace(/^\/+/, "")}`;
};

const PageBannerCard = ({ field, draft, onFileChange }) => (
  <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex-1">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          Website Page
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{field.label}</h3>
        <p className="mt-2 text-sm text-gray-500">
          Upload one banner image for the {field.label.toLowerCase()} page. The
          file must be an image and no larger than 2MB.
        </p>

        <div className="mt-5">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
            Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={(event) => onFileChange(field.key, event.target.files?.[0])}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
          <span className="rounded-full bg-gray-100 px-3 py-1">One image only</span>
          <span className="rounded-full bg-gray-100 px-3 py-1">Max 2MB</span>
          <span className="rounded-full bg-gray-100 px-3 py-1">Small preview shown below</span>
        </div>
      </div>

      <div className="w-full max-w-[260px]">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          Preview
        </div>
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
          {draft.preview ? (
            <img
              src={draft.preview}
              alt={`${field.label} banner`}
              className="h-[150px] w-full object-cover"
            />
          ) : (
            <div className="flex h-[150px] items-center justify-center px-4 text-center text-sm text-gray-400">
              No banner selected yet
            </div>
          )}
        </div>

        <div className="mt-3 text-xs text-gray-500 break-all">
          {draft.file
            ? `New file: ${draft.file.name}`
            : draft.existing || "Using current website fallback"}
        </div>
      </div>
    </div>
  </div>
);

const EditPageBanners = () => {
  const { pageBanners, isLoading, error, updatePageBanners, isUpdating } =
    usePageBanners();
  const [drafts, setDrafts] = useState(createEmptyDrafts);

  useEffect(() => {
    if (!pageBanners) return;

    setDrafts((prev) => {
      const next = { ...prev };

      PAGE_FIELDS.forEach(({ key }) => {
        const existing = pageBanners?.[key] || "";
        next[key] = {
          existing,
          preview: toImageUrl(existing),
          file: null,
        };
      });

      return next;
    });
  }, [pageBanners]);

  useEffect(() => {
    return () => {
      PAGE_FIELDS.forEach(({ key }) => {
        const preview = drafts?.[key]?.preview || "";
        if (preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [drafts]);

  const changedPages = useMemo(
    () => PAGE_FIELDS.filter(({ key }) => Boolean(drafts[key]?.file)),
    [drafts],
  );

  const handleFileChange = (pageKey, file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image size must be 2MB or smaller");
      return;
    }

    setDrafts((prev) => {
      const currentPreview = prev?.[pageKey]?.preview || "";

      if (currentPreview.startsWith("blob:")) {
        URL.revokeObjectURL(currentPreview);
      }

      return {
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          file,
          preview: URL.createObjectURL(file),
        },
      };
    });
  };

  const handleSave = async () => {
    if (!changedPages.length) {
      toast.info("Choose at least one banner image before saving");
      return;
    }

    try {
      const formData = new FormData();

      changedPages.forEach(({ key }) => {
        formData.append(key, drafts[key].file);
      });

      await updatePageBanners(formData).unwrap();
      toast.success("Page banners saved successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save page banners");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Page Banners</h2>
          <p className="mt-2 text-sm text-gray-500">
            Manage the hero banner image used by the main website pages.
          </p>
        </div>

        {PAGE_FIELDS.map((field) => (
          <PageBannerCard
            key={field.key}
            field={field}
            draft={drafts[field.key]}
            onFileChange={handleFileChange}
          />
        ))}
      </div>

      <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
        <div className="rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save Page Banners"}
          </button>
        </div>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default EditPageBanners;
