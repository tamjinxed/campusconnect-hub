## Plan: Add Role Selection to Login Page

Add a role selector (Student / Teacher) to the Login page so users can choose how they log in, mirroring the role selection already present in Signup.

### Changes to `src/pages/Login.tsx`

1. **Add role state**: `const [role, setRole] = useState<"student" | "teacher">("student");`

2. **Add a role selector UI** above the email field — two side-by-side selectable cards (matching the Signup page styling):
   - **Student** card with `GraduationCap` icon (primary color)
   - **Teacher** card with `BookOpenCheck` icon (accent color)
   - Selected card gets a highlighted border (`border-primary bg-primary/5`); unselected stays neutral.
   - Clicking a card updates `role`.

3. **Update `handleLogin`** to persist the chosen role:
   - Replace the existing default-role fallback with: `localStorage.setItem("campusconnect-role", role);`
   - This ensures the app loads the correct role-specific UI (teacher vs student feed/chat/classroom views) after login.

4. **Keep existing layout**: logo, title, email, password, submit button, and "Sign Up" link remain unchanged. The role selector slots in between the header and the form.

### Visual layout

```text
   [ CC logo ]
  CampusConnect
 Your unified campus platform

 ┌──────────────┬──────────────┐
 │ 🎓 Student   │ 📘 Teacher   │   <- selectable cards
 └──────────────┴──────────────┘

 Email    [______________]
 Password [______________]
 [       Log In          ]

 Don't have an account? Sign Up
```

### Notes

- No other files need changes. `ChatPage`, `FeedPage`, `ClassroomList`, etc. already read `localStorage.getItem("campusconnect-role")` to branch behavior, so storing the selected role on login is sufficient.
- Demo-only auth flow (no backend) — consistent with the current localStorage-based session.