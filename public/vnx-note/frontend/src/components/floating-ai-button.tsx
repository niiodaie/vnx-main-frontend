import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingAIButtonProps {
  onClick: () => void;
  isActive: boolean;
}

export default function FloatingAIButton({ onClick, isActive }: FloatingAIButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 group ${
        isActive 
          ? "bg-primary hover:bg-primary/90 text-white ring-4 ring-primary/20 scale-110" 
          : "bg-white hover:bg-slate-50 text-primary border-2 border-primary/30 hover:border-primary hover:scale-105"
      }`}
      title="Ask Notebook VNX AI"
    >
      <div className="relative">
        <MessageCircle className={`w-7 h-7 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
        <span className="absolute -top-1 -right-1 text-xs">💬</span>
      </div>
    </Button>
  );
}