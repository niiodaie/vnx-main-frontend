import React, { useState } from "react";

function App() {
  const [note, setNote] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Notebook VNX</h1>
      <p className="text-gray-600 text-lg mb-8">
        Your modern markdown notebook and idea board. Start typing below.
      </p>

      <textarea
        className="w-full max-w-3xl h-72 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none bg-white"
        placeholder="Write your ideas here in markdown..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <footer className="mt-8 text-sm text-gray-500">
        <p>Notebook VNX – by Visnec Nexus</p>
      </footer>
    </div>
  );
}

export default App;
