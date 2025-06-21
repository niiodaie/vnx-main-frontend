
import React, { useState } from 'react';
import logo from './assets/logo.png';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

  const addNote = () => {
    const newNote = {
      title,
      content,
      tag: `#${tag}`,
      date: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
    setTag('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Notebook VNX</h1>
          <p className="text-sm text-gray-500">Smart notes powered by Visnec Nexus</p>
        </div>
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h2 className="font-semibold text-lg">+ New Note</h2>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your note here..." className="w-full p-2 border rounded"></textarea>
          <input value={tag} onChange={e => setTag(e.target.value)} placeholder="Tag (e.g., ai, health, etc.)" className="w-full p-2 border rounded" />
          <button onClick={addNote} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">Save Note</button>
        </div>

        {notes.map((note, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p className="text-sm mt-1">{note.content}</p>
            <p className="text-xs text-gray-500 mt-2">{note.tag} | {note.date}</p>
          </div>
        ))}

        <footer className="text-center text-xs text-gray-400 mt-10">Powered by Visnec Nexus | Notebook VNX v1.0.0</footer>
      </main>
    </div>
  );
};

export default App;
