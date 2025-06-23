import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [language, setLanguage] = useState('text');

  const handleSave = () => {
    if (!title || !content) return;
    const newNote = { title, content, tag, language };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem('vnx-notes', JSON.stringify(updatedNotes));
    setTitle('');
    setContent('');
    setTag('');
    setLanguage('text');
  };

  const handleDelete = (indexToRemove) => {
    const updatedNotes = notes.filter((_, index) => index !== indexToRemove);
    setNotes(updatedNotes);
    localStorage.setItem('vnx-notes', JSON.stringify(updatedNotes));
  };

  useEffect(() => {
    const savedNotes = localStorage.getItem('vnx-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <span role="img" aria-label="note" className="mr-2">🧠</span> Notebook VNX
        </h1>
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded mb-2 h-24"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <select
          className="w-full border p-2 rounded mb-4"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="text">Plain Text</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="markdown">Markdown</option>
        </select>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          onClick={handleSave}
        >
          Save Note
        </button>
      </div>

      <div className="max-w-xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span role="img" aria-label="notes" className="mr-2">🗒️</span> Your Notes
        </h2>
        <ul className="space-y-4">
          {notes.map((note, index) => (
            <li key={index} className="bg-white p-4 rounded shadow relative">
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

              <span
                onClick={() => {
                  const confirmDelete = window.confirm(`Delete the note titled "${note.title}"?`);
                  if (confirmDelete) {
                    handleDelete(index);
                  }
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer text-xl absolute top-2 right-3"
              >
                ❌
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
