
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, TrendingUp, MessageSquare, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Questions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const questions = [
    {
      id: 1,
      title: "How to implement JWT authentication in React?",
      description: "I'm trying to implement JWT token-based authentication in my React application. I've set up the backend API but I'm struggling with the frontend implementation...",
      tags: ["React", "JWT", "Authentication"],
      votes: 15,
      answers: 3,
      views: 127,
      author: "john_dev",
      timeAgo: "2 hours ago",
      isAnswered: true
    },
    {
      id: 2,
      title: "Best practices for TypeScript error handling",
      description: "What are the recommended patterns for handling errors in TypeScript applications? Should I use custom error classes or stick with the built-in Error type?",
      tags: ["TypeScript", "Error Handling", "Best Practices"],
      votes: 23,
      answers: 7,
      views: 89,
      author: "sarah_codes",
      timeAgo: "4 hours ago",
      isAnswered: true
    },
    {
      id: 3,
      title: "Optimizing React performance with useMemo",
      description: "When should I use useMemo and useCallback hooks for performance optimization? I've heard they can actually hurt performance if used incorrectly.",
      tags: ["React", "Performance", "Hooks"],
      votes: 31,
      answers: 12,
      views: 256,
      author: "alex_react",
      timeAgo: "1 day ago",
      isAnswered: true
    },
    {
      id: 4,
      title: "Understanding async/await vs Promises in JavaScript",
      description: "I'm confused about when to use async/await syntax versus traditional Promise chains. What are the performance implications?",
      tags: ["JavaScript", "Async", "Promises"],
      votes: 8,
      answers: 0,
      views: 45,
      author: "newbie_coder",
      timeAgo: "3 hours ago",
      isAnswered: false
    },
    {
      id: 5,
      title: "CSS Grid vs Flexbox - When to use which?",
      description: "I'm working on a complex layout and I'm not sure whether to use CSS Grid or Flexbox. What are the key differences and use cases?",
      tags: ["CSS", "Grid", "Flexbox", "Layout"],
      votes: 19,
      answers: 5,
      views: 178,
      author: "css_master",
      timeAgo: "6 hours ago",
      isAnswered: true
    }
  ];

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              <Link to="/questions" className="text-white font-medium">Questions</Link>
              <Link to="/tags" className="text-slate-300 hover:text-white transition-colors">Tags</Link>
              <Link to="/users" className="text-slate-300 hover:text-white transition-colors">Users</Link>
            </nav>
            <Link to="/ask">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
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
            <h1 className="text-3xl font-bold text-white mb-2">All Questions</h1>
            <p className="text-slate-400">{filteredQuestions.length} questions found</p>
          </div>
          <Link to="/ask">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Ask Question
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search questions by title or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700/50 border-slate-600 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="votes">Most Votes</SelectItem>
                  <SelectItem value="answers">Most Answers</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="border-slate-600">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Link to={`/questions/${question.id}`}>
                    <h2 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors mb-2 cursor-pointer">
                      {question.title}
                    </h2>
                  </Link>
                  <p className="text-slate-300 mb-4 line-clamp-2">{question.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2 text-sm text-slate-400 ml-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {question.votes}
                  </div>
                  <div className={`flex items-center ${question.isAnswered ? 'text-green-400' : ''}`}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {question.answers}
                  </div>
                  <div className="flex items-center">
                    <span>{question.views} views</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-blue-400">{question.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {question.timeAgo}
                  </div>
                </div>
                {question.isAnswered && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    Answered
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-slate-600">Previous</Button>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">1</Button>
            <Button variant="outline" size="sm" className="border-slate-600">2</Button>
            <Button variant="outline" size="sm" className="border-slate-600">3</Button>
            <Button variant="outline" size="sm" className="border-slate-600">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
