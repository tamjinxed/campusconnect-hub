import { useState } from "react";
import { ArrowLeft, BookOpen, ClipboardList, FileText, Calendar, Plus, Send, MessageCircle, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import type { Classroom } from "@/data/classroomData";

interface ClassroomDetailProps {
  classroom: Classroom;
  onBack: () => void;
}

interface Comment {
  author: string;
  text: string;
  time: string;
}

interface ClassPost {
  id: number;
  type: "announcement" | "assignment" | "material";
  title: string;
  description: string;
  date: string;
  dueDate?: string;
  attachments?: string[];
  comments: Comment[];
}

const iconMap = {
  announcement: <BookOpen size={14} className="text-primary" />,
  assignment: <ClipboardList size={14} className="text-accent" />,
  material: <FileText size={14} className="text-muted-foreground" />,
};

const labelMap = {
  announcement: "Announcement",
  assignment: "Assignment",
  material: "Material",
};

const ClassroomDetail = ({ classroom, onBack }: ClassroomDetailProps) => {
  const role = (localStorage.getItem("campusconnect-role") as "student" | "teacher") || "student";
  const [showForm, setShowForm] = useState(false);
  const [postType, setPostType] = useState<"announcement" | "assignment" | "material">("announcement");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  // Convert existing classroom posts to stateful posts with comments
  const [posts, setPosts] = useState<ClassPost[]>(
    classroom.posts.map(p => ({ ...p, comments: [] }))
  );

  const handleCreatePost = () => {
    if (!title.trim()) { toast.error("Enter a title"); return; }
    const newPost: ClassPost = {
      id: Date.now(),
      type: postType,
      title: title.trim(),
      description: description.trim(),
      date: "Just now",
      dueDate: postType === "assignment" && dueDate ? dueDate : undefined,
      attachments: fileName ? [fileName] : undefined,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setTitle(""); setDescription(""); setDueDate(""); setFileName("");
    setShowForm(false);
    toast.success(`${labelMap[postType]} posted!`);
  };

  const handleComment = (postId: number) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    setPosts(posts.map(p => p.id === postId ? {
      ...p,
      comments: [...p.comments, {
        author: role === "teacher" ? classroom.instructor : "Tamjid Khan",
        text,
        time: "Just now",
      }],
    } : p));
    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-lg">
        <button onClick={onBack} className="p-1 -ml-1 text-foreground hover:text-primary transition-colors">
          <ArrowLeft size={22} />
        </button>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0"
          style={{ backgroundColor: classroom.color }}
        >
          {classroom.code.split(" ")[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-foreground truncate">{classroom.code} — {classroom.name}</p>
          <p className="text-[11px] text-muted-foreground">{classroom.instructor}</p>
        </div>
        {role === "teacher" && (
          <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1 shrink-0" onClick={() => setShowForm(!showForm)}>
            <Plus size={14} /> Post
          </Button>
        )}
      </div>

      {/* Stream */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {/* Teacher post form */}
        {showForm && role === "teacher" && (
          <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
            <Select value={postType} onValueChange={(v) => setPostType(v as typeof postType)}>
              <SelectTrigger className="rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="announcement">📢 Announcement</SelectItem>
                <SelectItem value="assignment">📋 Assignment</SelectItem>
                <SelectItem value="material">📄 Material</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-xl" />
            <Textarea placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} className="rounded-xl resize-none min-h-[60px] text-sm" />
            {postType === "assignment" && (
              <Input placeholder="Due date (e.g. May 30)" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="rounded-xl" />
            )}
            <div className="flex items-center gap-2">
              <Input placeholder="Attachment name (e.g. notes.pdf)" value={fileName} onChange={(e) => setFileName(e.target.value)} className="rounded-xl flex-1 text-xs" />
              <Paperclip size={14} className="text-muted-foreground shrink-0" />
            </div>
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={() => setShowForm(false)} className="rounded-xl text-xs">Cancel</Button>
              <Button size="sm" onClick={handleCreatePost} className="rounded-xl text-xs gap-1.5"><Send size={12} /> Publish</Button>
            </div>
          </div>
        )}

        {/* Posts */}
        {posts.map((post) => (
          <div key={post.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              {iconMap[post.type]}
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">{labelMap[post.type]}</span>
              <span className="text-[11px] text-muted-foreground ml-auto">{post.date}</span>
            </div>
            <h3 className="font-semibold text-sm text-foreground mb-1">{post.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{post.description}</p>
            {post.dueDate && (
              <div className="flex items-center gap-1.5 mt-2 text-accent text-xs font-medium">
                <Calendar size={12} />
                <span>Due {post.dueDate}</span>
              </div>
            )}
            {post.attachments && (
              <div className="mt-2 flex gap-2">
                {post.attachments.map((a) => (
                  <span key={a} className="text-[11px] px-2 py-1 rounded-lg bg-muted text-muted-foreground flex items-center gap-1">
                    <FileText size={11} /> {a}
                  </span>
                ))}
              </div>
            )}

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="border-t border-border pt-2 mt-3 space-y-2">
                {post.comments.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 pl-1">
                    <Avatar className="h-5 w-5 mt-0.5">
                      <AvatarFallback className="text-[8px] font-bold bg-muted text-muted-foreground">
                        {c.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-[11px] font-semibold text-foreground">{c.author}</span>
                      <span className="text-[10px] text-muted-foreground ml-1.5">{c.time}</span>
                      <p className="text-xs text-foreground">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment input */}
            <div className="flex gap-2 mt-3">
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
        ))}
      </div>
    </div>
  );
};

export default ClassroomDetail;
