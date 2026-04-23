import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";

const useCreateUser = () => {
  const navigate = useNavigate();
  const { postUser, isPosting } = useUsers();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setErrors({});
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const payload = {
        name,
        email,
        phone,
        password,
      };

      await postUser(payload).unwrap();

      toast.success("User created successfully");
      resetForm();

      setTimeout(() => {
        navigate("/all-users");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create user");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    errors,
    isLoading: isPosting,
    handleSave,
  };
};

export default useCreateUser;
