import { CalendarDays, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export interface EventData {
  id: number;
  title: string;
  organizer: string;
  organizerId?: number;
  date: string;
  time?: string;
  location: string;
  description: string;
  daysUntil: number;
  tag?: string;
  participants?: number;
  category?: string;
  coverImage?: string;
}

interface EventCardProps {
  event: EventData;
  onCardClick: (event: EventData) => void;
  compact?: boolean;
}

const EventCard = ({ event, onCardClick, compact }: EventCardProps) => {
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRegistered(true);
    toast.success(`Successfully registered for ${event.title}.`);
  };

  return (
    <div
      onClick={() => onCardClick(event)}
      className={`bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] ${
        compact ? "p-3 min-w-[240px] max-w-[260px] snap-start" : "p-4"
      }`}
    >
      {event.tag && (
        <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent mb-2">
          {event.tag}
        </span>
      )}
      <h3 className="font-semibold text-foreground text-[15px] leading-snug mb-1">{event.title}</h3>
      <p className="text-primary text-xs font-medium mb-2">{event.organizer}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <CalendarDays size={13} className="shrink-0" />
          <span>{event.date}{event.time ? ` · ${event.time}` : ""}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <MapPin size={13} className="shrink-0" />
          <span>{event.location}</span>
        </div>
        {event.daysUntil >= 0 && (
          <div className="flex items-center gap-1.5 text-accent text-xs font-medium">
            <Clock size={13} className="shrink-0" />
            <span>{event.daysUntil === 0 ? "Today!" : `In ${event.daysUntil}d`}</span>
          </div>
        )}
        {event.participants != null && event.participants > 0 && (
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Users size={13} className="shrink-0" />
            <span>{event.participants}</span>
          </div>
        )}
      </div>
      {!compact && (
        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{event.description}</p>
      )}
      {event.category !== "announcement" && (
        <Button
          size="sm"
          onClick={handleRegister}
          disabled={registered}
          className={`w-full text-xs h-8 rounded-xl ${registered ? "bg-muted text-muted-foreground" : ""}`}
        >
          {registered ? "Registered ✓" : "Register"}
        </Button>
      )}
    </div>
  );
};

export default EventCard;
