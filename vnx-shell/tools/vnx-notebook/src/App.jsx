import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [language, setLanguage] = useState('text');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch('https://vnx-main-backend.onrender.com/notes');
    const data = await response.json();
    setNotes(data);
  };

  const handleSaveNote = async () => {
    if (!title || !content) return;

    const noteData = {
      title,
      content,
      tag,
      language,
    };

    if (editingNoteId) {
      await fetch(`https://vnx-main-backend.onrender.com/notes/${editingNoteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
      setEditingNoteId(null);
    } else {
      await fetch('https://vnx-main-backend.onrender.com/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData),
      });
    }

    setTitle('');
    setContent('');
    setTag('');
    setLanguage('text');
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await fetch(`https://vnx-main-backend.onrender.com/notes/${id}`, {
      method: 'DELETE',
    });
    fetchNotes();
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setTag(note.tag);
    setLanguage(note.language);
    setEditingNoteId(note._id);
  };

  const uniqueTags = [...new Set(notes.map(note => note.tag).filter(Boolean))];
  const filteredNotes = selectedTag ? notes.filter(note => note.tag === selectedTag) : notes;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
          <span className="mr-2">🧠</span> Notebook VNX
        </h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 p-2 border rounded h-24"
        />
        <input
          type="text"
          placeholder="Tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="text">Plain Text</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <button
          onClick={handleSaveNote}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {editingNoteId ? 'Update Note' : 'Save Note'}
        </button>
      </div>

      <div className="max-w-xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <span className="mr-2">🗒️</span> Your Notes
        </h2>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded ${selectedTag === null ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All Notes
          </button>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded ${selectedTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {filteredNotes.map((note, index) => (
            <li key={index} className="bg-white p-4 rounded shadow relative">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="text-gray-700 mt-1">{note.content}</p>
              {note.tag && (
                <span className="text-sm mt-2 inline-block text-blue-600">#{note.tag}</span>
              )}
              {note.language && (
                <span className="text-sm mt-1 block text-purple-600 italic">Language: {note.language}</span>
              )}
              <div className="absolute top-2 right-2 space-x-2">
                <button onClick={() => handleEdit(note)} className="text-orange-500">✏️</button>
                <button onClick={() => handleDelete(note._id)} className="text-pink-600">❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
