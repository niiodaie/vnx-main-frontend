import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Settings, Moon, Sun, Type, Save, Bot, Zap } from "lucide-react";

export default function SettingsTab() {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [autoSave, setAutoSave] = useState(true);
  const [aiFeatures, setAIFeatures] = useState(false);

  const handleSave = () => {
    console.log("Settings saved:", { darkMode, fontSize: fontSize[0], autoSave, aiFeatures });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-600">Customize your Notebook VNX experience.</p>
      </div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Appearance
          </h2>
          
          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-slate-600" />}
                <div>
                  <p className="font-medium text-slate-800">Dark Mode</p>
                  <p className="text-sm text-slate-500">Switch between light and dark themes</p>
                </div>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            {/* Font Size */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Type className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium text-slate-800">Font Size</p>
                  <p className="text-sm text-slate-500">Adjust text size for better readability</p>
                </div>
              </div>
              <div className="px-8">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-500 w-8">12px</span>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={24}
                    min={12}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-slate-500 w-8">24px</span>
                </div>
                <p className="text-sm text-slate-500 mt-2 text-center">
                  Current: {fontSize[0]}px
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <Save className="w-5 h-5 mr-2" />
            Editor
          </h2>
          
          <div className="space-y-6">
            {/* Auto-save */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium text-slate-800">Auto-save</p>
                  <p className="text-sm text-slate-500">Automatically save changes as you type</p>
                </div>
              </div>
              <Switch
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <Bot className="w-5 h-5 mr-2" />
            AI Features
          </h2>
          
          <div className="space-y-6">
            {/* AI Features Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bot className="w-5 h-5 text-slate-600" />
                <div>
                  <p className="font-medium text-slate-800">Enable AI Features</p>
                  <p className="text-sm text-slate-500">Turn on AI-powered note assistance</p>
                </div>
              </div>
              <Switch
                checked={aiFeatures}
                onCheckedChange={setAIFeatures}
              />
            </div>

            {aiFeatures && (
              <div className="pl-8 space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium mb-2">AI Features Include:</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Smart note summarization</li>
                    <li>• Content suggestions and ideas</li>
                    <li>• Related note discovery</li>
                    <li>• Writing assistance</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="px-8">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <h3 className="text-sm font-medium text-slate-800 mb-2">About Notebook VNX</h3>
        <p className="text-sm text-slate-600">
          Version 1.0.0 - A clean, responsive AI-assisted notetaking tool powered by Visnec Nexus.
        </p>
      </div>
    </div>
  );
}