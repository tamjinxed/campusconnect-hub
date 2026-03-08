import { ArrowLeft, Users, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClubById, getClubEvents } from "@/data/mockData";
import type { EventData } from "./EventCard";
import EventCard from "./EventCard";
import { useState } from "react";
import { toast } from "sonner";

interface ClubPageProps {
  clubId: number;
  onBack: () => void;
  onEventClick: (event: EventData) => void;
}

const ClubPage = ({ clubId, onBack, onEventClick }: ClubPageProps) => {
  const club = getClubById(clubId);
  const events = getClubEvents(clubId);
  const [joined, setJoined] = useState(false);

  if (!club) {
    return (
      <div className="pb-6">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <p className="text-muted-foreground text-sm">Club not found.</p>
      </div>
    );
  }

  const handleJoin = () => {
    setJoined(true);
    toast.success(`Joined ${club.name}!`);
  };

  return (
    <div className="pb-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      {/* Club header */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-4">
        <div className="h-20 bg-gradient-to-br from-primary/25 via-accent/15 to-primary/5" />
        <div className="p-5 -mt-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg mb-3">
            {club.shortName}
          </div>
          <h1 className="text-xl font-bold text-foreground">{club.name}</h1>
          <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent mt-1">
            {club.category}
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">{club.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users size={15} className="text-primary" />
              <span className="font-semibold text-foreground">{joined ? club.memberCount + 1 : club.memberCount}</span>
              <span>members</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={15} className="text-primary" />
              <span className="font-semibold text-foreground">{events.length}</span>
              <span>events</span>
            </div>
          </div>

          <Button
            onClick={handleJoin}
            disabled={joined}
            className={`w-full rounded-xl h-10 font-semibold mt-4 ${joined ? "bg-muted text-muted-foreground" : ""}`}
          >
            {joined ? "Joined ✓" : "Join Club"}
          </Button>
        </div>
      </div>

      {/* Club events */}
      {events.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">Events by {club.name}</h2>
          <div className="flex flex-col gap-3">
            {events.map((e) => (
              <EventCard key={e.id} event={e} onCardClick={onEventClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubPage;
