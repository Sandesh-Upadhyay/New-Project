
import { useState, useEffect, useMemo } from "react";
import { Search, Grid2x2, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TeamMemberCard from "@/components/TeamMemberCard";
import { TeamMember, teamMembers as initialTeamMembers } from "@/data/teamMembers";
import { useToast } from "@/hooks/use-toast";

const TeamScreen = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { toast } = useToast();

  // Load team members from localStorage on initial render
  useEffect(() => {
    const savedTeamMembers = localStorage.getItem("teamMembers");
    if (savedTeamMembers) {
      setTeamMembers(JSON.parse(savedTeamMembers));
    } else {
      setTeamMembers(initialTeamMembers);
    }
  }, []);

  // Save team members to localStorage whenever they change
  useEffect(() => {
    if (teamMembers.length > 0) {
      localStorage.setItem("teamMembers", JSON.stringify(teamMembers));
    }
  }, [teamMembers]);

  const handleTogglePin = (id: string) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === id) {
          const newPinnedState = !member.isPinned;
          toast({
            title: newPinnedState ? "Member pinned" : "Member unpinned",
            description: `${member.name} has been ${newPinnedState ? "pinned" : "unpinned"}.`,
            duration: 3000,
          });
          return { ...member, isPinned: newPinnedState };
        }
        return member;
      })
    );
  };

  const filteredMembers = useMemo(() => {
    return teamMembers
      .filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        // Pinned members first, then alphabetically
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [teamMembers, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">Team Members</h1>
        <p className="text-gray-600">Manage your team and find members quickly</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            aria-label="Grid View"
          >
            <Grid2x2 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            aria-label="List View"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No team members found matching your search</p>
        </div>
      ) : (
        <div className={`
          grid gap-4 
          ${viewMode === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
            : "grid-cols-1"
          }
        `}>
          {filteredMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onTogglePin={handleTogglePin}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamScreen;
