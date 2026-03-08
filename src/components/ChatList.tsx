import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { chatGroups, type ChatGroup } from "@/data/mockData";

interface ChatListProps {
  onSelectGroup: (group: ChatGroup) => void;
}

const ChatList = ({ onSelectGroup }: ChatListProps) => (
  <div className="flex flex-col">
    <h2 className="text-base font-bold text-foreground mb-3 px-1">Messages</h2>
    <div className="flex flex-col gap-1">
      {chatGroups.map((group) => (
        <button
          key={group.id}
          onClick={() => onSelectGroup(group)}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors active:scale-[0.98] text-left"
        >
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
              {group.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-sm text-foreground truncate">{group.name}</span>
              <span className="text-[11px] text-muted-foreground shrink-0 ml-2">{group.timestamp}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{group.lastMessage}</p>
          </div>
          {group.unread && (
            <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
              {group.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default ChatList;
