import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MessageSquare, Users, TrendingUp, ChevronRight, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NotificationDropdown } from "@/components/NotificationDropdown";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const featuredQuestions = [
    {
      id: 1,
      title: "How to implement JWT authentication in React?",
      description: "I'm trying to implement JWT token-based authentication in my React application...",
      tags: ["React", "JWT", "Authentication"],
      votes: 15,
      answers: 3,
      author: "john_dev",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for TypeScript error handling",
      description: "What are the recommended patterns for handling errors in TypeScript applications?",
      tags: ["TypeScript", "Error Handling", "Best Practices"],
      votes: 23,
      answers: 7,
      author: "sarah_codes",
      timeAgo: "4 hours ago"
    },
    {
      id: 3,
      title: "Optimizing React performance with useMemo",
      description: "When should I use useMemo and useCallback hooks for performance optimization?",
      tags: ["React", "Performance", "Hooks"],
      votes: 31,
      answers: 12,
      author: "alex_react",
      timeAgo: "1 day ago"
    }
  ];

  const popularTags = [
    { name: "React", count: 1243 },
    { name: "JavaScript", count: 2156 },
    { name: "TypeScript", count: 987 },
    { name: "Node.js", count: 756 },
    { name: "CSS", count: 634 },
    { name: "HTML", count: 523 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                StackIt
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/questions" className="text-slate-300 hover:text-white transition-colors">Questions</Link>
                <Link to="/tags" className="text-slate-300 hover:text-white transition-colors">Tags</Link>
                <Link to="/users" className="text-slate-300 hover:text-white transition-colors">Users</Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search questions..."
                  className="pl-10 w-64 bg-slate-800/50 border-slate-600 focus:border-blue-500"
                />
              </div>

              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <NotificationDropdown />
                  <Link to="/user">
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Log in</Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Every <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">question</span> deserves an answer
            </h1>
            <p className="text-xl text-slate-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Join our community of developers sharing knowledge, solving problems, and building the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/ask">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8">
                  <Plus className="h-5 w-5 mr-2" />
                  Ask a Question
                </Button>
              </Link>
              <Link to="/questions">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8">
                  Browse Questions
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">10K+</div>
              <div className="text-slate-400">Questions Asked</div>
              <MessageSquare className="h-8 w-8 mx-auto text-blue-400" />
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">5K+</div>
              <div className="text-slate-400">Active Users</div>
              <Users className="h-8 w-8 mx-auto text-purple-400" />
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">98%</div>
              <div className="text-slate-400">Success Rate</div>
              <TrendingUp className="h-8 w-8 mx-auto text-green-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Questions</h2>
            <p className="text-slate-400">Discover what the community is discussing right now</p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {featuredQuestions.map((question) => (
              <div key={question.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:bg-slate-800/70 transition-all hover:scale-[1.02] hover:shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <Link to={`/questions/${question.id}`}>
                    <h3 className="text-xl font-semibold text-white hover:text-blue-400 cursor-pointer transition-colors">
                      {question.title}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {question.votes}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {question.answers}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 mb-4 line-clamp-2">{question.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-slate-400">
                    by <span className="text-blue-400">{question.author}</span> • {question.timeAgo}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/questions">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                View All Questions
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Tags</h2>
            <p className="text-slate-400">Explore topics that matter to developers</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {popularTags.map((tag) => (
              <div key={tag.name} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:bg-slate-800/70 transition-all hover:scale-105 cursor-pointer group">
                <div className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{tag.name}</div>
                <div className="text-sm text-slate-400">{tag.count} questions</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers sharing knowledge and growing together in our community.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8">
              Join StackIt Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">StackIt</h3>
              <p className="text-slate-400">A minimal Q&A platform for developers to share knowledge and solve problems together.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/questions" className="hover:text-white transition-colors">Questions</Link></li>
                <li><Link to="/tags" className="hover:text-white transition-colors">Tags</Link></li>
                <li><Link to="/users" className="hover:text-white transition-colors">Users</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 StackIt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
