import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-red-700 text-white px-6 py-4 shadow">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold">Notebook VNX</h1>
          <span className="text-sm hidden md:block">Smart notes powered by Visnec Nexus</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full p-3 border rounded shadow-sm focus:ring focus:outline-none"
        />

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Machine Learning Research Notes</h2>
          <p className="mb-4">Today I explored the basics of neural networks and backpropagation. Key insights: Gradient descent, activation functions...</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">#deep-learning</span>
            <span>| Date: Jan 15, 2024</span>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-gray-500 py-6">
        Powered by Visnec Nexus | Notebook VNX v1.0.0
      </footer>
    </div>
  );
}

export default App;
