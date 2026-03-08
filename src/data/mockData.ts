import type { EventData } from "@/components/EventCard";

export const recommendedEvents: EventData[] = [
  {
    id: 1,
    title: "AI Workshop",
    organizer: "Robotics Club",
    date: "May 12",
    location: "Auditorium",
    description: "Intro to machine learning basics. Hands-on session with Python and TensorFlow for beginners.",
    daysUntil: 2,
    tag: "Workshop",
  },
  {
    id: 2,
    title: "Startup Pitch Night",
    organizer: "Entrepreneurship Cell",
    date: "May 14",
    location: "Business Hall",
    description: "Present your startup ideas to a panel of investors and mentors.",
    daysUntil: 4,
    tag: "Competition",
  },
  {
    id: 3,
    title: "Photography Walk",
    organizer: "Art Society",
    date: "May 15",
    location: "Campus Garden",
    description: "Explore campus through the lens. Bring your camera or phone.",
    daysUntil: 5,
    tag: "Social",
  },
];

export const upcomingEvents: EventData[] = [
  {
    id: 4,
    title: "Hackathon 2025",
    organizer: "CSE Department",
    date: "May 20",
    location: "Tech Lab",
    description: "48-hour coding marathon. Build something amazing with your team.",
    daysUntil: 10,
    tag: "Hackathon",
  },
  {
    id: 5,
    title: "Career Fair",
    organizer: "Placement Cell",
    date: "May 22",
    location: "Main Hall",
    description: "Meet top recruiters from leading tech companies.",
    daysUntil: 12,
  },
  {
    id: 6,
    title: "Cultural Fest",
    organizer: "Student Union",
    date: "May 25",
    location: "Open Ground",
    description: "Music, dance, food stalls and more. The biggest event of the semester.",
    daysUntil: 15,
    tag: "Festival",
  },
];

export const announcements: EventData[] = [
  {
    id: 7,
    title: "Library Hours Extended",
    organizer: "University Admin",
    date: "Effective May 10",
    location: "Central Library",
    description: "Library will remain open until midnight during exam season.",
    daysUntil: -1,
    tag: "Notice",
  },
  {
    id: 8,
    title: "New Bus Route Added",
    organizer: "Transport Office",
    date: "Starting May 15",
    location: "Campus Gate",
    description: "New shuttle service connecting east campus to downtown.",
    daysUntil: -1,
  },
];

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
