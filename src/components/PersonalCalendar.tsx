import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useBusyDays } from "@/hooks/useBusyDays";
import { recommendedEvents, upcomingEvents } from "@/data/mockData";
import { CalendarDays, MapPin, Ban, Check, Clock, BookOpen } from "lucide-react";
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

const todayClasses = [
  { time: "8:00 - 9:30 AM", course: "CSE 101 - Data Structures", room: "Room 301" },
  { time: "10:00 - 11:30 AM", course: "MTH 201 - Linear Algebra", room: "Room 205" },
  { time: "1:00 - 2:30 PM", course: "CSE 302 - Database Systems", room: "Lab 4" },
  { time: "3:00 - 4:30 PM", course: "EEE 201 - Digital Logic", room: "Room 108" },
];

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
      {/* Calendar + Today's Classes side by side on wider screens, stacked on mobile */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="bg-card rounded-2xl border border-border p-3 shadow-sm flex-1">
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

        {/* Today's Class Routine */}
        <div className="bg-card rounded-2xl border border-border p-4 shadow-sm sm:w-[240px] shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={15} className="text-primary" />
            <h3 className="text-sm font-bold text-foreground">Today's Classes</h3>
          </div>
          <div className="space-y-2.5">
            {todayClasses.map((cls, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-muted/50 border border-border/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock size={11} className="text-primary shrink-0" />
                  <span className="text-[11px] font-semibold text-primary">{cls.time}</span>
                </div>
                <p className="text-xs font-semibold text-foreground leading-tight">{cls.course}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{cls.room}</p>
              </div>
            ))}
          </div>
        </div>
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
