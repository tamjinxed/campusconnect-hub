import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { recommendedEvents, upcomingEvents } from "@/data/mockData";
import { CalendarDays, MapPin, Clock, BookOpen } from "lucide-react";
import type { EventData } from "./EventCard";

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

// Build class schedule from classroom data
const classSchedule = [
  { time: "8:00 - 9:30 AM", course: "CSE 101 - Data Structures", room: "Room 301" },
  { time: "10:00 - 11:30 AM", course: "MTH 201 - Linear Algebra", room: "Room 205" },
  { time: "1:00 - 2:30 PM", course: "CSE 302 - Database Systems", room: "Lab 4" },
  { time: "3:00 - 4:30 PM", course: "EEE 201 - Digital Logic", room: "Room 108" },
];

const PersonalCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const eventDates = getEventDates();

  const eventDatesOnly = eventDates.map((ed) => ed.date);

  const selectedKey = selectedDate?.toISOString().split("T")[0];
  const eventsOnDay = selectedDate
    ? eventDates.filter(
        (ed) => ed.date.toISOString().split("T")[0] === selectedKey
      )
    : [];

  const isWeekday = selectedDate ? selectedDate.getDay() >= 0 && selectedDate.getDay() <= 4 : false;
  const showClasses = selectedDate && isWeekday;

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

          {/* Classes for this day */}
          {showClasses && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={14} className="text-primary" />
                <span className="text-xs font-bold text-foreground uppercase tracking-wide opacity-70">Classes</span>
              </div>
              <div className="space-y-2">
                {classSchedule.map((cls, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-primary/5 border border-primary/10">
                    <Clock size={12} className="text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-primary">{cls.time}</p>
                      <p className="text-xs font-semibold text-foreground leading-tight">{cls.course}</p>
                      <p className="text-[11px] text-muted-foreground">{cls.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Events on this day */}
          {eventsOnDay.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CalendarDays size={14} className="text-accent" />
                <span className="text-xs font-bold text-foreground uppercase tracking-wide opacity-70">Events</span>
              </div>
              <div className="space-y-2">
                {eventsOnDay.map(({ event }) => (
                  <div key={event.id} className="flex items-start gap-2 p-2.5 rounded-xl bg-muted/50">
                    <CalendarDays size={14} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{event.title}</p>
                      {event.time && (
                        <p className="text-[11px] text-primary font-medium flex items-center gap-1 mt-0.5">
                          <Clock size={10} /> {event.time}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin size={11} /> {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {eventsOnDay.length === 0 && !showClasses && (
            <p className="text-xs text-muted-foreground">
              {dayIsBusy ? "You marked this day as busy." : "No events or classes on this day."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalCalendar;
