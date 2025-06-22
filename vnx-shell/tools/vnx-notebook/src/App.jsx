import { useState, useEffect } from 'react';
import { supabase } from './supabase'; // ✅ Make sure this path is correct

const App = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState([]);
  const [language, setLanguage] = useState('text');


  // ✅ Moved fetchNotes outside so it can be reused
  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error.message);
    } else {
      setNotes(data);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSaveNote = async () => {
    setSaving(true);
    setError('');

    const { error } = await supabase
      .from('notes')
      .insert([{ title, content, tag }]);

    if (error) {
      setError('Failed to save note.');
    } else {
      setTitle('');
      setContent('');
      setTag('');
      await fetchNotes(); // ✅ refresh notes
    }
    const App = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState([]);
  const [language, setLanguage] = useState('text');

  // ✅ Reusable fetchNotes function
  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error.message);
    } else {
      setNotes(data);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Place this here:
  const handleSaveNote = async () => {
    setSaving(true);
    setError('');
    const { error } = await supabase
      .from('notes')
      .insert([{ title, content, tag, language }]);

    if (error) {
      setError('Failed to save note.');
    } else {
      setTitle('');
      setContent('');
      setTag('');
      setLanguage('text');
      await fetchNotes(); // refresh list
    }

    setSaving(false);
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

<select
  className="w-full border border-gray-300 rounded p-2 mb-3"
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
>
  <option value="text">Plain Text</option>
  <option value="python">Python</option>
  <option value="javascript">JavaScript</option>
  <option value="bash">Bash</option>
  <option value="html">HTML</option>
</select>


          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          onClick={handleSaveNote}
          className={`w-full text-white py-2 px-4 rounded transition ${
            title && content
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-300 cursor-not-allowed'
          }`}
          disabled={!title || !content || saving}
        >
          {saving ? 'Saving...' : 'Save Note'}
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
                  <span className="text-sm mt-2 inline-block text-blue-600">
                    #{note.tag}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
