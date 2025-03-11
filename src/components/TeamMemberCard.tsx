
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Pin, PinOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { TeamMember } from "@/data/teamMembers";

interface TeamMemberCardProps {
  member: TeamMember;
  onTogglePin: (id: string) => void;
  viewMode: "grid" | "list";
}

const TeamMemberCard = ({ member, onTogglePin, viewMode }: TeamMemberCardProps) => {
  const { id, name, role, email, avatar, isPinned } = member;
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className={cn(
      "relative group transition-all duration-200 hover:shadow-md",
      viewMode === "grid" ? "p-4" : "p-2",
      isPinned && "border-purple-300 bg-purple-50"
    )}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onTogglePin(id)}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label={isPinned ? "Unpin member" : "Pin member"}
        >
          {isPinned ? (
            <PinOff className="h-4 w-4 text-purple-600" />
          ) : (
            <Pin className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
      
      <CardContent className={cn(
        "p-0 flex items-center",
        viewMode === "list" ? "flex-row gap-4" : "flex-col text-center gap-2",
      )}>
        <Avatar className={cn(
          "border-2 border-white shadow-sm",
          viewMode === "grid" ? "h-20 w-20 mx-auto" : "h-10 w-10"
        )}>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-purple-100 text-purple-700">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        
        <div className={cn(
          "overflow-hidden",
          viewMode === "list" ? "flex-1" : "w-full mt-2"
        )}>
          <h3 className="font-medium truncate">{name}</h3>
          <p className="text-sm text-gray-500 truncate">{role}</p>
          {viewMode === "grid" && (
            <p className="text-xs text-gray-400 truncate mt-1">{email}</p>
          )}
        </div>
        
        {viewMode === "list" && (
          <p className="text-sm text-gray-500 hidden md:block">{email}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
