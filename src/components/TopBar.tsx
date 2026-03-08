import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TopBar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-card/80 backdrop-blur-lg border-b border-border">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">CC</span>
      </div>
      <span className="font-bold text-lg text-foreground tracking-tight">CampusConnect</span>
    </div>
    <Avatar className="h-9 w-9 border-2 border-primary/20">
      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">TK</AvatarFallback>
    </Avatar>
  </header>
);

export default TopBar;
