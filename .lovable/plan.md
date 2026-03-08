

## Plan: Chat Tabs (Classroom + Normal) and Personal Calendar for Events

### 1. Chat Page — Two Sub-tabs

Redesign the Chat tab to have two sub-tabs at the top using Radix Tabs:

- **Classroom** — Google Classroom-style feed with class announcements, assignments, and materials. Each "classroom" card shows course name, instructor, latest post preview, and due dates. Clicking opens a classroom detail view with a stream of posts (announcements, assignments with due dates, attached materials).

- **Chat** — The existing group chat list (current ChatList + ChatInterface), unchanged.

**New files:**
- `src/components/ClassroomList.tsx` — List of enrolled classes (mock data: "CSE 101 - Data Structures", "MTH 201 - Linear Algebra", etc.) with instructor name, latest announcement preview
- `src/components/ClassroomDetail.tsx` — Stream view showing announcements/assignments posted by instructor, with due dates and description
- `src/data/classroomData.ts` — Mock classroom and post data

**Modified files:**
- `src/components/ChatPage.tsx` — Add Tabs component with "Classroom" and "Chat" triggers; render ClassroomList or ChatList based on active tab

### 2. Events Page — Personal Calendar

Add a personal calendar view to the Feed page showing when the user is busy/free:

- Add a calendar section (using the existing Shadcn Calendar component) at the top or as a toggleable view on the Feed page
- Dates with registered events are highlighted/marked on the calendar
- Dates marked as "busy" by the user are shown in a different color
- Tapping a date shows events for that day and busy status
- Users can toggle a day as "busy" via a simple button

**New files:**
- `src/components/PersonalCalendar.tsx` — Calendar with event dots and busy-day markers, day detail panel below
- `src/hooks/useBusyDays.ts` — State hook managing busy days (localStorage persisted)

**Modified files:**
- `src/components/FeedPage.tsx` — Add a "Calendar" toggle/view above the feed sections, showing PersonalCalendar when active
- `src/data/mockData.ts` — Add date objects to events for calendar mapping

### 3. Data Additions

Add to `mockData.ts` or new file:
- Mock classrooms with posts/assignments
- Convert event dates to actual `Date` objects for calendar integration

### Summary of UI Flow

- **Chat tab**: Top tabs → "Classroom" | "Chat"
  - Classroom: list of courses → tap to see stream of posts
  - Chat: existing group chat list → tap to open chat
- **Feed tab**: Toggle between card feed and calendar view
  - Calendar shows event dates (dots) and busy days (highlighted)
  - Tap date to see that day's events + mark busy

