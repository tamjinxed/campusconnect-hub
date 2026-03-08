import { useState } from "react";
import { CalendarDays, LayoutList } from "lucide-react";
import EventCard, { type EventData } from "./EventCard";
import PersonalCalendar from "./PersonalCalendar";
import { yourCampusEvents, publicEvents } from "@/data/mockData";

interface FeedPageProps {
  onEventClick: (event: EventData) => void;
  onOrganizerClick?: (organizerId: number) => void;
}

const FeedSection = ({
  title,
  events,
  onCardClick,
}: {
  title: string;
  events: EventData[];
  onCardClick: (e: EventData) => void;
}) => (
  <section className="mb-6">
    <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">{title}</h2>
    <div className="flex flex-col gap-3">
      {events.map((e) => (
        <EventCard key={e.id} event={e} onCardClick={onCardClick} />
      ))}
    </div>
  </section>
);

const FeedPage = ({ onEventClick }: FeedPageProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeSegment, setActiveSegment] = useState<"campus" | "public">("campus");

  return (
    <div className="pb-4">
      {/* Top toggle: Feed / Calendar */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowCalendar(false)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
            !showCalendar ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"
          }`}
        >
          <LayoutList size={14} /> Feed
        </button>
        <button
          onClick={() => setShowCalendar(true)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
            showCalendar ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"
          }`}
        >
          <CalendarDays size={14} /> Calendar
        </button>
      </div>

      {showCalendar ? (
        <PersonalCalendar />
      ) : (
        <>
          {/* Segment toggle: Your Campus / Public Events */}
          <div className="flex rounded-xl bg-muted/60 p-1 mb-5">
            <button
              onClick={() => setActiveSegment("campus")}
              className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${
                activeSegment === "campus"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Your Campus
            </button>
            <button
              onClick={() => setActiveSegment("public")}
              className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${
                activeSegment === "public"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Public Events
            </button>
          </div>

          {activeSegment === "campus" ? (
            <FeedSection
              title="Your Campus"
              events={yourCampusEvents}
              onCardClick={onEventClick}
            />
          ) : (
            <FeedSection
              title="Public Events"
              events={publicEvents}
              onCardClick={onEventClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FeedPage;
