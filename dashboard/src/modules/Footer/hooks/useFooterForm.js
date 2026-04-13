import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFooter from "../../hooks/useFooter";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const createEmptyLink = () => ({
  title: "",
  link: "",
  isActive: true,
});

const useFooterForm = () => {
  const { footer, isLoading, error, updateFooter, isUpdating } = useFooter();

  const [description, setDescription] = useState({ ...emptyLangState });

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [xTwitter, setXTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [links, setLinks] = useState([createEmptyLink()]);

  useEffect(() => {
    if (!footer) return;

    setDescription({
      en: footer?.description?.en || "",
      ar: footer?.description?.ar || "",
      tr: footer?.description?.tr || "",
    });

    setFacebook(footer?.facebook || "");
    setInstagram(footer?.instagram || "");
    setXTwitter(footer?.xTwitter || "");
    setLinkedin(footer?.linkedin || "");
    setPhone(footer?.phone || "");
    setEmail(footer?.email || "");

    setLinks(
      footer?.links?.length
        ? footer.links.map((item) => ({
            title: item?.title || "",
            link: item?.link || "",
            isActive: item?.isActive ?? true,
          }))
        : [createEmptyLink()],
    );
  }, [footer]);

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const addLink = () => {
    setLinks((prev) => [...prev, createEmptyLink()]);
  };

  const removeLink = (index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const updateLinkField = (index, field, value) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleSave = async () => {
    try {
      const payload = {
        description,
        links: links.filter((item) => item.title?.trim() || item.link?.trim()),
        facebook,
        instagram,
        xTwitter,
        linkedin,
        phone,
        email,
      };

      await updateFooter(payload).unwrap();
      toast.success("Footer updated successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update footer");
    }
  };

  return {
    isLoading,
    error,
    isUpdating,

    description,
    handleDescriptionChange,

    facebook,
    setFacebook,
    instagram,
    setInstagram,
    xTwitter,
    setXTwitter,
    linkedin,
    setLinkedin,
    phone,
    setPhone,
    email,
    setEmail,

    links,
    addLink,
    removeLink,
    updateLinkField,

    handleSave,
  };
};

export default useFooterForm;
