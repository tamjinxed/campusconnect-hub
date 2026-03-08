import { useState } from "react";
import { ArrowLeft, Users, Calendar, Plus, Send, CalendarPlus, MessageCircle, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getClubById, getClubEvents } from "@/data/mockData";
import type { EventData } from "./EventCard";
import EventCard from "./EventCard";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ClubPageProps {
  clubId: number;
  onBack: () => void;
  onEventClick: (event: EventData) => void;
}

interface ClubPost {
  id: number;
  author: string;
  role: "student" | "teacher";
  content: string;
  imageUrl?: string;
  timestamp: string;
  pending?: boolean;
  comments: { author: string; text: string; time: string }[];
}

const ClubPage = ({ clubId, onBack, onEventClick }: ClubPageProps) => {
  const club = getClubById(clubId);
  const events = getClubEvents(clubId);
  const [joined, setJoined] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventCover, setEventCover] = useState("");
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  const role = (localStorage.getItem("campusconnect-role") as "student" | "teacher") || "student";

  const [posts, setPosts] = useState<ClubPost[]>([
    { id: 1, author: "Dr. Rahman", role: "teacher", content: "Welcome to the club! Our next meeting is on Thursday at 3 PM. Don't forget to bring your project proposals.", timestamp: "2h ago", comments: [
      { author: "Tamjid Khan", text: "Will be there!", time: "1h ago" },
    ]},
    { id: 2, author: "Tamjid Khan", role: "student", content: "Excited for the upcoming hackathon! Anyone looking for team members?", imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop", timestamp: "5h ago", comments: [] },
  ]);

  if (!club) {
    return (
      <div className="pb-6">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <p className="text-muted-foreground text-sm">Club not found.</p>
      </div>
    );
  }

  const handleJoin = () => { setJoined(true); toast.success(`Joined ${club.name}!`); };

  const handlePost = () => {
    if (!postContent.trim()) return;
    const isStudent = role === "student";
    const newPost: ClubPost = {
      id: Date.now(),
      author: isStudent ? "Tamjid Khan" : "Dr. Rahman",
      role,
      content: postContent.trim(),
      imageUrl: postImageUrl.trim() || undefined,
      timestamp: "Just now",
      pending: isStudent,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setPostContent("");
    setPostImageUrl("");
    setShowPostForm(false);
    toast.success(isStudent ? "Post submitted for approval!" : "Post published!");
  };

  const handleCreateEvent = () => {
    if (!eventTitle.trim() || !eventDate.trim()) {
      toast.error("Fill in event title and date");
      return;
    }
    const isStudent = role === "student";
    toast.success(isStudent ? `Event "${eventTitle}" submitted for approval!` : `Event "${eventTitle}" created!`);
    setEventTitle(""); setEventDate(""); setEventTime(""); setEventLocation(""); setEventDesc(""); setEventCover("");
    setShowEventForm(false);
  };

  const handleApprove = (postId: number) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, pending: false } : p));
    toast.success("Post approved!");
  };

  const handleComment = (postId: number) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    setPosts(posts.map(p => p.id === postId ? {
      ...p,
      comments: [...p.comments, { author: role === "teacher" ? "Dr. Rahman" : "Tamjid Khan", text, time: "Just now" }],
    } : p));
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  return (
    <div className="pb-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      {/* Club header */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-4">
        <div className="h-20 bg-gradient-to-br from-primary/25 via-accent/15 to-primary/5" />
        <div className="p-5 -mt-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg mb-3">
            {club.shortName}
          </div>
          <h1 className="text-xl font-bold text-foreground">{club.name}</h1>
          <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent mt-1">{club.category}</span>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">{club.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users size={15} className="text-primary" />
              <span className="font-semibold text-foreground">{joined ? club.memberCount + 1 : club.memberCount}</span> members
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={15} className="text-primary" />
              <span className="font-semibold text-foreground">{events.length}</span> events
            </div>
          </div>
          <Button onClick={handleJoin} disabled={joined} className={`w-full rounded-xl h-10 font-semibold mt-4 ${joined ? "bg-muted text-muted-foreground" : ""}`}>
            {joined ? "Joined ✓" : "Join Club"}
          </Button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={showPostForm ? "default" : "outline"}
          className="flex-1 rounded-xl text-xs gap-1.5"
          onClick={() => { setShowPostForm(!showPostForm); setShowEventForm(false); }}
        >
          <Plus size={14} /> Add Post
        </Button>
        <Button
          variant={showEventForm ? "default" : "outline"}
          className="flex-1 rounded-xl text-xs gap-1.5"
          onClick={() => { setShowEventForm(!showEventForm); setShowPostForm(false); }}
        >
          <CalendarPlus size={14} /> Add Event
        </Button>
      </div>

      {/* Post form */}
      {showPostForm && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-3">
          <Textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Share something with the club..." className="rounded-xl resize-none min-h-[80px] text-sm" />
          <div className="flex items-center gap-2">
            <Image size={14} className="text-muted-foreground shrink-0" />
            <Input value={postImageUrl} onChange={(e) => setPostImageUrl(e.target.value)} placeholder="Image URL (optional)" className="rounded-xl text-xs" />
          </div>
          {postImageUrl && (
            <div className="rounded-xl overflow-hidden border border-border h-32">
              <img src={postImageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
            </div>
          )}
          {role === "student" && (
            <p className="text-[11px] text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">⏳ Student posts require teacher approval before publishing</p>
          )}
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => setShowPostForm(false)} className="rounded-xl text-xs">Cancel</Button>
            <Button size="sm" onClick={handlePost} className="rounded-xl text-xs gap-1.5"><Send size={12} /> {role === "student" ? "Submit" : "Post"}</Button>
          </div>
        </div>
      )}

      {/* Event form with cover image */}
      {showEventForm && (
        <div className="bg-card border border-border rounded-2xl p-4 mb-4 space-y-3">
          <Input placeholder="Event title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="rounded-xl" />
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Date (e.g. May 25)" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="rounded-xl" />
            <Input placeholder="Time (e.g. 3:00 PM)" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="rounded-xl" />
          </div>
          <Input placeholder="Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className="rounded-xl" />
          <Textarea placeholder="Description..." value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} className="rounded-xl resize-none min-h-[60px] text-sm" />
          <div className="flex items-center gap-2">
            <Image size={14} className="text-muted-foreground shrink-0" />
            <Input value={eventCover} onChange={(e) => setEventCover(e.target.value)} placeholder="Cover image URL (optional)" className="rounded-xl text-xs" />
          </div>
          {eventCover && (
            <div className="rounded-xl overflow-hidden border border-border h-32">
              <img src={eventCover} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
            </div>
          )}
          {role === "student" && (
            <p className="text-[11px] text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">⏳ Student events require teacher approval</p>
          )}
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => setShowEventForm(false)} className="rounded-xl text-xs">Cancel</Button>
            <Button size="sm" onClick={handleCreateEvent} className="rounded-xl text-xs gap-1.5"><CalendarPlus size={12} /> {role === "student" ? "Submit Event" : "Create Event"}</Button>
          </div>
        </div>
      )}

      {/* Posts feed */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-foreground tracking-wide uppercase opacity-70 mb-3">Posts</h2>
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className={`bg-card border rounded-2xl overflow-hidden ${post.pending ? "border-yellow-500/30 bg-yellow-500/5" : "border-border"}`}>
              {post.imageUrl && (
                <div className="w-full h-40">
                  <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                {post.pending && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-yellow-600 bg-yellow-500/10 px-2 py-0.5 rounded-full">⏳ Pending Approval</span>
                    {role === "teacher" && (
                      <Button size="sm" variant="outline" className="h-6 text-[10px] rounded-lg border-green-500/30 text-green-600 hover:bg-green-500/10" onClick={() => handleApprove(post.id)}>
                        ✓ Approve
                      </Button>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2.5 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`text-xs font-bold ${post.role === "teacher" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"}`}>
                      {post.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{post.author}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {post.role === "teacher" && <span className="text-accent font-semibold mr-1">Teacher</span>}
                      {post.timestamp}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">{post.content}</p>

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="border-t border-border pt-2 mt-2 space-y-2">
                    {post.comments.map((c, i) => (
                      <div key={i} className="flex items-start gap-2 pl-2">
                        <MessageCircle size={11} className="text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-foreground">{c.author}</span>
                          <span className="text-[10px] text-muted-foreground ml-1.5">{c.time}</span>
                          <p className="text-xs text-foreground">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment input */}
                <div className="flex gap-2 mt-2">
                  <Input
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && handleComment(post.id)}
                    placeholder="Add a comment..."
                    className="rounded-xl text-xs h-8"
                  />
                  <Button size="sm" variant="ghost" className="h-8 px-2 shrink-0" onClick={() => handleComment(post.id)}>
                    <Send size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Club events */}
      {events.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase opacity-70">Events by {club.name}</h2>
          <div className="flex flex-col gap-3">
            {events.map((e) => (
              <EventCard key={e.id} event={e} onCardClick={onEventClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubPage;
