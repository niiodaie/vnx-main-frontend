import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, Hash } from "lucide-react";

export default function TagsTab() {
  const [newTag, setNewTag] = useState("");
  
  // Sample tags for demonstration
  const sampleTags = [
    { name: "Research", count: 3, color: "bg-blue-50 text-blue-600" },
    { name: "AI", count: 2, color: "bg-green-50 text-green-600" },
    { name: "Deep Learning", count: 1, color: "bg-purple-50 text-purple-600" },
    { name: "Strategy", count: 1, color: "bg-orange-50 text-orange-600" },
    { name: "Product", count: 1, color: "bg-blue-50 text-blue-600" },
    { name: "Web Dev", count: 1, color: "bg-emerald-50 text-emerald-600" },
    { name: "Performance", count: 1, color: "bg-red-50 text-red-600" },
    { name: "Security", count: 1, color: "bg-yellow-50 text-yellow-600" },
    { name: "Design", count: 1, color: "bg-pink-50 text-pink-600" },
    { name: "UI/UX", count: 1, color: "bg-indigo-50 text-indigo-600" },
  ];

  const handleAddTag = () => {
    if (newTag.trim()) {
      console.log("Adding tag:", newTag);
      setNewTag("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Tags</h1>
        <p className="text-slate-600">Organize your notes with tags for easy discovery and filtering.</p>
      </div>

      {/* Add New Tag */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Tag
        </h2>
        <div className="flex space-x-3">
          <Input
            placeholder="Enter tag name..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="flex-1"
          />
          <Button onClick={handleAddTag} disabled={!newTag.trim()}>
            <Hash className="w-4 h-4 mr-2" />
            Add Tag
          </Button>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Your Tags
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleTags.map((tag) => (
            <div
              key={tag.name}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Badge className={`${tag.color} border-0 text-sm font-medium`}>
                  {tag.name}
                </Badge>
              </div>
              <div className="text-sm text-slate-500">
                {tag.count} note{tag.count !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tag Management Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Tag Management Tips</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Use specific tags like "machine-learning" instead of just "tech"</li>
          <li>• Keep tag names short and descriptive</li>
          <li>• Tags help you find related notes quickly</li>
          <li>• You can add multiple tags to each note</li>
        </ul>
      </div>
    </div>
  );
}