import { ArrowLeft, Users, Calendar, MapPin, Plus, Send, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getClubById, getClubEvents } from "@/data/mockData";
import type { EventData } from "./EventCard";
import EventCard from "./EventCard";
import { useState } from "react";
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
  timestamp: string;
}

const ClubPage = ({ clubId, onBack, onEventClick }: ClubPageProps) => {
  const club = getClubById(clubId);
  const events = getClubEvents(clubId);
  const [joined, setJoined] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState<ClubPost[]>([
    { id: 1, author: "Dr. Rahman", role: "teacher", content: "Welcome to the club! Our next meeting is on Thursday at 3 PM. Don't forget to bring your project proposals.", timestamp: "2h ago" },
    { id: 2, author: "Tamjid Khan", role: "student", content: "Excited for the upcoming hackathon! Anyone looking for team members?", timestamp: "5h ago" },
  ]);

  const role = (localStorage.getItem("campusconnect-role") as "student" | "teacher") || "student";

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

  const handleJoin = () => {
    setJoined(true);
    toast.success(`Joined ${club.name}!`);
  };

  const handlePost = () => {
    if (!postContent.trim()) return;
    const newPost: ClubPost = {
      id: Date.now(),
      author: role === "teacher" ? "Dr. Rahman" : "Tamjid Khan",
      role,
      content: postContent.trim(),
      timestamp: "Just now",
    };
    setPosts([newPost, ...posts]);
    setPostContent("");
    setShowPostForm(false);
    toast.success("Post published!");
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
          <span className="inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent mt-1">
            {club.category}
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">{club.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users size={15} className="text-primary" />
              <span className="font-semibold text-foreground">{joined ? club.memberCount + 1 : club.memberCount}</span>
              <span>members</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={15} className="text-primary" />
              <span className="font-semibold text-foreground">{events.length}</span>
              <span>events</span>
            </div>
          </div>

          <Button
            onClick={handleJoin}
            disabled={joined}
            className={`w-full rounded-xl h-10 font-semibold mt-4 ${joined ? "bg-muted text-muted-foreground" : ""}`}
          >
            {joined ? "Joined ✓" : "Join Club"}
          </Button>
        </div>
      </div>

      {/* Post section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-foreground tracking-wide uppercase opacity-70">Posts</h2>
          <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1.5" onClick={() => setShowPostForm(!showPostForm)}>
            <Plus size={14} /> New Post
          </Button>
        </div>

        {showPostForm && (
          <div className="bg-card border border-border rounded-2xl p-4 mb-3 space-y-3">
            <Textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Share something with the club..."
              className="rounded-xl resize-none min-h-[80px] text-sm"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setShowPostForm(false)} className="rounded-xl text-xs">
                Cancel
              </Button>
              <Button size="sm" onClick={handlePost} className="rounded-xl text-xs gap-1.5">
                <Send size={12} /> Post
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-card border border-border rounded-2xl p-4">
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
              <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
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
