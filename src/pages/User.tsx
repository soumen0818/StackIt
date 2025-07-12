import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User as UserIcon, Calendar, MessageSquare, TrendingUp, Edit2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserProfile {
  name: string;
  email: string;
  joined: string;
  bio?: string;
  reputation: number;
  questions: number;
  answers: number;
  tags: string[];
}

const mockUser: UserProfile = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  joined: "2023-01-15",
  bio: "Full Stack Developer. Passionate about React, TypeScript, and open source.",
  reputation: 1240,
  questions: 12,
  answers: 34,
  tags: ["React", "TypeScript", "JavaScript", "CSS"],
};

const User = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Replace with real API call
    setUser(mockUser);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <div className="text-slate-400 text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <header className="border-b border-slate-700/50 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            StackIt
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link to="/questions" className="text-slate-300 hover:text-white transition-colors">Questions</Link>
            <Link to="/tags" className="text-slate-300 hover:text-white transition-colors">Tags</Link>
            <Link to="/users" className="text-white font-medium">Users</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700/50 mb-8">
            <CardHeader className="flex flex-row items-center gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-2">
                <UserIcon className="h-16 w-16 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">{user.name}</CardTitle>
                <div className="text-slate-400">{user.email}</div>
                <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(user.joined).toLocaleDateString()}
                </div>
              </div>
              <div className="ml-auto">
                <Button variant="outline" size="sm" className="border-slate-600">
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-slate-300 mb-4">{user.bio}</div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-bold">{user.reputation}</span> Reputation
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-bold">{user.answers}</span> Answers
                </div>
                <div className="flex items-center gap-2 text-purple-400">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-bold">{user.questions}</span> Questions
                </div>
              </div>
              <div className="mt-6">
                <div className="font-semibold text-slate-200 mb-2">Top Tags</div>
                <div className="flex flex-wrap gap-2">
                  {user.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;