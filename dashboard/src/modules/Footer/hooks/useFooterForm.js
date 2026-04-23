import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFooter from "../../hooks/useFooter";

const emptyLangState = {
  en: "",
  ar: "",
};

const defaultWorkingSchedule = [
  { key: "monday", day: { en: "Monday", ar: "الاثنين" }, order: 1 },
  { key: "tuesday", day: { en: "Tuesday", ar: "الثلاثاء" }, order: 2 },
  { key: "wednesday", day: { en: "Wednesday", ar: "الأربعاء" }, order: 3 },
  { key: "thursday", day: { en: "Thursday", ar: "الخميس" }, order: 4 },
  { key: "friday", day: { en: "Friday", ar: "الجمعة" }, order: 5 },
  { key: "saturday", day: { en: "Saturday", ar: "السبت" }, order: 6 },
  { key: "sunday", day: { en: "Sunday", ar: "الأحد" }, order: 7 },
].map((item) => ({
  ...item,
  hours: { en: "", ar: "" },
  isClosed: false,
}));

const normalizeWorkingSchedule = (
  schedule = [],
  fallbackHours = "",
) => {
  const source = Array.isArray(schedule) ? schedule : [];

  return defaultWorkingSchedule.map((defaultDay, index) => {
    const current =
      source.find((item) => item?.key === defaultDay.key) || source[index] || {};

    return {
      key: current?.key || defaultDay.key,
      day: {
        en: current?.day?.en || defaultDay.day.en,
        ar: current?.day?.ar || defaultDay.day.ar,
      },
      hours: {
        en: current?.hours?.en || fallbackHours || "",
        ar: current?.hours?.ar || "",
      },
      isClosed: Boolean(current?.isClosed),
      order: Number(current?.order ?? defaultDay.order),
    };
  });
};

const createEmptyLink = () => ({
  title: "",
  link: "",
});

const useFooterForm = () => {
  const { footer, isLoading, error, updateFooter, isUpdating } = useFooter();

  const [description, setDescription] = useState({ ...emptyLangState });
  const [address, setAddress] = useState({ ...emptyLangState });

  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [xTwitter, setXTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [workDays, setWorkDays] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [workingSchedule, setWorkingSchedule] = useState(
    normalizeWorkingSchedule(),
  );

  const [links, setLinks] = useState([createEmptyLink()]);

  useEffect(() => {
    if (!footer) return;

    setDescription({
      en: footer?.description?.en || "",
      ar: footer?.description?.ar || "",
    });

    setFacebook(footer?.facebook || "");
    setInstagram(footer?.instagram || "");
    setXTwitter(footer?.xTwitter || "");
    setLinkedin(footer?.linkedin || "");
    setPhone(footer?.phone || "");
    setEmail(footer?.email || "");
    setWorkDays(footer?.workDays || "");
    setWorkingHours(footer?.workingHours || "");
    setWorkingSchedule(
      normalizeWorkingSchedule(footer?.workingSchedule, footer?.workingHours),
    );

    setLinks(
      footer?.links?.length
        ? footer.links.map((item) => ({
            title: item?.title || "",
            link: item?.link || "",
          }))
        : [createEmptyLink()],
    );
  }, [footer]);

  const handleDescriptionChange = (lang, value) => {
    setDescription((prev) => ({ ...prev, [lang]: value }));
  };

  const handleAddressChange = (lang, value) => {
    setAddress((prev) => ({ ...prev, [lang]: value }));
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
        links: links.filter((item) => item.title?.trim()),
        facebook,
        instagram,
        xTwitter,
        linkedin,
        phone,
        email,
        workDays,
        workingHours,
        workingSchedule,
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
    address,
    handleAddressChange,

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
    workDays,
    setWorkDays,
    workingHours,
    setWorkingHours,
    workingSchedule,
    setWorkingSchedule,

    links,
    addLink,
    removeLink,
    updateLinkField,

    handleSave,
  };
};

export default useFooterForm;
