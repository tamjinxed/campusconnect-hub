import { ArrowLeft, BookOpen, ClipboardList, FileText, Calendar } from "lucide-react";
import type { Classroom } from "@/data/classroomData";

interface ClassroomDetailProps {
  classroom: Classroom;
  onBack: () => void;
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

const ClassroomDetail = ({ classroom, onBack }: ClassroomDetailProps) => (
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
      <div className="min-w-0">
        <p className="font-semibold text-sm text-foreground truncate">{classroom.code} — {classroom.name}</p>
        <p className="text-[11px] text-muted-foreground">{classroom.instructor}</p>
      </div>
    </div>

    {/* Stream */}
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {classroom.posts.map((post) => (
        <div key={post.id} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            {iconMap[post.type]}
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
              {labelMap[post.type]}
            </span>
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
                  <FileText size={11} />
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ClassroomDetail;
