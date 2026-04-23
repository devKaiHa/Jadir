import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import UserFormCard from "./UserFormCard";
import useUpdateUser from "../hooks/useUpdateUser";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

const UpdateUser = () => {
  const {
    error,
    isPageLoading,
    isUpdating,

    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,

    errors,
    handleSave,
  } = useUpdateUser();

  if (isPageLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <UserFormCard
        isEdit
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        password={password}
        setPassword={setPassword}
        errors={errors}
      />

      <div className="mt-6">
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update User"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default UpdateUser;
