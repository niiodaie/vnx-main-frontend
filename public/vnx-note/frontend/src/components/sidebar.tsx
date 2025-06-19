import { BookOpen, Plus, Bookmark, Bot, Settings, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNotebooks } from "@/hooks/use-notebooks";

interface SidebarProps {
  isAIAssistantOpen: boolean;
  onToggleAIAssistant: () => void;
  onCreateNotebook: () => void;
}

export default function Sidebar({ isAIAssistantOpen, onToggleAIAssistant, onCreateNotebook }: SidebarProps) {
  const { data: notebooks = [] } = useNotebooks(1); // Using user ID 1 for demo
  
  // Get unique tags and their counts
  const tagCounts = notebooks.reduce((acc, notebook) => {
    notebook.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const recentTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([tag]) => tag);

  const savedCount = notebooks.filter(n => n.isBookmarked).length;

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Notebook VNX</h1>
            <p className="text-xs text-slate-500">AI Research Journal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          <Button
            variant="default"
            className="w-full justify-start space-x-3 bg-primary text-white hover:bg-primary/90"
          >
            <BookOpen className="w-4 h-4" />
            <span>Notebooks</span>
            <Badge variant="secondary" className="ml-auto bg-blue-400 text-white border-0">
              {notebooks.length}
            </Badge>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            onClick={onCreateNotebook}
          >
            <Plus className="w-4 h-4" />
            <span>New Entry</span>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
            <Badge variant="secondary" className="ml-auto bg-slate-200 text-slate-600 border-0">
              {savedCount}
            </Badge>
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            onClick={onToggleAIAssistant}
          >
            <Bot className="w-4 h-4" />
            <span>AI Assistant</span>
            {isAIAssistantOpen && (
              <div className="ml-auto w-2 h-2 bg-accent rounded-full" title="Active" />
            )}
          </Button>
        </div>

        {/* Recent Tags */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Recent Tags
          </h3>
          <div className="space-y-1">
            {recentTags.map(tag => (
              <Button
                key={tag}
                variant="ghost"
                className="w-full text-left px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 justify-start"
              >
                <Tag className="w-3 h-3 mr-2" />
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <Button
          variant="ghost"
          className="w-full justify-start space-x-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
        >
          <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center">
            <User className="w-3 h-3" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-sm">Alex Chen</p>
            <p className="text-xs text-slate-500">Settings</p>
          </div>
          <Settings className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
