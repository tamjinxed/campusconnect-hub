import { useState } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import FeedPage from "@/components/FeedPage";
import ChatPage from "@/components/ChatPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"feed" | "chat">("feed");

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="pt-16 pb-20 px-4 max-w-lg mx-auto">
        {activeTab === "feed" ? <FeedPage /> : <ChatPage />}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
