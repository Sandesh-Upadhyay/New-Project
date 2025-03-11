
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  isPinned?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Sales Manager",
    email: "alex@example.com",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Account Executive",
    email: "sarah@example.com",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Customer Success",
    email: "michael@example.com",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Marketing Specialist",
    email: "emily@example.com",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "5",
    name: "James Wilson",
    role: "Sales Representative",
    email: "james@example.com",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "6",
    name: "Olivia Parker",
    role: "Account Manager",
    email: "olivia@example.com",
    avatar: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: "7",
    name: "David Lee",
    role: "Support Specialist",
    email: "david@example.com",
    avatar: "https://i.pravatar.cc/150?img=7"
  },
  {
    id: "8",
    name: "Sophia Martinez",
    role: "Sales Manager",
    email: "sophia@example.com",
    avatar: "https://i.pravatar.cc/150?img=8"
  }
];
