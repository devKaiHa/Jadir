import { useState } from "react";
import { Container, Tooltip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import ReplyMessageModal from "./ReplyMessageModal";
import ViewMessageModal from "./ViewMessageModal";
import { useMessages } from "../../hooks/useMessages";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

const AllMessages = () => {
  const { messages, isLoading, error, deleteMessage, isDeleting, refetch } =
    useMessages({ limit: 100 });

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openReplyModal, setOpenReplyModal] = useState(false);

  const handleView = (messageItem) => {
    setSelectedMessage(messageItem);
    setOpenViewModal(true);
  };

  const handleReply = (messageItem) => {
    setSelectedMessage(messageItem);
    setOpenReplyModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete message");
    }
  };

  if (isLoading) return <LoadingCard />;
  if (error) return <ErrorMessageCard />;

  return (
    <Container>
      <div className="grid">
        <div className="card card-grid min-w-full">
          <div className="card-header py-5 flex-wrap">
            <h3 className="card-title">Messages</h3>
            <button className="btn btn-sm btn-primary" onClick={refetch}>
              Refresh
            </button>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[180px]">Name</th>
                    <th className="min-w-[220px]">Email</th>
                    <th className="min-w-[160px]">Phone</th>
                    <th className="min-w-[140px]">Status</th>
                    <th className="w-[160px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {messages?.map((messageItem) => (
                    <tr key={messageItem._id}>
                      <td>
                        <span className="text-sm font-medium text-gray-800">
                          {messageItem?.name || "-"}
                        </span>
                      </td>

                      <td>{messageItem?.email || "-"}</td>

                      <td>{messageItem?.phone || "-"}</td>

                      <td>
                        <span
                          className={`badge ${
                            messageItem?.isReplied
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {messageItem?.isReplied ? "Replied" : "New"}
                        </span>
                      </td>

                      <td>
                        <div className="flex gap-3">
                          <Tooltip title="View" placement="top">
                            <button
                              className="cursor-pointer"
                              onClick={() => handleView(messageItem)}
                            >
                              <i className="ki-filled ki-eye text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Reply" placement="top">
                            <button
                              className="cursor-pointer text-blue-500"
                              onClick={() => handleReply(messageItem)}
                            >
                              <i className="ki-filled ki-message-text-2 text-xl" />
                            </button>
                          </Tooltip>

                          <Tooltip title="Delete" placement="top">
                            <button
                              className="cursor-pointer text-red-500"
                              onClick={() => handleDelete(messageItem._id)}
                              disabled={isDeleting}
                            >
                              <i className="ki-filled ki-trash text-xl" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!messages?.length && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500"
                      >
                        No messages found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ViewMessageModal
        isOpen={openViewModal}
        onClose={() => setOpenViewModal(false)}
        messageItem={selectedMessage}
      />

      <ReplyMessageModal
        isOpen={openReplyModal}
        onClose={() => setOpenReplyModal(false)}
        messageItem={selectedMessage}
      />

      <ToastContainer />
    </Container>
  );
};

export default AllMessages;
