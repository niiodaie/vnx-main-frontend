import { useState } from 'react'
import { PlusCircle, Search, Menu, X, FileText, Tags, Compass, Settings, Bot } from 'lucide-react'

// Mock data for VNX notes
const sampleNotes = [
  {
    id: 1,
    title: "Machine Learning Research Notes",
    content: "# Deep Learning Fundamentals\n\nToday I explored the basics of neural networks and backpropagation. Key insights:\n\n- Gradient descent optimization\n- Activation functions (ReLU, Sigmoid, Tanh)\n- Loss functions for different tasks\n\n**Next Steps:** Implement a simple neural network from scratch using NumPy.",
    excerpt: "Today I explored the basics of neural networks and backpropagation. Key insights: Gradient descent optimization, Activation functions...",
    tags: ["machine-learning", "research", "deep-learning"],
    isBookmarked: true,
    wordCount: 45,
    lastModified: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Project Planning - Q1 2024",
    content: "# Q1 2024 Goals\n\n## Technical Objectives\n1. Complete the notebook application\n2. Implement AI features\n3. Add export functionality\n\n## Research Areas\n- Natural Language Processing\n- Computer Vision applications\n- MLOps best practices",
    excerpt: "Q1 2024 Goals: Complete the notebook application, Implement AI features, Add export functionality...",
    tags: ["planning", "goals", "2024"],
    isBookmarked: false,
    wordCount: 35,
    lastModified: "2024-01-12T14:20:00Z"
  },
  {
    id: 3,
    title: "Literature Review: Transformer Architecture",
    content: "# Transformer Architecture Review\n\n## Key Papers\n1. **Attention Is All You Need** (Vaswani et al., 2017)\n2. **BERT** (Devlin et al., 2018)\n3. **GPT Series** (Radford et al.)\n\n## Key Concepts\n- Self-attention mechanism\n- Positional encoding\n- Multi-head attention\n\n*Note: Need to dive deeper into the mathematical foundations.*",
    excerpt: "Key Papers: Attention Is All You Need (Vaswani et al., 2017), BERT (Devlin et al., 2018), GPT Series...",
    tags: ["literature-review", "transformers", "nlp", "research"],
    isBookmarked: true,
    wordCount: 52,
    lastModified: "2024-01-10T09:15:00Z"
  }
]

function App() {
  const [activeTab, setActiveTab] = useState<"notes" | "tags" | "explore" | "settings">("notes")
  const [selectedNoteId, setSelectedNoteId] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)

  const selectedNote = sampleNotes.find(note => note.id === selectedNoteId) || sampleNotes[0]
  const filteredNotes = sampleNotes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-bold vnx-blue">Notebook VNX</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { id: "notes", label: "Notes", icon: FileText },
              { id: "tags", label: "Tags", icon: Tags },
              { id: "explore", label: "Explore", icon: Compass },
              { id: "settings", label: "Settings", icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium ${
                  activeTab === id 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setIsAIOpen(!isAIOpen)}
              className={`p-2 rounded-lg ${isAIOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Bot size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {[
                { id: "notes", label: "Notes", icon: FileText },
                { id: "tags", label: "Tags", icon: Tags },
                { id: "explore", label: "Explore", icon: Compass },
                { id: "settings", label: "Settings", icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id as any)
                    setIsMenuOpen(false)
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium ${
                    activeTab === id 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === "notes" && (
          <>
            {/* Notes Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <PlusCircle size={16} />
                  <span>New VNX Note</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNoteId(note.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      selectedNoteId === note.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{note.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{note.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{note.wordCount} words</span>
                      <span>{new Date(note.lastModified).toLocaleDateString()}</span>
                    </div>
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {note.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-200 bg-white">
                <input
                  type="text"
                  value={selectedNote.title}
                  className="w-full text-2xl font-bold border-none outline-none bg-transparent"
                  placeholder="Note title..."
                />
              </div>
              
              <div className="flex-1 p-4 bg-white">
                <textarea
                  value={selectedNote.content}
                  className="w-full h-full border-none outline-none resize-none font-mono"
                  placeholder="Start writing your VNX note..."
                />
              </div>
            </div>

            {/* AI Assistant Panel */}
            {isAIOpen && (
              <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                </div>
                <div className="flex-1 p-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      AI features are coming soon! This will include note summarization, 
                      content suggestions, and smart organization.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Other tabs content */}
        {activeTab !== "notes" && (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Coming Soon
              </h2>
              <p className="text-gray-600">
                This feature is under development and will be available soon.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Powered by Visnec Nexus | Notebook VNX</span>
          <span>v1.0.0</span>
        </div>
      </footer>
    </div>
  )
}

export default App