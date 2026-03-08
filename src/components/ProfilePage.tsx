import { useState } from "react";
import { ArrowLeft, Mail, Building2, BookOpen, Users, CalendarDays, MapPin, LogOut, Pencil, Check, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { EventData } from "./EventCard";

interface ProfilePageProps {
  onBack: () => void;
  onEventClick: (event: EventData) => void;
  registeredEvents: EventData[];
}

const initialProfile = {
  name: "Tamjid Khan",
  email: "tamjid@northsouth.edu",
  university: "North South University",
  department: "Computer Science & Engineering",
  section: "A",
  joinedDate: "January 2025",
};

const ProfilePage = ({ onBack, onEventClick, registeredEvents }: ProfilePageProps) => {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(initialProfile);

  const startEditing = () => {
    setDraft(profile);
    setEditing(true);
  };

  const saveEdits = () => {
    setProfile(draft);
    setEditing(false);
    toast.success("Profile updated!");
  };

  const cancelEdits = () => {
    setDraft(profile);
    setEditing(false);
  };

  const initials = profile.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="pb-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      {/* University banner */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-4">
        <div className="h-24 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 relative flex items-end px-5 pb-0">
          <div className="absolute top-3 left-0 right-0 text-center">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary/70">{profile.university}</span>
          </div>
        </div>
        <div className="px-5 pb-5 -mt-8">
          <Avatar className="h-16 w-16 border-4 border-card shadow-lg mb-3">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">{profile.name}</h1>
              <p className="text-sm text-muted-foreground mt-0.5">{profile.department}</p>
            </div>
            {!editing && (
              <Button size="sm" variant="outline" className="rounded-xl text-xs h-8" onClick={startEditing}>
                <Pencil size={13} className="mr-1" /> Edit
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-5 mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground tracking-wide uppercase opacity-70">Academic Info</h2>
          {editing && (
            <div className="flex gap-1.5">
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-destructive" onClick={cancelEdits}>
                <X size={13} className="mr-0.5" /> Cancel
              </Button>
              <Button size="sm" className="h-7 px-3 text-xs rounded-lg" onClick={saveEdits}>
                <Check size={13} className="mr-0.5" /> Save
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-3">
          {/* Name */}
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground">Name</p>
              {editing ? (
                <Input value={draft.name} onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} className="h-8 text-sm mt-0.5" />
              ) : (
                <p className="text-sm font-medium text-foreground">{profile.name}</p>
              )}
            </div>
          </div>
          <Separator />
          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-primary shrink-0" />
            <div>
              <p className="text-[11px] text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{profile.email}</p>
            </div>
          </div>
          <Separator />
          {/* University */}
          <div className="flex items-center gap-3">
            <Building2 size={16} className="text-primary shrink-0" />
            <div>
              <p className="text-[11px] text-muted-foreground">University</p>
              <p className="text-sm font-medium text-foreground">{profile.university}</p>
            </div>
          </div>
          <Separator />
          {/* Department */}
          <div className="flex items-center gap-3">
            <BookOpen size={16} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground">Department</p>
              {editing ? (
                <Input value={draft.department} onChange={e => setDraft(d => ({ ...d, department: e.target.value }))} className="h-8 text-sm mt-0.5" />
              ) : (
                <p className="text-sm font-medium text-foreground">{profile.department}</p>
              )}
            </div>
          </div>
          <Separator />
          {/* Section */}
          <div className="flex items-center gap-3">
            <Users size={16} className="text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-[11px] text-muted-foreground">Section</p>
              {editing ? (
                <Input value={draft.section} onChange={e => setDraft(d => ({ ...d, section: e.target.value }))} className="h-8 text-sm mt-0.5" />
              ) : (
                <p className="text-sm font-medium text-foreground">Section {profile.section}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registered events */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-5 mb-4">
        <h2 className="text-sm font-bold text-foreground tracking-wide uppercase opacity-70 mb-3">
          Registered Events ({registeredEvents.length})
        </h2>
        {registeredEvents.length > 0 ? (
          <div className="space-y-2">
            {registeredEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => onEventClick(event)}
                className="w-full flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
              >
                <CalendarDays size={16} className="text-primary mt-0.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">{event.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{event.date}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={10} /> {event.location}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">You haven't registered for any events yet.</p>
        )}
      </div>

      {/* Logout button */}
      <Button variant="outline" className="w-full rounded-xl h-10 text-destructive border-destructive/20 hover:bg-destructive/5">
        <LogOut size={16} className="mr-2" />
        Log Out
      </Button>
    </div>
  );
};

export default ProfilePage;
