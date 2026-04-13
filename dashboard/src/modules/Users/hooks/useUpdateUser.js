import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useOneUser, useUsers } from "../../hooks/useUsers";

const useUpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user, isLoading, error } = useOneUser(id);
  const { updateUser, isUpdating } = useUsers();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) return;

    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setPassword("");
    setIsActive(user?.isActive ?? true);
  }, [user]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const payload = {
        name,
        email,
        phone,
        isActive,
      };

      if (password.trim()) {
        payload.password = password;
      }

      await updateUser({
        id,
        data: payload,
      }).unwrap();

      toast.success("User updated successfully");

      setTimeout(() => {
        navigate("/all-users");
      }, 1200);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to update user");
    }
  };

  return {
    error,
    isPageLoading: isLoading,
    isUpdating,

    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    isActive,
    setIsActive,

    errors,
    handleSave,
  };
};

export default useUpdateUser;
