import { useState } from "react";
import { CalendarDays, LayoutList } from "lucide-react";
import EventCard, { type EventData } from "./EventCard";
import PersonalCalendar from "./PersonalCalendar";
import { yourCampusEvents, publicEvents, clubs } from "@/data/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

// Separate university clubs from public clubs
const universityClubs = clubs.filter(c => c.category === "Academic" || c.category === "Technology");
const publicClubs = clubs.filter(c => c.category !== "Academic" && c.category !== "Technology");

const ClubCard = ({ club, onClick }: { club: typeof clubs[0]; onClick: (id: number) => void }) => (
  <button
    onClick={() => onClick(club.id)}
    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors text-left w-full"
  >
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
      <span className="text-primary font-bold text-sm">{club.shortName}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-foreground truncate">{club.name}</p>
      <p className="text-xs text-muted-foreground">{club.memberCount} members · {club.category}</p>
    </div>
  </button>
);

const FeedPage = ({ onEventClick, onOrganizerClick }: FeedPageProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeSegment, setActiveSegment] = useState<"campus" | "public" | "clubs">("campus");

  const handleClubClick = (clubId: number) => {
    onOrganizerClick?.(clubId);
  };

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
          {/* Segment toggle: Your Campus / Public Events / Clubs */}
          <div className="flex rounded-xl bg-muted/60 p-1 mb-5">
            {(["campus", "public", "clubs"] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setActiveSegment(seg)}
                className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${
                  activeSegment === seg
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {seg === "campus" ? "Your Campus" : seg === "public" ? "Public Events" : "Clubs"}
              </button>
            ))}
          </div>

          {activeSegment === "campus" ? (
            <FeedSection title="Your Campus" events={yourCampusEvents} onCardClick={onEventClick} />
          ) : activeSegment === "public" ? (
            <FeedSection title="Public Events" events={publicEvents} onCardClick={onEventClick} />
          ) : (
            <div className="space-y-6">
              <section>
                <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">Your University Clubs</h2>
                <div className="flex flex-col gap-2">
                  {universityClubs.map(club => (
                    <ClubCard key={club.id} club={club} onClick={handleClubClick} />
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">Public Clubs</h2>
                <div className="flex flex-col gap-2">
                  {publicClubs.map(club => (
                    <ClubCard key={club.id} club={club} onClick={handleClubClick} />
                  ))}
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedPage;
