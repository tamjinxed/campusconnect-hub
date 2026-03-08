import { BookOpen, FileText, ClipboardList } from "lucide-react";
import { classrooms, type Classroom } from "@/data/classroomData";

interface ClassroomListProps {
  onSelect: (classroom: Classroom) => void;
}

const ClassroomList = ({ onSelect }: ClassroomListProps) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-base font-bold text-foreground px-1">Your Classes</h2>
    {classrooms.map((cls) => {
      const latestPost = cls.posts[0];
      const assignmentCount = cls.posts.filter((p) => p.type === "assignment").length;
      return (
        <button
          key={cls.id}
          onClick={() => onSelect(cls)}
          className="bg-card rounded-2xl border border-border p-4 text-left hover:shadow-md transition-all active:scale-[0.98]"
        >
          <div className="flex items-start gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-primary-foreground font-bold text-sm"
              style={{ backgroundColor: cls.color }}
            >
              {cls.code.split(" ")[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">
                {cls.code} — {cls.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{cls.instructor}</p>
              {latestPost && (
                <p className="text-xs text-muted-foreground mt-1.5 truncate flex items-center gap-1">
                  {latestPost.type === "assignment" ? (
                    <ClipboardList size={12} className="shrink-0 text-accent" />
                  ) : latestPost.type === "material" ? (
                    <FileText size={12} className="shrink-0 text-accent" />
                  ) : (
                    <BookOpen size={12} className="shrink-0 text-accent" />
                  )}
                  {latestPost.title}
                </p>
              )}
            </div>
            {assignmentCount > 0 && (
              <span className="shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent">
                {assignmentCount} due
              </span>
            )}
          </div>
        </button>
      );
    })}
  </div>
);

export default ClassroomList;
