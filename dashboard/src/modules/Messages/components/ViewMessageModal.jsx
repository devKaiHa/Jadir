import { imageURL } from "../../../Api/GlobalData";

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

const ViewMessageModal = ({ isOpen, onClose, messageItem }) => {
  if (!isOpen) return null;

  const attachmentUrl = messageItem?.attachment?.filename
    ? `${imageURL}/messages/${messageItem.attachment.filename}`
    : "";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[760px]">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">Message Details</h3>
          <button className="btn btn-xs btn-icon btn-light" onClick={onClose}>
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>

        <div className="mt-4 grid gap-3 text-sm text-gray-700">
          <p>
            <strong>Name:</strong> {messageItem?.name || "-"}
          </p>
          <p>
            <strong>Email:</strong> {messageItem?.email || "-"}
          </p>
          <p>
            <strong>Phone:</strong> {messageItem?.phone || "-"}
          </p>
          <p>
            <strong>Subject:</strong> {messageItem?.subject || "-"}
          </p>
          <p>
            <strong>Request Type:</strong> {messageItem?.requestType || "-"}
          </p>
          <p>
            <strong>Request Type Label:</strong>{" "}
            {REQUEST_TYPE_LABELS[messageItem?.requestType] || "-"}
          </p>
          <p>
            <strong>Requested Service:</strong>{" "}
            {messageItem?.service?.title?.en ||
              messageItem?.service?.title?.ar ||
              "-"}
          </p>
          <p>
            <strong>Status:</strong> {messageItem?.status || "-"}
          </p>
          <div>
            <strong>Message:</strong>
            <p className="mt-2 whitespace-pre-wrap rounded-lg border bg-gray-50 p-4">
              {messageItem?.message || "-"}
            </p>
          </div>

          {messageItem?.attachment?.originalName ? (
            <div>
              <strong>Attachment:</strong>
              <div className="mt-2">
                <a
                  href={attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  {messageItem.attachment.originalName}
                </a>
              </div>
            </div>
          ) : null}

          {messageItem?.reply ? (
            <div>
              <strong>Reply:</strong>
              <p className="mt-2 whitespace-pre-wrap rounded-lg border bg-gray-50 p-4">
                {messageItem.reply}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ViewMessageModal;
