import { ArrowLeft, Mail, Building2, BookOpen, Users, CalendarDays, MapPin, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { EventData } from "./EventCard";

interface ProfilePageProps {
  onBack: () => void;
  onEventClick: (event: EventData) => void;
  registeredEvents: EventData[];
}

const mockProfile = {
  name: "Tamjid Khan",
  email: "tamjid@northsouth.edu",
  university: "North South University",
  department: "Computer Science & Engineering",
  section: "A",
  joinedDate: "January 2025",
};

const ProfilePage = ({ onBack, onEventClick, registeredEvents }: ProfilePageProps) => {
  return (
    <div className="pb-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      {/* Profile header */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-4">
        <div className="h-20 bg-gradient-to-br from-primary/25 via-accent/15 to-primary/5" />
        <div className="px-5 pb-5 -mt-8">
          <Avatar className="h-16 w-16 border-4 border-card shadow-lg mb-3">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">TK</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-foreground">{mockProfile.name}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{mockProfile.university}</p>
        </div>
      </div>

      {/* Info card */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-5 mb-4 space-y-3">
        <h2 className="text-sm font-bold text-foreground tracking-wide uppercase opacity-70">Academic Info</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-primary shrink-0" />
            <div>
              <p className="text-[11px] text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{mockProfile.email}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Building2 size={16} className="text-primary shrink-0" />
            <div>
              <p className="text-[11px] text-muted-foreground">University</p>
              <p className="text-sm font-medium text-foreground">{mockProfile.university}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <BookOpen size={16} className="text-primary shrink-0" />
            <div>
              <p className="text-[11px] text-muted-foreground">Department</p>
              <p className="text-sm font-medium text-foreground">{mockProfile.department}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Users size={16} className="text-primary shrink-0" />
            <div>
              <p className="text-[11px] text-muted-foreground">Section</p>
              <p className="text-sm font-medium text-foreground">Section {mockProfile.section}</p>
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
