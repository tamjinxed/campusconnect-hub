import { useState } from "react";
import { CalendarDays, LayoutList, Plus } from "lucide-react";
import EventCard, { type EventData } from "./EventCard";
import PersonalCalendar from "./PersonalCalendar";
import { yourCampusEvents, publicEvents, clubs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
  const [showCreateClub, setShowCreateClub] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubCategory, setNewClubCategory] = useState("");
  const [extraClubs, setExtraClubs] = useState<typeof clubs>([]);

  const role = (localStorage.getItem("campusconnect-role") as "student" | "teacher") || "student";

  const handleClubClick = (clubId: number) => {
    onOrganizerClick?.(clubId);
  };

  const handleCreateClub = () => {
    if (!newClubName.trim() || !newClubCategory.trim()) {
      toast.error("Fill in club name and category");
      return;
    }
    const shortName = newClubName.trim().split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const newClub = {
      id: Date.now(),
      name: newClubName.trim(),
      shortName,
      description: `A new club created by a teacher.`,
      memberCount: 1,
      category: newClubCategory.trim(),
      events: [] as number[],
    };
    setExtraClubs([...extraClubs, newClub]);
    setNewClubName("");
    setNewClubCategory("");
    setShowCreateClub(false);
    toast.success(`Club "${newClub.name}" created!`);
  };

  const allUniversityClubs = [...universityClubs, ...extraClubs.filter(c => c.category === "Academic" || c.category === "Technology")];
  const allPublicClubs = [...publicClubs, ...extraClubs.filter(c => c.category !== "Academic" && c.category !== "Technology")];

  return (
    <div className="pb-4">
      {/* Top toggle */}
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
          {/* Segment toggle */}
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
              {/* Teacher: Create Club */}
              {role === "teacher" && (
                <div className="mb-2">
                  {!showCreateClub ? (
                    <Button variant="outline" className="w-full rounded-xl text-xs gap-1.5" onClick={() => setShowCreateClub(true)}>
                      <Plus size={14} /> Create New Club
                    </Button>
                  ) : (
                    <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                      <Input placeholder="Club name" value={newClubName} onChange={(e) => setNewClubName(e.target.value)} className="rounded-xl" />
                      <Input placeholder="Category (e.g. Technology, Arts)" value={newClubCategory} onChange={(e) => setNewClubCategory(e.target.value)} className="rounded-xl" />
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setShowCreateClub(false)} className="rounded-xl text-xs">Cancel</Button>
                        <Button size="sm" onClick={handleCreateClub} className="rounded-xl text-xs gap-1.5"><Plus size={12} /> Create</Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <section>
                <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">Your University Clubs</h2>
                <div className="flex flex-col gap-2">
                  {allUniversityClubs.map(club => (
                    <ClubCard key={club.id} club={club} onClick={handleClubClick} />
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">Public Clubs</h2>
                <div className="flex flex-col gap-2">
                  {allPublicClubs.map(club => (
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
