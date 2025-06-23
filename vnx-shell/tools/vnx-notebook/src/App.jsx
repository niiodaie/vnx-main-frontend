import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { t, i18n } = useTranslation();

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
      const res = await fetch('https://vnx-main-backend.onrender.com/tools/vnx-note-api/notes');
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.warning("Failed to load notes.");
    }
  };

  const handleSaveNote = async () => {
    if (!title || !content) {
      toast.warn("Please enter a title and content.");
      return;
    }

    const noteData = { title, content, tag, language };

    try {
      if (editingNoteId) {
        await fetch(`https://vnx-main-backend.onrender.com/tools/vnx-note-api/notes/${editingNoteId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        });
        toast.info("Note updated!");
      } else {
        await fetch('https://vnx-main-backend.onrender.com/tools/vnx-note-api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(noteData),
        });
        toast.success("Note saved!");
      }

      setTitle('');
      setContent('');
      setTag('');
      setLanguage('text');
      setEditingNoteId(null);
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note.");
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setTag(note.tag || '');
    setLanguage(note.language || 'text');
    setEditingNoteId(note._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://vnx-main-backend.onrender.com/tools/vnx-note-api/notes/${id}`, {
        method: 'DELETE'
      });
      toast.error("Note deleted!");
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
      toast.warning("Failed to delete note.");
    }
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

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default App;
