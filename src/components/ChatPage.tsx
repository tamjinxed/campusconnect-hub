import { useState } from "react";
import ChatList from "./ChatList";
import ChatInterface from "./ChatInterface";
import type { ChatGroup } from "@/data/mockData";

const ChatPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);

  if (selectedGroup) {
    return <ChatInterface group={selectedGroup} onBack={() => setSelectedGroup(null)} />;
  }

  return <ChatList onSelectGroup={setSelectedGroup} />;
};

export default ChatPage;
