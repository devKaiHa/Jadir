import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMessages } from "../../hooks/useMessages";

const useReplyMessage = (messageItem, onClose) => {
  const { postMessageReply, isReplying, refetch } = useMessages();

  const [reply, setReply] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setReply(messageItem?.reply || "");
    setError("");
  }, [messageItem]);

  const validate = () => {
    if (!reply.trim()) {
      setError("Reply is required");
      return false;
    }

    setError("");
    return true;
  };

  const handleSave = async () => {
    if (!messageItem?._id) {
      toast.error("Message not found");
      return;
    }

    if (!validate()) return;

    try {
      await postMessageReply({
        id: messageItem._id,
        data: { reply: reply.trim() },
      }).unwrap();

      refetch();
      toast.success("Reply sent successfully");

      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to send reply");
    }
  };

  return {
    reply,
    setReply,
    error,
    isLoading: isReplying,
    handleSave,
  };
};

export default useReplyMessage;
