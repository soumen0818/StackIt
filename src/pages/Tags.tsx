import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Hash, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Tags = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const tags = [
    { name: "React", description: "A JavaScript library for building user interfaces", questions: 1243, followers: 892 },
    { name: "JavaScript", description: "High-level, interpreted programming language", questions: 2156, followers: 1456 },
    { name: "TypeScript", description: "Typed superset of JavaScript", questions: 987, followers: 743 },
    { name: "Node.js", description: "JavaScript runtime built on Chrome's V8 engine", questions: 756, followers: 623 },
    { name: "CSS", description: "Cascading Style Sheets for styling web pages", questions: 634, followers: 456 },
    { name: "HTML", description: "Standard markup language for web pages", questions: 523, followers: 389 },
    { name: "Python", description: "High-level programming language", questions: 1089, followers: 834 },
    { name: "API", description: "Application Programming Interface", questions: 445, followers: 267 },
    { name: "Authentication", description: "Process of verifying user identity", questions: 378, followers: 234 },
    { name: "Database", description: "Organized collection of data", questions: 567, followers: 423 },
    { name: "MongoDB", description: "NoSQL document database", questions: 234, followers: 189 },
    { name: "Express", description: "Web framework for Node.js", questions: 345, followers: 278 },
    { name: "JWT", description: "JSON Web Tokens for authentication", questions: 198, followers: 156 },
    { name: "Redux", description: "State management library for JavaScript", questions: 267, followers: 203 },
    { name: "Next.js", description: "React framework for production", questions: 189, followers: 145 },
    { name: "Vue.js", description: "Progressive JavaScript framework", questions: 156, followers: 123 },
  ];

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTags = [...filteredTags].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.questions - a.questions;
      case "newest":
        return a.name.localeCompare(b.name);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              StackIt
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/questions" className="text-slate-300 hover:text-white transition-colors">Questions</Link>
              <Link to="/tags" className="text-white font-medium">Tags</Link>
              <Link to="/users" className="text-slate-300 hover:text-white transition-colors">Users</Link>
            </nav>
            <Link to="/ask">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Ask Question
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tags</h1>
            <p className="text-slate-400">A tag is a keyword or label that categorizes your question with other similar questions</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 focus:border-blue-500"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tags Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedTags.map((tag) => (
            <Link key={tag.name} to={`/questions?tag=${tag.name}`}>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all hover:scale-[1.02] hover:shadow-xl cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 group-hover:bg-blue-500/30 text-lg px-3 py-1">
                    <Hash className="h-4 w-4 mr-1" />
                    {tag.name}
                  </Badge>
                  <div className="flex items-center text-sm text-slate-400">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {tag.questions}
                  </div>
                </div>
                
                <p className="text-slate-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                  {tag.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {tag.questions} questions
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {tag.followers} followers
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No results */}
        {sortedTags.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Hash className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tags found matching your search.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tags;