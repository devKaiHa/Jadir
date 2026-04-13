import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";
import LoadingCard from "../../../components/Global/LoadingCard";
import { useContactUs } from "../../hooks/useContactUs";
import ContactUsGeneralInfoTab from "./ContactUsGeneralInfoTab";

const emptyLangState = {
  en: "",
  ar: "",
  tr: "",
};

const mapBranchesFromApi = (branches = []) =>
  branches.map((branch) => ({
    ...branch,
    name: {
      en: branch?.name?.en || "",
      ar: branch?.name?.ar || "",
      tr: branch?.name?.tr || "",
    },
    address: {
      en: branch?.address?.en || "",
      ar: branch?.address?.ar || "",
      tr: branch?.address?.tr || "",
    },
    phonesText: Array.isArray(branch?.phones) ? branch.phones.join("\n") : "",
  }));

const toLinesArray = (value = "") =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

const EditContactUs = () => {
  const { contactUs, isLoading, error, updateContactUs, isUpdating } =
    useContactUs();

  const [address, setAddress] = useState({ ...emptyLangState });
  const [emailsText, setEmailsText] = useState("");
  const [phonesText, setPhonesText] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    if (!contactUs) return;

    setAddress({
      en: contactUs?.address?.en || "",
      ar: contactUs?.address?.ar || "",
      tr: contactUs?.address?.tr || "",
    });
    setEmailsText(
      Array.isArray(contactUs?.emails) ? contactUs.emails.join("\n") : "",
    );
    setPhonesText(
      Array.isArray(contactUs?.phones) ? contactUs.phones.join("\n") : "",
    );
    setMapLink(contactUs?.mapLink || "");
    setWhatsapp(contactUs?.whatsapp || "");
    setBranches(mapBranchesFromApi(contactUs?.branches || []));
  }, [contactUs]);

  const onAddressChange = (lang, value) => {
    setAddress((prev) => ({ ...prev, [lang]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        address,
        emails: toLinesArray(emailsText),
        phones: toLinesArray(phonesText),
        mapLink,
        whatsapp,
        branches: branches.map((branch) => ({
          _id: branch?._id,
          name: branch.name || { ...emptyLangState },
          address: branch.address || { ...emptyLangState },
          mapLink: branch.mapLink || "",
          phones: toLinesArray(branch.phonesText || ""),
          whatsapp: branch.whatsapp || "",
          isActive: branch.isActive ?? true,
          order: Number(branch.order || 0),
        })),
      };

      await updateContactUs(payload).unwrap();
      toast.success("Contact information saved successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to save contact information");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <ContactUsGeneralInfoTab
        emailsText={emailsText}
        setEmailsText={setEmailsText}
        phonesText={phonesText}
        setPhonesText={setPhonesText}
        mapLink={mapLink}
        setMapLink={setMapLink}
        whatsapp={whatsapp}
        setWhatsapp={setWhatsapp}
        address={address}
        onAddressChange={onAddressChange}
        branches={branches}
        setBranches={setBranches}
      />

      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Contact Info"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default EditContactUs;
