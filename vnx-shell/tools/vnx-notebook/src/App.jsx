import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [language, setLanguage] = useState("text");
  const [notes, setNotes] = useState([]);

  const handleSave = () => {
    if (!title || !content) return;

    const newNote = {
      title,
      content,
      tag,
      language,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setTag("");
    setLanguage("text");
  };

  const handleDelete = (indexToDelete) => {
    const updatedNotes = notes.filter((_, index) => index !== indexToDelete);
    setNotes(updatedNotes);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span role="img" aria-label="brain">
            🧠
          </span>
          Notebook VNX
        </h1>

        <input
          className="w-full border p-2 mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 mb-2"
          placeholder="Content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-2"
          placeholder="Tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <select
          className="w-full border p-2 mb-4"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="text">Plain Text</option>
          <option value="markdown">Markdown</option>
          <option value="code">Code</option>
        </select>

        <button
          onClick={handleSave}
          className="w-full bg-blue-400 hover:bg-blue-500 text-white p-2 rounded"
        >
          Save Note
        </button>
      </div>

      <div className="max-w-xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">📑 Your Notes</h2>
        <ul className="space-y-4">
          {notes.map((note, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded shadow relative"
            >
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg"
                onClick={() => handleDelete(index)}
                title="Delete"
              >
                ✖
              </button>

              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-gray-700 mt-1">{note.content}</p>

              {note.tag && (
                <span className="text-sm mt-2 inline-block text-blue-600">
                  #{note.tag}
                </span>
              )}

              {note.language && (
                <span className="text-sm mt-1 block text-purple-600 italic">
                  Language: {note.language}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
