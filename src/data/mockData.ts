import type { EventData } from "@/components/EventCard";

export interface ClubData {
  id: number;
  name: string;
  shortName: string;
  description: string;
  memberCount: number;
  category: string;
  events: number[];
}

export const clubs: ClubData[] = [
  { id: 1, name: "Robotics Club", shortName: "RC", description: "Building the future with robotics and AI. Weekly workshops, competitions, and hands-on projects.", memberCount: 128, category: "Technology", events: [1] },
  { id: 2, name: "Entrepreneurship Cell", shortName: "EC", description: "Fostering startup culture on campus. Pitch nights, mentorship, and networking events.", memberCount: 95, category: "Business", events: [2] },
  { id: 3, name: "Art Society", shortName: "AS", description: "Creative expression through photography, painting, and digital art.", memberCount: 72, category: "Arts", events: [3] },
  { id: 4, name: "CSE Department", shortName: "CS", description: "Official Computer Science & Engineering department. Academic events, hackathons, and seminars.", memberCount: 340, category: "Academic", events: [4] },
  { id: 5, name: "Placement Cell", shortName: "PC", description: "Connecting students with top employers. Career fairs, resume workshops, and interview prep.", memberCount: 500, category: "Career", events: [5] },
  { id: 6, name: "Student Union", shortName: "SU", description: "The voice of students. Organizing festivals, cultural programs, and campus improvements.", memberCount: 1200, category: "Campus", events: [6] },
];

export const yourCampusEvents: EventData[] = [
  {
    id: 1,
    title: "AI Workshop",
    organizer: "Robotics Club",
    organizerId: 1,
    date: "May 12",
    time: "2:00 PM - 5:00 PM",
    location: "Auditorium",
    description: "Intro to machine learning basics. Hands-on session with Python and TensorFlow for beginners. Learn how neural networks work and build your first model.",
    daysUntil: 2,
    tag: "Workshop",
    participants: 42,
    category: "technology",
  },
  {
    id: 4,
    title: "Hackathon 2025",
    organizer: "CSE Department",
    organizerId: 4,
    date: "May 20",
    time: "9:00 AM - 9:00 AM (48h)",
    location: "Tech Lab",
    description: "48-hour coding marathon. Build something amazing with your team. Prizes worth $5000. Teams of 2-4 members. All skill levels welcome.",
    daysUntil: 10,
    tag: "Hackathon",
    participants: 156,
    category: "technology",
  },
  {
    id: 7,
    title: "Library Hours Extended",
    organizer: "University Admin",
    date: "Effective May 10",
    location: "Central Library",
    description: "Library will remain open until midnight during exam season. Study rooms can be booked online.",
    daysUntil: -1,
    tag: "Notice",
    participants: 0,
    category: "announcement",
  },
];

export const publicEvents: EventData[] = [
  {
    id: 2,
    title: "Startup Pitch Night",
    organizer: "Entrepreneurship Cell",
    organizerId: 2,
    date: "May 14",
    time: "6:00 PM - 9:00 PM",
    location: "Business Hall",
    description: "Present your startup ideas to a panel of investors and mentors. Top 3 pitches win seed funding and incubation support.",
    daysUntil: 4,
    tag: "Competition",
    participants: 78,
    category: "business",
  },
  {
    id: 3,
    title: "Photography Walk",
    organizer: "Art Society",
    organizerId: 3,
    date: "May 15",
    time: "7:00 AM - 10:00 AM",
    location: "Campus Garden",
    description: "Explore campus through the lens. Bring your camera or phone. Professional photographers will guide beginners.",
    daysUntil: 5,
    tag: "Social",
    participants: 35,
    category: "arts",
  },
  {
    id: 5,
    title: "Career Fair",
    organizer: "Placement Cell",
    organizerId: 5,
    date: "May 22",
    time: "10:00 AM - 4:00 PM",
    location: "Main Hall",
    description: "Meet top recruiters from leading tech companies. Bring your resume and dress professionally. 50+ companies attending.",
    daysUntil: 12,
    participants: 420,
    category: "career",
  },
  {
    id: 6,
    title: "Cultural Fest",
    organizer: "Student Union",
    organizerId: 6,
    date: "May 25",
    time: "11:00 AM - 10:00 PM",
    location: "Open Ground",
    description: "Music, dance, food stalls and more. The biggest event of the semester. Live performances by campus bands and guest artists.",
    daysUntil: 15,
    tag: "Festival",
    participants: 890,
    category: "social",
  },
  {
    id: 8,
    title: "New Bus Route Added",
    organizer: "Transport Office",
    date: "Starting May 15",
    location: "Campus Gate",
    description: "New shuttle service connecting east campus to downtown. Runs every 30 minutes from 7 AM to 10 PM.",
    daysUntil: -1,
    participants: 0,
    category: "announcement",
  },
];

export const allEvents: EventData[] = [...yourCampusEvents, ...publicEvents];

export function getEventById(id: number): EventData | undefined {
  return allEvents.find((e) => e.id === id);
}

export function getClubById(id: number): ClubData | undefined {
  return clubs.find((c) => c.id === id);
}

export function getClubEvents(clubId: number): EventData[] {
  const club = getClubById(clubId);
  if (!club) return [];
  return club.events.map((eid) => getEventById(eid)).filter(Boolean) as EventData[];
}

export const recommendedEvents = yourCampusEvents;
export const upcomingEvents = publicEvents;
export const announcements = allEvents.filter((e) => e.category === "announcement");

export interface ChatGroup {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
  avatar: string;
}

export const chatGroups: ChatGroup[] = [
  { id: 1, name: "CSE 1A Section", lastMessage: "Assignment deadline?", timestamp: "2m ago", unread: 3, avatar: "1A" },
  { id: 2, name: "Programming Club", lastMessage: "Check out this repo!", timestamp: "15m ago", unread: 1, avatar: "PC" },
  { id: 3, name: "Hackathon Team", lastMessage: "Meeting at 5 PM", timestamp: "1h ago", avatar: "HT" },
  { id: 4, name: "Robotics Club", lastMessage: "Workshop materials uploaded", timestamp: "3h ago", avatar: "RC" },
  { id: 5, name: "Study Group", lastMessage: "Anyone free for revision?", timestamp: "5h ago", avatar: "SG" },
];

export interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
}

export const mockMessages: ChatMessage[] = [
  { id: 1, sender: "Tamjid", text: "Assignment deadline?", time: "10:30 AM", isOwn: false },
  { id: 2, sender: "You", text: "Tomorrow 11:59 PM", time: "10:31 AM", isOwn: true },
  { id: 3, sender: "Rahim", text: "Can we get an extension?", time: "10:33 AM", isOwn: false },
  { id: 4, sender: "You", text: "Probably not, prof was strict about it", time: "10:34 AM", isOwn: true },
  { id: 5, sender: "Tamjid", text: "Let's finish it tonight then 💪", time: "10:35 AM", isOwn: false },
  { id: 6, sender: "Rahim", text: "I'm in. Library at 8?", time: "10:36 AM", isOwn: false },
  { id: 7, sender: "You", text: "Sounds good, see you there!", time: "10:37 AM", isOwn: true },
];
