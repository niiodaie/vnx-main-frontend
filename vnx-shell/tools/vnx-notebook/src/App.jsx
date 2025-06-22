// src/App.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
    if (!error) setNotes(data);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    setError('');
    const { data, error } = await supabase.from('notes').insert([{ title, content, tag }]);
    if (!error) {
      setTitle('');
      setContent('');
      setTag('');
      fetchNotes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-indigo-800 mb-6">🧠 Notebook VNX</h1>

      <div className="bg-white shadow-md rounded-md p-6 max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-4">+ New Note</h2>
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 mb-3 rounded"
          rows={6}
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Tag (e.g., ai, startup)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <button
          className={`w-full py-2 rounded text-white ${title && content ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
          onClick={handleSave}
          disabled={!title || !content}
        >
          Save Note
        </button>
      </div>

      <div className="mt-10 max-w-lg mx-auto">
        <h3 className="text-xl font-bold mb-4">📝 Your Notes</h3>
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded shadow p-4 mb-3">
            <h4 className="font-semibold">{note.title}</h4>
            <p className="text-sm text-gray-700">{note.content}</p>
            {note.tag && <span className="inline-block text-xs mt-2 px-2 py-1 bg-gray-200 rounded">#{note.tag}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
