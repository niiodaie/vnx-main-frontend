import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm text-slate-600 mb-4 sm:mb-0">
          Powered by <span className="font-medium text-slate-800">Visnec Nexus</span> | Notebook VNX
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Facebook">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors text-sm" aria-label="TikTok">
            TT
          </a>
        </div>
      </div>
    </footer>
  );
}