import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useBusyDays } from "@/hooks/useBusyDays";
import { recommendedEvents, upcomingEvents } from "@/data/mockData";
import { CalendarDays, MapPin, Ban, Check } from "lucide-react";
import type { EventData } from "./EventCard";

// Map mock events to actual dates in current month for demo
function getEventDates(): { date: Date; event: EventData }[] {
  const allEvents = [...recommendedEvents, ...upcomingEvents];
  const now = new Date();
  return allEvents
    .filter((e) => e.daysUntil >= 0)
    .map((e) => {
      const d = new Date(now);
      d.setDate(d.getDate() + e.daysUntil);
      return { date: new Date(d.getFullYear(), d.getMonth(), d.getDate()), event: e };
    });
}

const PersonalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { busyDays, toggleBusy, isBusy } = useBusyDays();
  const eventDates = getEventDates();

  const eventDatesOnly = eventDates.map((ed) => ed.date);

  const selectedKey = selectedDate?.toISOString().split("T")[0];
  const eventsOnDay = selectedDate
    ? eventDates.filter(
        (ed) => ed.date.toISOString().split("T")[0] === selectedKey
      )
    : [];
  const dayIsBusy = selectedDate ? isBusy(selectedDate) : false;

  return (
    <div className="mb-6">
      <div className="bg-card rounded-2xl border border-border p-3 shadow-sm">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          modifiers={{
            event: eventDatesOnly,
            busy: busyDays,
          }}
          modifiersClassNames={{
            event: "ring-2 ring-primary/40 ring-inset font-bold text-primary",
            busy: "bg-destructive/15 text-destructive line-through",
          }}
          className="w-full"
        />
      </div>

      {selectedDate && (
        <div className="mt-3 bg-card rounded-2xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">
              {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </h3>
            <Button
              size="sm"
              variant={dayIsBusy ? "destructive" : "outline"}
              className="text-xs h-7 rounded-lg"
              onClick={() => toggleBusy(selectedDate)}
            >
              {dayIsBusy ? (
                <>
                  <Check size={13} className="mr-1" /> Busy
                </>
              ) : (
                <>
                  <Ban size={13} className="mr-1" /> Mark Busy
                </>
              )}
            </Button>
          </div>

          {eventsOnDay.length > 0 ? (
            <div className="space-y-2">
              {eventsOnDay.map(({ event }) => (
                <div key={event.id} className="flex items-start gap-2 p-2 rounded-xl bg-muted/50">
                  <CalendarDays size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin size={11} /> {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              {dayIsBusy ? "You marked this day as busy." : "No events on this day."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalCalendar;
