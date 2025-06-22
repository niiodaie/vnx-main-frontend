import { useState } from 'react';

export default function NotebookVNX() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');

  const handleSave = () => {
    if (!title || !content) return;
    const newNote = {
      title,
      content,
      tag,
      createdAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setTitle('');
    setContent('');
    setTag('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 px-4 py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">📓 Notebook VNX</h1>
          <p className="text-sm text-slate-500">Smart notes powered by Visnec Nexus</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-slate-500">Cloud Sync</span>
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </div>
      </header>

      {/* Note Input */}
      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto mb-10">
        <h2 className="text-lg font-semibold mb-4">+ New Note</h2>
        <input
          className="w-full p-2 mb-3 rounded border border-slate-300 focus:outline-none"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-3 rounded border border-slate-300 h-24 focus:outline-none"
          placeholder="Write your note here..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 rounded border border-slate-300 focus:outline-none"
          placeholder="Tag (e.g., ai, learning)"
          value={tag}
          onChange={e => setTag(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleSave}
        >
          Save Note
        </button>
      </div>

      {/* Notes Display */}
      <div className="grid gap-4 max-w-4xl mx-auto">
        {notes.length === 0 && (
          <div className="text-center text-slate-500 italic">No notes yet. Start writing!</div>
        )}
        {notes.map((note, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-slate-800">{note.title}</h3>
            <p className="text-slate-600 mb-2">{note.content}</p>
            <div className="text-xs text-slate-400 flex justify-between">
              <span>#{note.tag}</span>
              <span>{new Date(note.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

