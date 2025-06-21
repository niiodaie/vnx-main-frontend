import React, { useState } from 'react';
import logo from './assets/logo.png'; // Make sure the path is correct

const App = () => {
  const [notes] = useState([
    {
      title: "Machine Learning Research Notes",
      content: "Today I explored the basics of neural networks and backpropagation. Key insights: Gradient descent, activation functions...",
      tag: "#deep-learning",
      date: "Jan 15, 2024",
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Notebook VNX</h1>
          <p className="text-sm text-gray-500">Smart notes powered by Visnec Nexus</p>
        </div>
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </header>

      {/* Navbar */}
      <nav className="bg-red-800 text-white px-4 py-2 text-sm font-medium flex gap-4">
        <button>Notes</button>
        <button>Tags</button>
        <button>Explore</button>
        <button>Settings</button>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Notes List */}
        {notes.map((note, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{note.title}</h2>
            <p className="text-sm mt-1">{note.content}</p>
            <p className="text-xs text-gray-500 mt-2">
              {note.tag} | Date: {note.date}
            </p>
          </div>
        ))}

        {/* New Note Button */}
        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
            + New Note
          </button>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 mt-8">
          Powered by Visnec Nexus | Notebook VNX v1.0.0
        </footer>
      </main>
    </div>
  );
};

export default App;
