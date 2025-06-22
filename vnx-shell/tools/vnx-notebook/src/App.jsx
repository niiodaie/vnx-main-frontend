import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export default function NotebookVNX() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')

  // Load notes on mount
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setNotes(data)
      if (error) console.error('Fetch error:', error)
    }

    fetchNotes()
  }, [])

  // Save note to Supabase
  const handleSave = async () => {
    if (!title || !content) return
    const { data, error } = await supabase.from('notes').insert([
      { title, content, tag }
    ])
    if (error) {
      console.error('Insert error:', error)
    } else {
      setNotes([data[0], ...notes])
      setTitle('')
      setContent('')
      setTag('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">🧠 Notebook VNX</h1>
        <span className="text-sm text-green-600 flex items-center gap-1">
          Cloud Sync <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </span>
      </header>

      <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
        <h2 className="text-lg font-semibold mb-3">+ New Note</h2>
        <input
          className="w-full mb-3 p-2 border border-slate-300 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full mb-3 p-2 border border-slate-300 rounded"
          rows={4}
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border border-slate-300 rounded"
          placeholder="Tag (e.g., ai, startup)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Note
        </button>
      </div>

      <div className="mt-8 space-y-4 max-w-3xl mx-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-400"
          >
            <h3 className="font-semibold">{note.title}</h3>
            <p className="text-slate-600">{note.content}</p>
            <div className="text-xs text-slate-400 mt-1 flex justify-between">
              <span>#{note.tag}</span>
              <span>{new Date(note.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
