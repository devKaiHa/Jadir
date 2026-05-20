import { useEffect, useState } from "react";

const CareerTemplateModal = ({ isOpen, isSaving, onClose, onSave }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) setName("");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form
        className="bg-white rounded-lg shadow-lg w-full max-w-[520px]"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-lg font-semibold">Save Career Template</h3>
            <p className="text-sm text-gray-500 mt-1">
              Name this template so it can be reused for another career.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-xs btn-icon btn-light"
            onClick={onClose}
            disabled={isSaving}
          >
            <i className="ki-outline ki-cross" />
          </button>
        </div>

        <div className="p-5">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium">Template Name</span>
            <input
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Standard job application"
              autoFocus
            />
          </label>
        </div>

        <div className="flex justify-end gap-3 border-t p-4">
          <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSaving || !name.trim()}
          >
            {isSaving ? "Saving..." : "Save Template"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareerTemplateModal;
