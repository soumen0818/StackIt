import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, MessageSquare, User, Calendar, Check, Share, Bookmark, Flag, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RichTextEditor } from "@/components/RichTextEditor";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const QuestionDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [answerContent, setAnswerContent] = useState("");
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  const fetchQuestionDetails = async () => {
    try {
      const response = await axios.get(`/api/questions/${id}`);
      setQuestion(response.data);
      setAnswers(response.data.answers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (answerId: number, vote: 'up' | 'down') => {
    try {
      const response = await axios.post('/api/answers/vote', { answerId, vote: vote === 'up' ? 1 : -1 });
      console.log(response.data);
      fetchQuestionDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptAnswer = async (answerId: number) => {
    try {
      const response = await axios.post('/api/answers/accept', { answerId });
      console.log(response.data);
      fetchQuestionDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitAnswer = async () => {
    if (answerContent.trim()) {
      try {
        const response = await axios.post('/api/answers', { content: answerContent, questionId: id });
        toast({ title: "Answer posted", description: "Your answer has been submitted successfully." });
        setAnswerContent("");
        fetchQuestionDetails();
      } catch (error) {
        console.error(error);
        toast({ title: "Error posting answer", description: "There was an error submitting your answer. Please try again later." });
      }
    }
  };

  useEffect(() => {
    fetchQuestionDetails();
  }, [id]);

  if (!question) return null;

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
        {/* Question */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-8">
              <div className="flex gap-6">
                {/* Voting */}
                <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(question.id, 'up')}
                    className={`p-2 ${userVote === 'up' ? 'text-green-400' : 'text-slate-400 hover:text-green-400'}`}
                  >
                    <TrendingUp className="h-6 w-6" />
                  </Button>
                  <span className="text-xl font-bold text-white">{question.votes}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVote(question.id, 'down')}
                    className={`p-2 ${userVote === 'down' ? 'text-red-400' : 'text-slate-400 hover:text-red-400'}`}
                  >
                    <TrendingDown className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 text-slate-400 hover:text-yellow-400">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-4">{question.title}</h1>

                  <div className="prose prose-invert max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: question.description }} />

                  <div className="flex flex-wrap gap-2 mb-6">
                    {question.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span className="text-blue-400">{question.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {question.timeAgo}
                      </div>
                      <div>{question.views} views</div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                        <Flag className="h-4 w-4 mr-1" />
                        Flag
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answers */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">{answers.length} Answers</h2>

            {answers.map((answer) => (
              <Card key={answer.id} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    {/* Voting */}
                    <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 text-slate-400 hover:text-green-400"
                        onClick={() => handleVote(answer.id, 'up')}
                      >
                        <TrendingUp className="h-6 w-6" />
                      </Button>
                      <span className="text-xl font-bold text-white">{answer.votes}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 text-slate-400 hover:text-red-400"
                        onClick={() => handleVote(answer.id, 'down')}
                      >
                        <TrendingDown className="h-6 w-6" />
                      </Button>
                      {answer.isAccepted && (
                        <div className="mt-2 p-2 bg-green-500/20 rounded-full">
                          <Check className="h-5 w-5 text-green-400" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="prose prose-invert max-w-none mb-6"
                        dangerouslySetInnerHTML={{ __html: answer.content }} />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span className="text-blue-400">{answer.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {answer.timeAgo}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!answer.isAccepted && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAcceptAnswer(answer.id)}
                              className="border-green-600 text-green-400 hover:bg-green-600/20"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <Share className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Answer Form */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">Your Answer</h3>

              <div className="space-y-4">
                <RichTextEditor
                  content={answerContent}
                  onChange={setAnswerContent}
                  placeholder="Write your answer here..."
                />

                <div className="flex gap-4">
                  <Button
                    onClick={handleSubmitAnswer}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    disabled={!answerContent.trim()}
                  >
                    Post Your Answer
                  </Button>
                  <Button variant="outline" className="border-slate-600">
                    Save Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;