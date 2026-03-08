import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { GraduationCap, BookOpenCheck } from "lucide-react";

const departments = ["Computer Science", "Electrical Engineering", "Business", "Mathematics", "Physics", "English", "Biology"];
const sections = ["A", "B", "C", "D"];

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", university: "", department: "", section: "" });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, university, department } = form;
    if (!name || !email || !password || !university || !department) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (role === "student" && !form.section) {
      toast.error("Please select your section.");
      return;
    }
    // Store role and profile in localStorage for demo
    localStorage.setItem("campusconnect-role", role!);
    localStorage.setItem("campusconnect-profile", JSON.stringify({ ...form, role }));
    localStorage.setItem("campusconnect-logged-in", "true");
    toast.success("Account created! Welcome to CampusConnect.");
    navigate("/");
  };

  // Role selection screen
  if (!role) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-2xl">CC</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Join CampusConnect</h1>
            <p className="text-muted-foreground text-sm text-center">Select your role to get started</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setRole("student")}
              className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GraduationCap size={24} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-foreground">Student</p>
                <p className="text-xs text-muted-foreground">Join classrooms, chat with peers, explore events</p>
              </div>
            </button>

            <button
              onClick={() => setRole("teacher")}
              className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <BookOpenCheck size={24} className="text-accent" />
              </div>
              <div className="text-left">
                <p className="font-bold text-foreground">Teacher</p>
                <p className="text-xs text-muted-foreground">Create classrooms, manage courses, share resources</p>
              </div>
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} className="text-primary font-semibold hover:underline">
              Log In
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-xl">CC</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">
            Sign up as {role === "student" ? "Student" : "Teacher"}
          </h1>
          <button onClick={() => setRole(null)} className="text-xs text-primary hover:underline">
            Change role
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Tamjid Khan" value={form.name} onChange={(e) => update("name", e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@university.edu" value={form.email} onChange={(e) => update("email", e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} className="rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="university">University</Label>
            <Input id="university" placeholder="e.g. North South University" value={form.university} onChange={(e) => update("university", e.target.value)} className="rounded-xl" />
          </div>
          <div className={role === "student" ? "grid grid-cols-2 gap-3" : ""}>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Select onValueChange={(v) => update("department", v)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {role === "student" && (
              <div className="space-y-1.5">
                <Label>Section</Label>
                <Select onValueChange={(v) => update("section", v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((s) => (
                      <SelectItem key={s} value={s}>Section {s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <Button type="submit" className="w-full rounded-xl h-11 font-semibold mt-2">
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-primary font-semibold hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
