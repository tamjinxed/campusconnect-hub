import { useState } from "react";
import EventCard, { type EventData } from "./EventCard";
import EventDetailModal from "./EventDetailModal";
import { recommendedEvents, upcomingEvents, announcements } from "@/data/mockData";

const FeedSection = ({
  title,
  events,
  horizontal,
  onCardClick,
}: {
  title: string;
  events: EventData[];
  horizontal?: boolean;
  onCardClick: (e: EventData) => void;
}) => (
  <section className="mb-6">
    <h2 className="text-base font-bold text-foreground mb-3 px-1">{title}</h2>
    {horizontal ? (
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1 snap-x snap-mandatory">
        {events.map((e) => (
          <div key={e.id} className="min-w-[260px] max-w-[280px]">
            <EventCard event={e} onCardClick={onCardClick} />
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col gap-3">
        {events.map((e) => (
          <EventCard key={e.id} event={e} onCardClick={onCardClick} />
        ))}
      </div>
    )}
  </section>
);

const FeedPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  return (
    <div className="pb-4">
      <FeedSection title="Recommended for You" events={recommendedEvents} horizontal onCardClick={setSelectedEvent} />
      <FeedSection title="Upcoming Events" events={upcomingEvents} horizontal onCardClick={setSelectedEvent} />
      <FeedSection title="Campus Announcements" events={announcements} onCardClick={setSelectedEvent} />

      <EventDetailModal
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      />
    </div>
  );
};

export default FeedPage;
