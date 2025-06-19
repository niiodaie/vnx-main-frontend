import { BookOpen, Search, Settings, Tag, Compass, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface HeaderProps {
  activeTab: "notes" | "tags" | "explore" | "settings";
  onTabChange: (tab: "notes" | "tags" | "explore" | "settings") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ activeTab, onTabChange, searchQuery, onSearchChange }: HeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real implementation, this would toggle the dark class on the document
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-primary/20">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Notebook VNX
                </h1>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Button
              variant="ghost"
              className={`px-6 py-2 text-sm font-medium transition-all rounded-full ${
                activeTab === "notes" 
                  ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/30" 
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/80"
              }`}
              onClick={() => onTabChange("notes")}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Notes
            </Button>
            
            <Button
              variant="ghost"
              className={`px-6 py-2 text-sm font-medium transition-all rounded-full ${
                activeTab === "tags" 
                  ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/30" 
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/80"
              }`}
              onClick={() => onTabChange("tags")}
            >
              <Tag className="w-4 h-4 mr-2" />
              Tags
            </Button>
            
            <Button
              variant="ghost"
              className={`px-6 py-2 text-sm font-medium transition-all rounded-full ${
                activeTab === "explore" 
                  ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/30" 
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/80"
              }`}
              onClick={() => onTabChange("explore")}
            >
              <Compass className="w-4 h-4 mr-2" />
              Explore
            </Button>
            
            <Button
              variant="ghost"
              className={`px-6 py-2 text-sm font-medium transition-all rounded-full ${
                activeTab === "settings" 
                  ? "bg-primary text-primary-foreground shadow-lg ring-2 ring-primary/30" 
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/80"
              }`}
              onClick={() => onTabChange("settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${
                isSearchFocused ? "text-primary" : "text-slate-400"
              }`} />
              <Input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`pl-10 w-48 lg:w-64 transition-all rounded-full ${
                  isSearchFocused ? "ring-2 ring-primary/30 border-primary shadow-lg" : "border-slate-200"
                }`}
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:bg-slate-100/80"
              onClick={toggleDarkMode}
              title="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 rounded-full hover:bg-slate-100/80"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className={`justify-start px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === "notes" 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/80"
                }`}
                onClick={() => {
                  onTabChange("notes");
                  setIsMobileMenuOpen(false);
                }}
              >
                <BookOpen className="w-4 h-4 mr-3" />
                Notes
              </Button>
              
              <Button
                variant="ghost"
                className={`justify-start px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === "tags" 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/80"
                }`}
                onClick={() => {
                  onTabChange("tags");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Tag className="w-4 h-4 mr-3" />
                Tags
              </Button>
              
              <Button
                variant="ghost"
                className={`justify-start px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === "explore" 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/80"
                }`}
                onClick={() => {
                  onTabChange("explore");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Compass className="w-4 h-4 mr-3" />
                Explore
              </Button>
              
              <Button
                variant="ghost"
                className={`justify-start px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === "settings" 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-600 hover:text-slate-800 hover:bg-slate-100/80"
                }`}
                onClick={() => {
                  onTabChange("settings");
                  setIsMobileMenuOpen(false);
                }}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Button>

              {/* Mobile Search */}
              <div className="px-4 pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 w-full rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}