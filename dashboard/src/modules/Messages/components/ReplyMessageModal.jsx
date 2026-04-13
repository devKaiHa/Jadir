import useReplyMessage from "../hooks/useReplyMessage";

const ReplyMessageModal = ({ isOpen, onClose, messageItem }) => {
  const { reply, setReply, error, isLoading, handleSave } = useReplyMessage(
    messageItem,
    onClose,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[700px]">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold">Reply to Message</h3>
          <button className="btn btn-xs btn-icon btn-light" onClick={onClose}>
            <i className="ki-outline ki-cross"></i>
          </button>
        </div>

        <div className="modal-body mt-4 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border">
            <p className="text-sm text-gray-700 mb-2">
              <strong>From:</strong> {messageItem?.name || "-"}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Email:</strong> {messageItem?.email || "-"}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Phone:</strong> {messageItem?.phone || "-"}
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              <strong>Message:</strong> {messageItem?.message || "-"}
            </p>
          </div>

          <div className="input-group">
            <span className="btn btn-input w-[20%]">Reply</span>
            <textarea
              className={`input min-h-[180px] py-3 ${
                error ? "border-red-500" : ""
              }`}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your reply here"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyMessageModal;
