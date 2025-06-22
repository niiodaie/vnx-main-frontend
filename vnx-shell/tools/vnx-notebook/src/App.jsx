import { useState, useEffect } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [notes, setNotes] = useState([]);

  // Load saved notes from localStorage on load
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('vnx-notes')) || [];
    setNotes(storedNotes);
  }, []);

  const handleSaveNote = () => {
    if (!title.trim() || !content.trim()) return;

    const newNote = { title, content, tag };
    const updatedNotes = [newNote, ...notes];

    setNotes(updatedNotes);
    localStorage.setItem('vnx-notes', JSON.stringify(updatedNotes));

    // Clear inputs
    setTitle('');
    setContent('');
    setTag('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🧠 Notebook VNX</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Title"
          className="w-full border border-gray-300 rounded p-2 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full border border-gray-300 rounded p-2 mb-3 h-24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tag (optional)"
          className="w-full border border-gray-300 rounded p-2 mb-3"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          onClick={handleSaveNote}
          className="w-full bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 transition"
        >
          Save Note
        </button>
      </div>

      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">📝 Your Notes</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          <ul className="space-y-4">
            {notes.map((note, index) => (
              <li key={index} className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="text-gray-700 mt-1">{note.content}</p>
                {note.tag && (
                  <span className="text-sm mt-2 inline-block text-blue-600">#{note.tag}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
