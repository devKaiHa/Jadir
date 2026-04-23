import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import UserFormCard from "./UserFormCard";
import useCreateUser from "../hooks/useCreateUser";

const AddUser = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    errors,
    isLoading,
    handleSave,
  } = useCreateUser();

  return (
    <Container>
      <UserFormCard
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
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create User"}
        </button>
      </div>

      <ToastContainer pauseOnHover />
    </Container>
  );
};

export default AddUser;
