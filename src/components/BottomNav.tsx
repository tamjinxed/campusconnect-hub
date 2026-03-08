import { Newspaper, MessageCircle } from "lucide-react";

interface BottomNavProps {
  activeTab: "feed" | "chat";
  onTabChange: (tab: "feed" | "chat") => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-t border-border">
    <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {[
        { id: "feed" as const, icon: Newspaper, label: "Feed" },
        { id: "chat" as const, icon: MessageCircle, label: "Chat" },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex flex-col items-center gap-0.5 px-6 py-1.5 rounded-xl transition-all duration-200 ${
            activeTab === id
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon size={22} strokeWidth={activeTab === id ? 2.5 : 2} />
          <span className="text-[11px] font-medium">{label}</span>
        </button>
      ))}
    </div>
  </nav>
);

export default BottomNav;
