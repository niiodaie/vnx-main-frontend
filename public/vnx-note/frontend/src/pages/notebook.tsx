import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import NotebookList from "@/components/notebook-list";
import NotebookEditor from "@/components/notebook-editor";
import AIAssistant from "@/components/ai-assistant";
import FloatingAIButton from "@/components/floating-ai-button";
import Footer from "@/components/footer";
import TagsTab from "@/components/tags-tab";
import ExploreTab from "@/components/explore-tab";
import SettingsTab from "@/components/settings-tab";
import ComingSoonModal from "@/components/coming-soon-modal";

export default function NotebookApp() {
  const [location] = useLocation();
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isNotebookListCollapsed, setIsNotebookListCollapsed] = useState(false);
  const [selectedNotebookId, setSelectedNotebookId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "recent" | "shared">("all");
  const [activeTab, setActiveTab] = useState<"notes" | "tags" | "explore" | "settings">("notes");
  const [modalFeature, setModalFeature] = useState<string | null>(null);

  // Extract notebook ID from URL if present
  const notebookIdFromUrl = location.match(/\/notebook\/(\d+)/)?.[1];
  const currentNotebookId = notebookIdFromUrl ? parseInt(notebookIdFromUrl) : selectedNotebookId;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {activeTab === "notes" ? (
          <>
            {/* Mobile: Hide sidebar when editor is open */}
            <div className={`${currentNotebookId ? 'hidden lg:block' : 'block'} h-full`}>
              <NotebookList
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                selectedNotebookId={currentNotebookId}
                onSelectNotebook={setSelectedNotebookId}
                isCollapsed={isNotebookListCollapsed}
                onToggleCollapse={() => setIsNotebookListCollapsed(!isNotebookListCollapsed)}
              />
            </div>
            
            <div className={`flex-1 flex ${currentNotebookId ? 'block' : 'hidden lg:block'}`}>
              <NotebookEditor
                notebookId={currentNotebookId}
                onToggleAIAssistant={() => setIsAIAssistantOpen(!isAIAssistantOpen)}
                isAIAssistantOpen={isAIAssistantOpen}
              />
              
              {isAIAssistantOpen && (
                <div className="hidden lg:block">
                  <AIAssistant
                    notebookId={currentNotebookId}
                    onClose={() => setIsAIAssistantOpen(false)}
                    isOpen={isAIAssistantOpen}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {activeTab === "tags" && <TagsTab />}
            {activeTab === "explore" && <ExploreTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        )}
      </div>
      
      {/* Floating AI Button - visible on mobile or when AI panel is closed */}
      <div className={`${isAIAssistantOpen ? 'lg:hidden' : ''}`}>
        <FloatingAIButton 
          onClick={() => setModalFeature("Notebook AI Assistant")}
          isActive={isAIAssistantOpen}
        />
      </div>
      
      {/* Coming Soon Modal */}
      <ComingSoonModal 
        isOpen={modalFeature !== null}
        onClose={() => setModalFeature(null)}
        feature={modalFeature || ""}
      />
      
      <Footer />
    </div>
  );
}
