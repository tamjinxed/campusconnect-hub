import { useState, useCallback } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import FeedPage from "@/components/FeedPage";
import ChatPage from "@/components/ChatPage";
import EventDetailPage from "@/components/EventDetailPage";
import ClubPage from "@/components/ClubPage";
import ProfilePage from "@/components/ProfilePage";
import type { EventData } from "@/components/EventCard";

type View =
  | { type: "feed" }
  | { type: "chat" }
  | { type: "event"; event: EventData }
  | { type: "club"; clubId: number }
  | { type: "profile" };

const Index = () => {
  const [activeTab, setActiveTab] = useState<"feed" | "chat">("feed");
  const [view, setView] = useState<View>({ type: "feed" });
  const [registeredEvents, setRegisteredEvents] = useState<EventData[]>([]);

  const handleTabChange = (tab: "feed" | "chat") => {
    setActiveTab(tab);
    setView({ type: tab });
  };

  const handleEventClick = (event: EventData) => {
    setView({ type: "event", event });
  };

  const handleOrganizerClick = (organizerId: number) => {
    setView({ type: "club", clubId: organizerId });
  };

  const handleBack = () => {
    setView({ type: activeTab });
  };

  const handleProfileClick = () => {
    setView({ type: "profile" });
  };

  const renderContent = () => {
    switch (view.type) {
      case "event":
        return (
          <EventDetailPage
            event={view.event}
            onBack={handleBack}
            onOrganizerClick={handleOrganizerClick}
          />
        );
      case "club":
        return (
          <ClubPage
            clubId={view.clubId}
            onBack={handleBack}
            onEventClick={handleEventClick}
          />
        );
      case "profile":
        return (
          <ProfilePage
            onBack={handleBack}
            onEventClick={handleEventClick}
            registeredEvents={registeredEvents}
          />
        );
      case "chat":
        return <ChatPage />;
      case "feed":
      default:
        return <FeedPage onEventClick={handleEventClick} onOrganizerClick={handleOrganizerClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar onProfileClick={handleProfileClick} />
      <main className="pt-16 pb-20 px-4 max-w-lg mx-auto">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
