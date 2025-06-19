import { useState, useEffect, useRef } from "react";
import { Share, Download, MoreHorizontal, Eye, Bot, Plus, Save, FileText, Search, Lightbulb, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNotebook, useUpdateNotebook } from "@/hooks/use-notebooks";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import RichTextEditor from "@/components/rich-text-editor";
import { formatDistanceToNow } from "date-fns";
import { ExportService } from "@/lib/export-service";

interface NotebookEditorProps {
  notebookId: number | null;
  onToggleAIAssistant: () => void;
  isAIAssistantOpen: boolean;
}

export default function NotebookEditor({ notebookId, onToggleAIAssistant, isAIAssistantOpen }: NotebookEditorProps) {
  const { toast } = useToast();
  const { data: notebook, isLoading } = useNotebook(notebookId!);
  const updateNotebook = useUpdateNotebook();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notebook) {
      setTitle(notebook.title);
      setContent(notebook.content);
      setHasUnsavedChanges(false);
    }
  }, [notebook]);

  const handleSave = async () => {
    if (!notebookId || !hasUnsavedChanges) return;

    try {
      // Calculate word count
      const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
      
      // Generate excerpt from first 150 characters
      const excerpt = content.replace(/[#*`]/g, '').substring(0, 150) + (content.length > 150 ? '...' : '');

      await updateNotebook.mutateAsync({
        id: notebookId,
        updates: {
          title,
          content,
          excerpt,
          wordCount,
        },
      });
      
      setHasUnsavedChanges(false);
      toast({
        title: "Notebook saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notebook. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setHasUnsavedChanges(true);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasUnsavedChanges(true);
  };

  const handleSummarize = async () => {
    if (!content || !content.trim()) {
      toast({
        title: "No content to summarize",
        description: "Please add some content to your notebook first.",
        variant: "destructive",
      });
      return;
    }

    setIsAIProcessing(true);
    try {
      const response = await apiRequest("POST", "/api/ai/summarize", { content });
      const data = await response.json();
      
      // Open AI Assistant and show summary
      onToggleAIAssistant();
      toast({
        title: "Summary generated",
        description: "Check the AI Assistant panel for your summary.",
      });
    } catch (error) {
      toast({
        title: "Failed to generate summary",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleSuggestNextSteps = async () => {
    if (!content || !content.trim()) {
      toast({
        title: "No content to analyze",
        description: "Please add some content to your notebook first.",
        variant: "destructive",
      });
      return;
    }

    setIsAIProcessing(true);
    try {
      const response = await apiRequest("POST", "/api/ai/suggest", { content });
      const data = await response.json();
      
      // Open AI Assistant and show suggestions
      onToggleAIAssistant();
      toast({
        title: "Next steps suggested",
        description: "Check the AI Assistant panel for suggestions.",
      });
    } catch (error) {
      toast({
        title: "Failed to generate suggestions",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleExport = (format: 'markdown' | 'pdf' | 'text') => {
    if (!notebook) return;
    
    const notebookData = {
      ...notebook,
      title: title || notebook.title,
      content: content || notebook.content
    };

    switch (format) {
      case 'markdown':
        ExportService.exportAsMarkdown(notebookData);
        toast({
          title: "Export Successful",
          description: "Notebook exported as Markdown file"
        });
        break;
      case 'pdf':
        ExportService.exportAsPDF(notebookData);
        toast({
          title: "Export Successful", 
          description: "Notebook exported as PDF (print dialog opened)"
        });
        break;
      case 'text':
        ExportService.exportAsText(notebookData);
        toast({
          title: "Export Successful",
          description: "Notebook exported as text file"
        });
        break;
    }
    setShowExportMenu(false);
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

  if (!notebookId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <h3 className="text-lg font-medium text-slate-800 mb-2">No notebook selected</h3>
          <p className="text-slate-500">Select a notebook from the list to start editing</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-slate-500">Loading notebook...</div>
      </div>
    );
  }

  if (!notebook) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <h3 className="text-lg font-medium text-slate-800 mb-2">Notebook not found</h3>
          <p className="text-slate-500">The selected notebook could not be loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Input
              value={title || ""}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="text-2xl font-semibold text-slate-800 bg-transparent border-none outline-none focus:ring-0 p-0 h-auto"
              placeholder="Untitled Notebook"
            />
            <div className="flex items-center space-x-2">
              {hasUnsavedChanges ? (
                <>
                  <div className="w-2 h-2 bg-orange-400 rounded-full" title="Unsaved changes" />
                  <span className="text-sm text-slate-500">Unsaved</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full" title="Saved" />
                  <span className="text-sm text-slate-500">Saved</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <Button
                size="sm"
                onClick={handleSave}
                disabled={updateNotebook.isPending}
                className="bg-primary text-white hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            )}
            <Button size="sm" variant="ghost" title="Share notebook">
              <Share className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" title="Export notebook">
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" title="More options">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 flex-wrap">
              {notebook?.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`text-xs font-medium ${getTagColor(tag)} border-0`}
                >
                  {tag}
                </Badge>
              ))}
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-slate-400 hover:text-slate-600 h-6 px-2"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add tag
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <span>{notebook?.wordCount || 0} words</span>
            <span>Last edited {notebook?.lastModified ? formatDistanceToNow(new Date(notebook.lastModified), { addSuffix: true }) : 'Unknown'}</span>
          </div>
        </div>
      </div>

      {/* AI Toolbar */}
      <div className="px-8 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10 hover:border-primary/70 transition-all shadow-sm disabled:opacity-50 rounded-xl"
              disabled={true}
              title="AI Summarization - Coming Soon!"
            >
              <FileText className="w-4 h-4 mr-2" />
              ✏️ Summarize Note
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600 transition-all shadow-sm disabled:opacity-50 rounded-xl"
              disabled={true}
              title="Note Recall - Coming Soon!"
            >
              <Search className="w-4 h-4 mr-2" />
              🔍 Recall Similar Notes
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="border-amber-500 text-amber-600 hover:bg-amber-50 hover:border-amber-600 transition-all shadow-sm disabled:opacity-50 rounded-xl"
              disabled={true}
              title="AI Suggestions - Coming Soon!"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              💡 Suggest New Ideas
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10 hover:border-accent/70 transition-all shadow-sm rounded-xl"
              onClick={onToggleAIAssistant}
            >
              <Bot className="w-4 h-4 mr-2" />
              {isAIAssistantOpen ? "Close AI" : "Ask AI"}
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative" ref={exportMenuRef}>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-slate-300 text-slate-600 hover:bg-slate-50 shadow-sm rounded-xl"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              
              {showExportMenu && (
                <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-48">
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left hover:bg-slate-50"
                      onClick={() => handleExport('markdown')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export as Markdown
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left hover:bg-slate-50"
                      onClick={() => handleExport('pdf')}
                    >
                      <FileDown className="w-4 h-4 mr-2" />
                      Export as PDF
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left hover:bg-slate-50"
                      onClick={() => handleExport('text')}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export as Text
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <Button size="sm" variant="outline" className="border-slate-300 text-slate-600 hover:bg-slate-50 shadow-sm rounded-xl">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <RichTextEditor
          content={content}
          onChange={handleContentChange}
          placeholder="Start writing your notebook..."
        />
      </div>
    </div>
  );
}
