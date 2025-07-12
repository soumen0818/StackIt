import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "@/components/RichTextEditor";
import axios from 'axios';

const AskQuestion = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/questions', { title, description, tags });
      console.log(response.data);
      navigate('/questions');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuggestedTags = async () => {
    try {
      const response = await axios.get('/api/tags');
      setSuggestedTags(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuggestedTags();
  }, []);

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
              <Link to="/tags" className="text-slate-300 hover:text-white transition-colors">Tags</Link>
              <Link to="/users" className="text-slate-300 hover:text-white transition-colors">Users</Link>
            </nav>
            <Link to="/questions">
              <Button variant="outline" size="sm" className="border-slate-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Questions
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Ask a Question</h1>
            <p className="text-slate-400">Get help from our community of developers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Title</CardTitle>
                    <p className="text-sm text-slate-400">Be specific and imagine you're asking a question to another person</p>
                  </CardHeader>
                  <CardContent>
                    <Input
                      placeholder="e.g. How to implement JWT authentication in React?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 focus:border-blue-500"
                      required
                    />
                  </CardContent>
                </Card>

                {/* Description */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Description</CardTitle>
                    <p className="text-sm text-slate-400">Include all the information someone would need to answer your question</p>
                  </CardHeader>
                  <CardContent>
                    <RichTextEditor
                      content={description}
                      onChange={setDescription}
                      placeholder="Describe your problem in detail. Include what you've tried and what specific help you need..."
                    />
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-white">Tags</CardTitle>
                    <p className="text-sm text-slate-400">Add up to 5 tags to describe what your question is about</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="bg-slate-700/50 border-slate-600 focus:border-blue-500"
                      />
                      <Button type="button" onClick={handleAddTag} disabled={tags.length >= 5}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Current Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-300 flex items-center gap-1">
                            {tag}
                            <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-400">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Suggested Tags */}
                    <div>
                      <p className="text-sm text-slate-400 mb-2">Suggested tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags.filter(tag => !tags.includes(tag)).slice(0, 6).map((tag) => (
                          <Button
                            key={tag}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (tags.length < 5) {
                                setTags([...tags, tag]);
                              }
                            }}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            disabled={tags.length >= 5}
                          >
                            {tag}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Post Your Question
                  </Button>
                  <Button type="button" variant="outline" className="border-slate-600" onClick={() => navigate("/questions")}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Writing a good question</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-200">Steps</h4>
                    <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Summarize your problem in a one-line title</li>
                      <li>• Describe your problem in more detail</li>
                      <li>• Describe what you've tried and what you expected</li>
                      <li>• Add relevant tags</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Be specific and clear</li>
                    <li>• Include relevant code snippets</li>
                    <li>• Use proper formatting</li>
                    <li>• Add relevant tags</li>
                    <li>• Check for similar questions first</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
