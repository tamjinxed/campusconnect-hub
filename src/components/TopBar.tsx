import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopBarProps {
  onProfileClick?: () => void;
  onLogoClick?: () => void;
}

const TopBar = ({ onProfileClick, onLogoClick }: TopBarProps) => (
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-card/80 backdrop-blur-lg border-b border-border">
    <button onClick={onLogoClick} className="flex items-center gap-2 focus:outline-none">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">CC</span>
      </div>
      <span className="font-bold text-lg text-foreground tracking-tight">CampusConnect</span>
    </button>
    <button onClick={onProfileClick} className="focus:outline-none">
      <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary/40 transition-colors">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">TK</AvatarFallback>
      </Avatar>
    </button>
  </header>
);

export default TopBar;
