import { ArrowLeft, CalendarDays, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import type { EventData } from "./EventCard";

interface EventDetailPageProps {
  event: EventData;
  onBack: () => void;
  onOrganizerClick?: (organizerId: number) => void;
}

const EventDetailPage = ({ event, onBack, onOrganizerClick }: EventDetailPageProps) => {
  const [registered, setRegistered] = useState(false);
  const participantCount = event.participants ?? 0;

  const handleRegister = () => {
    setRegistered(true);
    toast.success(`Successfully registered for ${event.title}.`);
  };

  return (
    <div className="pb-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-end px-5 pb-4">
          {event.tag && (
            <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-card/90 text-accent shadow-sm">
              {event.tag}
            </span>
          )}
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1">{event.title}</h1>
            <button
              onClick={() => event.organizerId && onOrganizerClick?.(event.organizerId)}
              className={`text-sm font-medium text-primary ${event.organizerId ? "hover:underline cursor-pointer" : ""}`}
            >
              {event.organizer}
              {event.organizerId && <ExternalLink size={12} className="inline ml-1 -mt-0.5" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <CalendarDays size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Date</p>
                <p className="text-sm font-medium text-foreground">{event.date}</p>
              </div>
            </div>
            {event.time && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                <Clock size={16} className="text-primary shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">{event.time}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <MapPin size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground">{event.location}</p>
              </div>
            </div>
            {event.daysUntil >= 0 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/10">
                <Clock size={16} className="text-accent shrink-0" />
                <div>
                  <p className="text-[11px] text-muted-foreground">Starts</p>
                  <p className="text-sm font-semibold text-accent">
                    {event.daysUntil === 0 ? "Today!" : `In ${event.daysUntil} day${event.daysUntil > 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
              <Users size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-[11px] text-muted-foreground">Participating</p>
                <p className="text-sm font-bold text-foreground">{registered ? participantCount + 1 : participantCount}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">About this event</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {event.category !== "announcement" && (
            <Button
              onClick={handleRegister}
              disabled={registered}
              className={`w-full rounded-xl h-11 font-semibold ${registered ? "bg-muted text-muted-foreground" : ""}`}
            >
              {registered ? "Registered ✓" : "Register Now"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
