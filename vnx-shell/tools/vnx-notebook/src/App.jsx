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
    try {
setNotes(await fetch('https://vnx-main-backend.onrender.com/tools/vnx-note-api/notes').then(res => res.json()));

    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

 const handleSaveNote = async () => {
  if (!title || !content) return alert("Title and content are required.");

  const noteData = { title, content, tag, language };

  try {
    await fetch('https://vnx-main-backend.onrender.com/tools/vnx-note-api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });

    setTitle('');
    setContent('');
    setTag('');
    setLanguage('text');
    setEditingNoteId(null);
    fetchNotes();
  } catch (error) {
    console.error("Error saving note:", error);
    alert("Failed to save note.");
  }
};
  
  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setTag(note.tag || '');
    setLanguage(note.language || 'text');
    setEditingNoteId(note._id);
  };

  const uniqueTags = [...new Set(notes.map(n => n.tag).filter(Boolean))];
  const filteredNotes = selectedTag ? notes.filter(n => n.tag === selectedTag) : notes;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">🧠 Notebook VNX</h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full mb-2 p-2 border rounded h-24"
        />
        <input
          type="text"
          placeholder="Tag (optional)"
          value={tag}
          onChange={e => setTag(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="text">Plain Text</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>

        <button
          onClick={handleSaveNote}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {editingNoteId ? 'Update Note' : 'Save Note'}
        </button>
      </div>

      <div className="max-w-xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-3">🔖 Filter by Tag</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded ${selectedTag === null ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          {uniqueTags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1 rounded ${selectedTag === t ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}
            >
              #{t}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-3">📚 Your Notes</h2>
        <ul className="space-y-4">
          {filteredNotes.map((note) => (
            <li key={note._id} className="bg-white p-4 rounded shadow relative">
              <h3 className="font-bold text-lg">{note.title}</h3>
              <p className="whitespace-pre-wrap text-gray-700 mt-1">{note.content}</p>
              {note.tag && (
                <span className="text-sm inline-block mt-2 text-blue-600">#{note.tag}</span>
              )}
              {note.language && (
                <span className="text-sm block text-purple-600 italic">Language: {note.language}</span>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => handleEdit(note)} className="text-orange-500">✏️</button>
                <button onClick={() => handleDelete(note._id)} className="text-red-600">🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
