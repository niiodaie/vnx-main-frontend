import { useState } from "react";
import { Search, Plus, Bookmark, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNotebooks, useCreateNotebook, useSearchNotebooks } from "@/hooks/use-notebooks";
import { useToast } from "@/hooks/use-toast";
import type { Notebook } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface NotebookListProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: "all" | "recent" | "shared";
  onFilterChange: (filter: "all" | "recent" | "shared") => void;
  selectedNotebookId: number | null;
  onSelectNotebook: (id: number) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function NotebookList({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  selectedNotebookId,
  onSelectNotebook,
  isCollapsed,
  onToggleCollapse,
}: NotebookListProps) {
  const { toast } = useToast();
  const { data: allNotebooks = [], isLoading } = useNotebooks(1);
  const { data: searchResults = [] } = useSearchNotebooks(searchQuery, 1);
  const createNotebook = useCreateNotebook();

  const displayNotebooks = searchQuery ? searchResults : allNotebooks;

  const filteredNotebooks = displayNotebooks.filter(notebook => {
    switch (activeFilter) {
      case "recent":
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return new Date(notebook.lastModified) > weekAgo;
      case "shared":
        return false; // No shared notebooks in this demo
      default:
        return true;
    }
  });

  const handleCreateNotebook = async () => {
    try {
      const newNotebook = await createNotebook.mutateAsync({
        title: "Untitled Notebook",
        content: "",
        excerpt: "",
        tags: [],
        isBookmarked: false,
        wordCount: 0,
        userId: 1,
      });
      onSelectNotebook(newNotebook.id);
      toast({
        title: "Notebook created",
        description: "A new notebook has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create notebook. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getTagColor = (tag: string) => {
    const colors = {
      "Research": "bg-blue-50 text-blue-600",
      "AI": "bg-green-50 text-green-600",
      "Deep Learning": "bg-purple-50 text-purple-600",
      "Strategy": "bg-orange-50 text-orange-600",
      "Product": "bg-blue-50 text-blue-600",
      "Development": "bg-green-50 text-green-600",
      "Web": "bg-blue-50 text-blue-600",
      "Best Practices": "bg-purple-50 text-purple-600",
      "Market": "bg-yellow-50 text-yellow-600",
    };
    return colors[tag as keyof typeof colors] || "bg-gray-50 text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="w-80 bg-white border-r border-slate-200 flex items-center justify-center">
        <div className="text-slate-500">Loading notebooks...</div>
      </div>
    );
  }

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-80 lg:w-96'} bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 flex flex-col transition-all duration-300 shadow-sm h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && <h2 className="text-xl font-semibold text-slate-800">My Notebooks</h2>}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={onToggleCollapse}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
            {!isCollapsed && (
              <Button
                size="sm"
                variant="ghost"
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                onClick={handleCreateNotebook}
                disabled={createNotebook.isPending}
                title="Create new notebook"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Search */}
        {!isCollapsed && (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search notebooks..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant={activeFilter === "all" ? "default" : "ghost"}
                className="px-3 py-1.5 text-xs font-medium"
                onClick={() => onFilterChange("all")}
              >
                All <span className="ml-1">{allNotebooks.length}</span>
              </Button>
              <Button
                size="sm"
                variant={activeFilter === "recent" ? "default" : "ghost"}
                className="px-3 py-1.5 text-xs font-medium"
                onClick={() => onFilterChange("recent")}
              >
                Recent{" "}
                <span className="ml-1">
                  {allNotebooks.filter(n => {
                    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                    return new Date(n.lastModified) > weekAgo;
                  }).length}
                </span>
              </Button>
              <Button
                size="sm"
                variant={activeFilter === "shared" ? "default" : "ghost"}
                className="px-3 py-1.5 text-xs font-medium"
                onClick={() => onFilterChange("shared")}
              >
                Shared <span className="ml-1">0</span>
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Notebook List */}
      <div className="flex-1 overflow-y-scroll custom-scrollbar" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="p-4 pb-6">
          {filteredNotebooks.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-medium">{searchQuery ? "No notebooks found" : "No notebooks yet"}</p>
              <p className="text-sm text-slate-400 mt-2">
                {searchQuery ? "Try adjusting your search terms" : "Create your first notebook to get started"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1">
              {filteredNotebooks.map((notebook) => (
                <div
                  key={notebook.id}
                  className={`group cursor-pointer transition-all duration-300 ${
                    selectedNotebookId === notebook.id
                      ? "transform scale-[1.02]"
                      : ""
                  }`}
                  onClick={() => onSelectNotebook(notebook.id)}
                >
                  <div
                    className={`p-5 rounded-2xl transition-all duration-300 ${
                      selectedNotebookId === notebook.id
                        ? "bg-white border-2 border-primary shadow-xl shadow-primary/20 ring-4 ring-primary/10"
                        : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-1"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 mb-1">{notebook.title}</h3>
                        <p className="text-sm text-slate-500 mb-2 line-clamp-2">{notebook.excerpt}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <span>{formatDistanceToNow(new Date(notebook.lastModified), { addSuffix: true })}</span>
                          <span>{notebook.wordCount} words</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 text-slate-400 hover:text-slate-600"
                        >
                          <Bookmark className={`w-4 h-4 ${notebook.isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                    {notebook.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mt-3 flex-wrap gap-1">
                        {notebook.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className={`text-xs font-medium ${getTagColor(tag)} border-0`}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {notebook.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{notebook.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
