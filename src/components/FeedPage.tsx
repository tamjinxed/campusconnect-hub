import { useState } from "react";
import { CalendarDays, LayoutList, Megaphone, Plus, CheckCircle2 } from "lucide-react";
import EventCard, { type EventData } from "./EventCard";
import PersonalCalendar from "./PersonalCalendar";
import { yourCampusEvents, publicEvents, clubs, announcements } from "@/data/mockData";
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
    {events.length === 0 ? (
      <p className="text-xs text-muted-foreground py-6 text-center">No events here yet.</p>
    ) : (
      <div className="flex flex-col gap-3">
        {events.map((e) => (
          <EventCard key={e.id} event={e} onCardClick={onCardClick} />
        ))}
      </div>
    )}
  </section>
);

const universityClubs = clubs.filter(c => c.category === "Academic" || c.category === "Technology");
const publicClubs = clubs.filter(c => c.category !== "Academic" && c.category !== "Technology");

const ClubCard = ({ club, onClick, joined }: { club: typeof clubs[0]; onClick: (id: number) => void; joined?: boolean }) => (
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
    {joined && <CheckCircle2 size={16} className="text-primary shrink-0" />}
  </button>
);

const SubBar = ({ options, active, onChange }: { options: { key: string; label: string }[]; active: string; onChange: (key: string) => void }) => (
  <div className="flex rounded-lg bg-muted/50 p-0.5 mb-4">
    {options.map(opt => (
      <button
        key={opt.key}
        onClick={() => onChange(opt.key)}
        className={`flex-1 text-[11px] font-semibold py-1.5 rounded-md transition-all ${
          active === opt.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

// Mock: campus notices from announcements
const campusNotices = announcements;
// Mock: club notices
const clubNotices: EventData[] = [
  {
    id: 101,
    title: "Robotics Club: New Lab Hours",
    organizer: "Robotics Club",
    organizerId: 1,
    date: "Effective May 12",
    location: "Robotics Lab",
    description: "Lab will be open on weekends from 10 AM to 6 PM for project work. Sign up on the club portal.",
    daysUntil: -1,
    participants: 0,
    category: "announcement",
    tag: "Notice",
  },
  {
    id: 102,
    title: "Art Society: Exhibition Submissions",
    organizer: "Art Society",
    organizerId: 3,
    date: "Due May 18",
    location: "Art Gallery",
    description: "Submit your artwork for the annual exhibition. Digital and physical submissions accepted.",
    daysUntil: -1,
    participants: 0,
    category: "announcement",
    tag: "Notice",
  },
];

const FeedPage = ({ onEventClick, onOrganizerClick }: FeedPageProps) => {
  const [topTab, setTopTab] = useState<"feed" | "calendar" | "notice">("feed");
  const [activeSegment, setActiveSegment] = useState<"campus" | "public" | "clubs">("campus");
  const [eventFilter, setEventFilter] = useState<"available" | "registered">("available");
  const [clubFilter, setClubFilter] = useState<"available" | "joined">("available");
  const [noticeSegment, setNoticeSegment] = useState<"campus" | "clubs">("campus");
  const [showCreateClub, setShowCreateClub] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const [newClubCategory, setNewClubCategory] = useState("");
  const [extraClubs, setExtraClubs] = useState<typeof clubs>([]);
  const [joinedClubIds, setJoinedClubIds] = useState<number[]>([1, 4]); // mock: joined Robotics + CSE
  const [registeredEventIds, setRegisteredEventIds] = useState<number[]>([1]); // mock: registered for AI Workshop

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
    setJoinedClubIds([...joinedClubIds, newClub.id]);
    setNewClubName("");
    setNewClubCategory("");
    setShowCreateClub(false);
    toast.success(`Club "${newClub.name}" created!`);
  };

  const allClubs = [...clubs, ...extraClubs];
  const allUniversityClubs = allClubs.filter(c => c.category === "Academic" || c.category === "Technology");
  const allPublicClubs = allClubs.filter(c => c.category !== "Academic" && c.category !== "Technology");

  // Filter events
  const allCampusEvents = yourCampusEvents.filter(e => e.category !== "announcement");
  const allPublicEvents = publicEvents.filter(e => e.category !== "announcement");
  const campusAvailable = allCampusEvents.filter(e => !registeredEventIds.includes(e.id));
  const campusRegistered = allCampusEvents.filter(e => registeredEventIds.includes(e.id));
  const publicAvailable = allPublicEvents.filter(e => !registeredEventIds.includes(e.id));
  const publicRegistered = allPublicEvents.filter(e => registeredEventIds.includes(e.id));

  // Filter clubs
  const filterClubs = (list: typeof clubs) => {
    if (clubFilter === "joined") return list.filter(c => joinedClubIds.includes(c.id));
    return list.filter(c => !joinedClubIds.includes(c.id));
  };

  return (
    <div className="pb-4">
      {/* Top toggle: Feed / Calendar / Notice */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setTopTab("feed")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
            topTab === "feed" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"
          }`}
        >
          <LayoutList size={14} /> Feed
        </button>
        <button
          onClick={() => setTopTab("calendar")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
            topTab === "calendar" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"
          }`}
        >
          <CalendarDays size={14} /> Calendar
        </button>
        <button
          onClick={() => setTopTab("notice")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
            topTab === "notice" ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground"
          }`}
        >
          <Megaphone size={14} /> Notice
        </button>
      </div>

      {/* CALENDAR */}
      {topTab === "calendar" && <PersonalCalendar />}

      {/* NOTICE */}
      {topTab === "notice" && (
        <>
          <div className="flex rounded-xl bg-muted/60 p-1 mb-5">
            {(["campus", "clubs"] as const).map((seg) => (
              <button
                key={seg}
                onClick={() => setNoticeSegment(seg)}
                className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${
                  noticeSegment === seg ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {seg === "campus" ? "Your Campus" : "Your Clubs"}
              </button>
            ))}
          </div>
          {noticeSegment === "campus" ? (
            <div className="flex flex-col gap-3">
              {campusNotices.length === 0 ? (
                <p className="text-xs text-muted-foreground py-6 text-center">No campus notices.</p>
              ) : campusNotices.map(n => (
                <div key={n.id} className="bg-card rounded-2xl border border-border p-4">
                  {n.tag && <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent mb-2">{n.tag}</span>}
                  <h3 className="font-semibold text-foreground text-sm mb-1">{n.title}</h3>
                  <p className="text-xs text-primary font-medium mb-1">{n.organizer}</p>
                  <p className="text-xs text-muted-foreground mb-1">{n.date} · {n.location}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {clubNotices.length === 0 ? (
                <p className="text-xs text-muted-foreground py-6 text-center">No club notices.</p>
              ) : clubNotices.map(n => (
                <div key={n.id} className="bg-card rounded-2xl border border-border p-4">
                  {n.tag && <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent mb-2">{n.tag}</span>}
                  <h3 className="font-semibold text-foreground text-sm mb-1">{n.title}</h3>
                  <p className="text-xs text-primary font-medium mb-1">{n.organizer}</p>
                  <p className="text-xs text-muted-foreground mb-1">{n.date} · {n.location}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.description}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* FEED */}
      {topTab === "feed" && (
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
            <>
              <SubBar
                options={[
                  { key: "available", label: "Available Events" },
                  { key: "registered", label: "Registered" },
                ]}
                active={eventFilter}
                onChange={(k) => setEventFilter(k as "available" | "registered")}
              />
              {eventFilter === "available" ? (
                <FeedSection title="Available Campus Events" events={campusAvailable} onCardClick={onEventClick} />
              ) : (
                <FeedSection title="Your Registered Events" events={campusRegistered} onCardClick={onEventClick} />
              )}
            </>
          ) : activeSegment === "public" ? (
            <>
              <SubBar
                options={[
                  { key: "available", label: "Available Events" },
                  { key: "registered", label: "Registered" },
                ]}
                active={eventFilter}
                onChange={(k) => setEventFilter(k as "available" | "registered")}
              />
              {eventFilter === "available" ? (
                <FeedSection title="Available Public Events" events={publicAvailable} onCardClick={onEventClick} />
              ) : (
                <FeedSection title="Your Registered Events" events={publicRegistered} onCardClick={onEventClick} />
              )}
            </>
          ) : (
            <div className="space-y-4">
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

              <SubBar
                options={[
                  { key: "available", label: "Available Clubs" },
                  { key: "joined", label: "Joined Clubs" },
                ]}
                active={clubFilter}
                onChange={(k) => setClubFilter(k as "available" | "joined")}
              />

              <section>
                <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">University Clubs</h2>
                <div className="flex flex-col gap-2">
                  {filterClubs(allUniversityClubs).length === 0 ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">
                      {clubFilter === "joined" ? "You haven't joined any university clubs yet." : "No available university clubs."}
                    </p>
                  ) : filterClubs(allUniversityClubs).map(club => (
                    <ClubCard key={club.id} club={club} onClick={handleClubClick} joined={joinedClubIds.includes(club.id)} />
                  ))}
                </div>
              </section>
              <section>
                <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">Public Clubs</h2>
                <div className="flex flex-col gap-2">
                  {filterClubs(allPublicClubs).length === 0 ? (
                    <p className="text-xs text-muted-foreground py-4 text-center">
                      {clubFilter === "joined" ? "You haven't joined any public clubs yet." : "No available public clubs."}
                    </p>
                  ) : filterClubs(allPublicClubs).map(club => (
                    <ClubCard key={club.id} club={club} onClick={handleClubClick} joined={joinedClubIds.includes(club.id)} />
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
