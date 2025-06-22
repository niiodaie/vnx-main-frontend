// src/components/EditModal.jsx
import React from "react";

const EditModal = ({ note = {}, onChange, onClose, onSave }) => {
  const isDisabled = !note.title || !note.content;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Note</h2>

        <input
          type="text"
          className="w-full border p-2 mb-3"
          value={note.title || ""}
          onChange={(e) => onChange({ ...note, title: e.target.value })}
          placeholder="Title"
        />

        <textarea
          className="w-full border p-2 mb-3"
          rows="4"
          value={note.content || ""}
          onChange={(e) => onChange({ ...note, content: e.target.value })}
          placeholder="Content"
        />

        <input
          type="text"
          className="w-full border p-2 mb-3"
          value={note.tag || ""}
          onChange={(e) => onChange({ ...note, tag: e.target.value })}
          placeholder="Tag"
        />

        <div className="flex justify-between">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            onClick={onSave}
            disabled={isDisabled}
          >
            Save
          </button>
          <button
            className="text-gray-600 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
