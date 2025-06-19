import { useState } from "react";
import { Bot, User, X, Send, FileText, Tag, Network, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { AIMessage } from "@shared/schema";

interface AIAssistantProps {
  notebookId: number | null;
  onClose: () => void;
  isOpen: boolean;
}

export default function AIAssistant({ notebookId, onClose, isOpen }: AIAssistantProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "I can help you with research, writing suggestions, and organizing your notes. What would you like to work on today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand you'd like help with that. Here are some suggestions based on your notebook content...",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      summary: "Can you help me summarize the key findings from my current notebook?",
      tags: "Please suggest relevant tags for this notebook based on its content.",
      connections: "Find related notes or topics that connect to this notebook.",
      improve: "Help me improve the writing and structure of this notebook.",
    };

    setInputValue(actionMessages[action as keyof typeof actionMessages] || "");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes === 0) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hr ago`;
    return date.toLocaleDateString();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-80 bg-slate-50 border-l border-slate-200 flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">AI Assistant</h3>
              <p className="text-xs text-slate-500">Research Helper</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" title="Online" />
            <Button
              size="sm"
              variant="ghost"
              className="p-1 text-slate-400 hover:text-slate-600"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === "user" 
                ? "bg-primary" 
                : "bg-accent"
            }`}>
              {message.role === "user" ? (
                <User className="w-3 h-3 text-white" />
              ) : (
                <Bot className="w-3 h-3 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className={`rounded-lg p-3 shadow-sm ${
                message.role === "user"
                  ? "bg-primary text-white"
                  : "bg-white border border-slate-200"
              }`}>
                <p className={`text-sm ${
                  message.role === "user" ? "text-white" : "text-slate-700"
                }`}>
                  {message.content}
                </p>
              </div>
              <p className={`text-xs text-slate-400 mt-1 ${
                message.role === "user" ? "text-right" : ""
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Quick Actions
          </p>
          <div className="grid grid-cols-1 gap-2">
            <Card className="cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all">
              <CardContent 
                className="p-3 text-left"
                onClick={() => handleQuickAction("summary")}
              >
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Summarize current note</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all">
              <CardContent 
                className="p-3 text-left"
                onClick={() => handleQuickAction("tags")}
              >
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Tag className="w-4 h-4 text-primary" />
                  <span>Suggest relevant tags</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all">
              <CardContent 
                className="p-3 text-left"
                onClick={() => handleQuickAction("connections")}
              >
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Network className="w-4 h-4 text-primary" />
                  <span>Find related notes</span>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all">
              <CardContent 
                className="p-3 text-left"
                onClick={() => handleQuickAction("improve")}
              >
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Edit className="w-4 h-4 text-primary" />
                  <span>Improve writing</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask AI anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 text-sm"
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-accent text-white hover:bg-accent/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          AI responses are generated based on your notebook content
        </p>
      </div>
    </div>
  );
}
