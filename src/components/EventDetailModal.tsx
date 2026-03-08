import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarDays, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import type { EventData } from "./EventCard";

interface EventDetailModalProps {
  event: EventData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventDetailModal = ({ event, open, onOpenChange }: EventDetailModalProps) => {
  const [registered, setRegistered] = useState(false);

  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden">
        <div className="bg-primary/5 p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">{event.title}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-primary font-medium mt-1">{event.organizer}</p>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays size={16} className="text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              <span>{event.location}</span>
            </div>
            {event.daysUntil >= 0 && (
              <div className="flex items-center gap-2 text-sm text-accent font-medium">
                <Clock size={16} />
                <span>{event.daysUntil === 0 ? "Happening today!" : `Starts in ${event.daysUntil} day${event.daysUntil > 1 ? "s" : ""}`}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users size={16} className="text-primary" />
              <span>42 registered</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
          <Button
            onClick={() => { setRegistered(true); toast.success(`Successfully registered for ${event.title}.`); }}
            disabled={registered}
            className={`w-full rounded-xl ${registered ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"}`}
          >
            {registered ? "Registered ✓" : "Register Now"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
