import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("notes").select("*").order("id", { ascending: false });
    if (error) console.error("Fetch error:", error);
    else setNotes(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!title || !content) return;
    const { error } = await supabase.from("notes").insert([{ title, content, tag }]);
    if (error) console.error("Insert error:", error);
    else {
      setTitle("");
      setContent("");
      setTag("");
      fetchNotes();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">🧠 Notebook VNX</h1>
      <div className="max-w-md mx-auto bg-white rounded p-6 shadow">
        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          className={
            "w-full py-2 rounded text-white " +
            (title && content ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed")
          }
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
            {note.tag && (
              <span className="inline-block text-xs mt-2 px-2 py-1 bg-gray-200 rounded">
                #{note.tag}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}