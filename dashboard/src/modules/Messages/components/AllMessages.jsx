import { useState } from "react";
import { Container, Tooltip } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import ReplyMessageModal from "./ReplyMessageModal";
import ViewMessageModal from "./ViewMessageModal";
import { useMessages } from "../../hooks/useMessages";
import LoadingCard from "../../../components/Global/LoadingCard";
import ErrorMessageCard from "../../../components/Global/ErrorMessageCard";

const REQUEST_TYPE_LABELS = {
  inquiry: "Inquiry",
  "consult-inquiry": "Consultation Inquiry",
  "service-request": "Service Request",
  partnership: "Partnership",
  media: "Media",
  support: "Support",
  complaint: "Complaint",
  "investment-inquiry": "Service Request",
};

const AllMessages = () => {
  const { messages, isLoading, error, deleteMessage, isDeleting, refetch } =
    useMessages({ limit: 100 });

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredMessages = messages.filter((messageItem) => {
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "replied" && messageItem?.isReplied) ||
      (statusFilter === "new" && !messageItem?.isReplied);

    const haystack = [
      messageItem?.name,
      messageItem?.email,
      messageItem?.phone,
      messageItem?.subject,
      messageItem?.requestType,
      messageItem?.message,
      messageItem?.attachment?.originalName,
      messageItem?.service?.title?.en,
      messageItem?.service?.title?.ar,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = haystack.includes(searchTerm.trim().toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const repliedCount = messages.filter(
    (messageItem) => messageItem?.isReplied,
  ).length;
  const newCount = messages.length - repliedCount;
  const attachmentCount = messages.filter(
    (messageItem) => messageItem?.attachment?.originalName,
  ).length;

  return (
    <Container>
      <div className="space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                Inbox Management
              </span>
              <h2 className="mt-4 text-2xl font-semibold">
                Review and respond to incoming requests faster
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                Search, filter, and triage messages from one place instead of
                scanning a raw table.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Search Inbox
              </label>
              <input
                type="text"
                className="input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, subject, service, or attachment"
              />
            </div>

            <div className="flex items-end">
              <button
                className="btn btn-primary w-full lg:w-auto"
                onClick={refetch}
              >
                Refresh Inbox
              </button>
            </div>
          </div>
        </div>

        <div className="card card-grid min-w-full rounded-3xl border border-gray-200 shadow-sm">
          <div className="card-header py-5 flex-wrap">
            <div>
              <h3 className="card-title">Messages</h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredMessages.length} of {messages.length} messages
              </p>
            </div>
          </div>

          <div className="card-body">
            <div className="scrollable-x-auto">
              <table className="table table-auto table-border" id="grid_table">
                <thead>
                  <tr>
                    <th className="min-w-[180px]">Name</th>
                    <th className="min-w-[220px]">Email</th>
                    <th className="min-w-[180px]">Request</th>
                    <th className="min-w-[180px]">Attachment</th>
                    <th className="min-w-[140px]">Status</th>
                    <th className="w-[160px]">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMessages?.map((messageItem) => (
                    <tr key={messageItem._id}>
                      <td>
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-gray-800">
                            {messageItem?.name || "-"}
                          </span>
                          <div className="text-xs text-gray-500">
                            {messageItem?.phone || "No phone provided"}
                          </div>
                        </div>
                      </td>

                      <td>{messageItem?.email || "-"}</td>

                      <td>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-800">
                            {REQUEST_TYPE_LABELS[messageItem?.requestType] ||
                              messageItem?.requestType ||
                              "-"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {messageItem?.service?.title?.en ||
                              messageItem?.service?.title?.ar ||
                              messageItem?.subject ||
                              "No linked service"}
                          </div>
                        </div>
                      </td>

                      <td>
                        {messageItem?.attachment?.originalName ? (
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            {messageItem.attachment.originalName}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

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

                  {!filteredMessages?.length && (
                    <tr>
                      <td
                        colSpan={6}
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
