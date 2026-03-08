export interface ClassroomPost {
  id: number;
  type: "announcement" | "assignment" | "material";
  title: string;
  description: string;
  date: string;
  dueDate?: string;
  attachments?: string[];
}

export interface Classroom {
  id: number;
  name: string;
  code: string;
  instructor: string;
  color: string;
  posts: ClassroomPost[];
}

export const classrooms: Classroom[] = [
  {
    id: 1,
    name: "Data Structures",
    code: "CSE 101",
    instructor: "Dr. Ahmed Khan",
    color: "hsl(var(--primary))",
    posts: [
      { id: 1, type: "announcement", title: "Midterm Postponed", description: "Midterm exam has been moved to May 20. Prepare accordingly.", date: "May 8" },
      { id: 2, type: "assignment", title: "Assignment 3: Binary Trees", description: "Implement AVL tree insertion and deletion. Submit via portal.", date: "May 6", dueDate: "May 15" },
      { id: 3, type: "material", title: "Lecture 12 Slides", description: "Graph traversal algorithms — BFS and DFS.", date: "May 5", attachments: ["Lecture12.pdf"] },
    ],
  },
  {
    id: 2,
    name: "Linear Algebra",
    code: "MTH 201",
    instructor: "Prof. Sara Malik",
    color: "hsl(var(--accent))",
    posts: [
      { id: 4, type: "assignment", title: "Problem Set 5", description: "Eigenvalues and eigenvectors practice problems.", date: "May 7", dueDate: "May 14" },
      { id: 5, type: "announcement", title: "Office Hours Change", description: "Office hours moved to Thursday 2-4 PM this week.", date: "May 6" },
    ],
  },
  {
    id: 3,
    name: "Database Systems",
    code: "CSE 302",
    instructor: "Dr. Fahim Reza",
    color: "hsl(220 60% 55%)",
    posts: [
      { id: 6, type: "announcement", title: "Project Teams Finalized", description: "Check the portal for your team assignment.", date: "May 9" },
      { id: 7, type: "assignment", title: "Lab 4: SQL Joins", description: "Complete the SQL join exercises on the practice database.", date: "May 8", dueDate: "May 12" },
      { id: 8, type: "material", title: "Normalization Notes", description: "1NF through BCNF with examples.", date: "May 4", attachments: ["Normalization.pdf"] },
    ],
  },
  {
    id: 4,
    name: "Digital Logic Design",
    code: "EEE 201",
    instructor: "Prof. Nadia Hossain",
    color: "hsl(280 50% 55%)",
    posts: [
      { id: 9, type: "assignment", title: "Lab Report 6", description: "Flip-flops and sequential circuits lab report.", date: "May 7", dueDate: "May 13" },
    ],
  },
];
