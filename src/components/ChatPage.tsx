import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatList from "./ChatList";
import ChatInterface from "./ChatInterface";
import ClassroomList from "./ClassroomList";
import ClassroomDetail from "./ClassroomDetail";
import { Plus, KeyRound, Bot, Send } from "lucide-react";
import type { ChatGroup } from "@/data/mockData";
import type { Classroom } from "@/data/classroomData";
import { toast } from "sonner";

const useRole = () => {
  return (localStorage.getItem("campusconnect-role") as "student" | "teacher") || "student";
};

// Demo AI Chat component
const AIChatView = () => {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! I'm your CampusConnect AI assistant. Ask me anything about your courses, campus events, or schedule!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    // Demo AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `That's a great question about "${userMsg}". This is a demo response — real AI integration coming soon! 🚀` },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
          <Bot size={18} className="text-accent" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">AI Assistant</p>
          <p className="text-[10px] text-muted-foreground">Demo Mode</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-3 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask anything..."
          className="rounded-xl"
        />
        <Button size="icon" onClick={handleSend} className="rounded-xl shrink-0">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};

// Teacher Chat Page — create classroom + create club
const TeacherChatPage = () => {
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [activeTab, setActiveTab] = useState("classroom");
  const [showCreate, setShowCreate] = useState(false);
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [showCreateClub, setShowCreateClub] = useState(false);
  const [clubName, setClubName] = useState("");
  const [clubCategory, setClubCategory] = useState("");

  if (selectedClassroom) {
    return <ClassroomDetail classroom={selectedClassroom} onBack={() => setSelectedClassroom(null)} />;
  }

  const handleCreate = () => {
    if (!className.trim()) {
      toast.error("Enter a classroom name");
      return;
    }
    const code = classCode || Math.random().toString(36).substring(2, 8).toUpperCase();
    toast.success(`Classroom "${className}" created! Code: ${code}`);
    setShowCreate(false);
    setClassName("");
    setClassCode("");
  };

  const handleCreateClub = () => {
    if (!clubName.trim()) {
      toast.error("Enter a club name");
      return;
    }
    toast.success(`Club "${clubName}" created!`);
    setShowCreateClub(false);
    setClubName("");
    setClubCategory("");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full rounded-xl bg-muted/60 p-1 mb-4">
        <TabsTrigger value="classroom" className="flex-1 rounded-lg text-xs font-semibold">
          Classrooms
        </TabsTrigger>
        <TabsTrigger value="clubs" className="flex-1 rounded-lg text-xs font-semibold">
          Clubs
        </TabsTrigger>
      </TabsList>

      <TabsContent value="classroom">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wide opacity-70">Your Classrooms</h2>
          <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5" onClick={() => setShowCreate(!showCreate)}>
            <Plus size={14} /> Create
          </Button>
        </div>

        {showCreate && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-3">
            <Input placeholder="Classroom name (e.g. CSE 101)" value={className} onChange={(e) => setClassName(e.target.value)} className="rounded-xl" />
            <Input placeholder="Custom code (optional)" value={classCode} onChange={(e) => setClassCode(e.target.value)} className="rounded-xl" />
            <div className="flex gap-2">
              <Button onClick={handleCreate} className="rounded-xl flex-1 text-xs">Create Classroom</Button>
              <Button variant="ghost" onClick={() => setShowCreate(false)} className="rounded-xl text-xs">Cancel</Button>
            </div>
          </div>
        )}

        <ClassroomList onSelect={setSelectedClassroom} />
      </TabsContent>

      <TabsContent value="clubs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wide opacity-70">Manage Clubs</h2>
          <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5" onClick={() => setShowCreateClub(!showCreateClub)}>
            <Plus size={14} /> Create Club
          </Button>
        </div>

        {showCreateClub && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-3">
            <Input placeholder="Club name" value={clubName} onChange={(e) => setClubName(e.target.value)} className="rounded-xl" />
            <Input placeholder="Category (e.g. Technology, Arts)" value={clubCategory} onChange={(e) => setClubCategory(e.target.value)} className="rounded-xl" />
            <div className="flex gap-2">
              <Button onClick={handleCreateClub} className="rounded-xl flex-1 text-xs">Create Club</Button>
              <Button variant="ghost" onClick={() => setShowCreateClub(false)} className="rounded-xl text-xs">Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {[
            { name: "Robotics Club", shortName: "RC", members: 128, category: "Technology" },
            { name: "CSE Department", shortName: "CS", members: 340, category: "Academic" },
          ].map((club, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-xs">{club.shortName}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{club.name}</p>
                <p className="text-xs text-muted-foreground">{club.members} members · {club.category}</p>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Student Chat Page — classroom, groups, AI, join classroom
const StudentChatPage = () => {
  const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [activeTab, setActiveTab] = useState("classroom");
  const [joinCode, setJoinCode] = useState("");

  if (selectedGroup) {
    return <ChatInterface group={selectedGroup} onBack={() => setSelectedGroup(null)} />;
  }

  if (selectedClassroom) {
    return <ClassroomDetail classroom={selectedClassroom} onBack={() => setSelectedClassroom(null)} />;
  }

  const handleJoin = () => {
    if (!joinCode.trim()) {
      toast.error("Enter a classroom code");
      return;
    }
    toast.success(`Joined classroom with code: ${joinCode.toUpperCase()}`);
    setJoinCode("");
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full rounded-xl bg-muted/60 p-1 mb-4">
        <TabsTrigger value="classroom" className="flex-1 rounded-lg text-xs font-semibold">
          Classroom
        </TabsTrigger>
        <TabsTrigger value="chat" className="flex-1 rounded-lg text-xs font-semibold">
          Groups
        </TabsTrigger>
        <TabsTrigger value="ai" className="flex-1 rounded-lg text-xs font-semibold">
          <Bot size={13} className="mr-1" /> AI
        </TabsTrigger>
      </TabsList>

      <TabsContent value="classroom">
        {/* Join Classroom */}
        <div className="bg-card border border-border rounded-2xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <KeyRound size={14} className="text-primary" />
            <span className="text-xs font-bold text-foreground uppercase tracking-wide opacity-70">Join Classroom</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Enter classroom code"
              className="rounded-xl text-sm"
            />
            <Button size="sm" onClick={handleJoin} className="rounded-xl text-xs shrink-0">
              Join
            </Button>
          </div>
        </div>
        <ClassroomList onSelect={setSelectedClassroom} />
      </TabsContent>

      <TabsContent value="chat">
        <ChatList onSelectGroup={setSelectedGroup} />
      </TabsContent>

      <TabsContent value="ai">
        <AIChatView />
      </TabsContent>
    </Tabs>
  );
};

const ChatPage = () => {
  const role = useRole();
  return role === "teacher" ? <TeacherChatPage /> : <StudentChatPage />;
};

export default ChatPage;
