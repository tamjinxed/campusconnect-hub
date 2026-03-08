import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ChatList from "./ChatList";
import ChatInterface from "./ChatInterface";
import ClassroomList from "./ClassroomList";
import ClassroomDetail from "./ClassroomDetail";
import type { ChatGroup } from "@/data/mockData";
import type { Classroom } from "@/data/classroomData";

const ChatPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

  if (selectedGroup) {
    return <ChatInterface group={selectedGroup} onBack={() => setSelectedGroup(null)} />;
  }

  if (selectedClassroom) {
    return <ClassroomDetail classroom={selectedClassroom} onBack={() => setSelectedClassroom(null)} />;
  }

  return (
    <Tabs defaultValue="classroom" className="w-full">
      <TabsList className="w-full rounded-xl bg-muted/60 p-1 mb-4">
        <TabsTrigger value="classroom" className="flex-1 rounded-lg text-xs font-semibold">
          Classroom
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex-1 rounded-lg text-xs font-semibold">
          Chat
        </TabsTrigger>
      </TabsList>
      <TabsContent value="classroom">
        <ClassroomList onSelect={setSelectedClassroom} />
      </TabsContent>
      <TabsContent value="chat">
        <ChatList onSelectGroup={setSelectedGroup} />
      </TabsContent>
    </Tabs>
  );
};

export default ChatPage;
