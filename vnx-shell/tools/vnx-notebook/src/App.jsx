import React, { useState } from "react";

const NewNoteForm = ({ onSave }) => {
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tag: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    onSave(newNote);
    setNewNote({ title: "", content: "", tag: "" }); // Clear form after save
  };

  const isSaveDisabled = !newNote.title.trim() || !newNote.content.trim();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
      <h2 className="text-xl font-bold mb-4">+ New Note</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newNote.title}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />
      <textarea
        name="content"
        placeholder="Write your note here..."
        rows="5"
        value={newNote.content}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />
      <input
        type="text"
        name="tag"
        placeholder="Tag (e.g., ai, startup)"
        value={newNote.tag}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        onClick={handleSave}
        disabled={isSaveDisabled}
        className={`w-full px-4 py-2 rounded text-white transition ${
          isSaveDisabled
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Save Note
      </button>

      {isSaveDisabled && (
        <p className="text-sm text-red-500 mt-2">
          Title and content are required.
        </p>
      )}
    </div>
  );
};

export default NewNoteForm;
