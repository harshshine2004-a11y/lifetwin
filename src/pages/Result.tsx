import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Award, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Demo result data
const resultData = {
  decision: "Career Path: Product Manager vs. Software Engineer",
  recommendation: "Product Manager",
  confidence: 82,
  riskLevel: "Low",
  options: [
    {
      name: "Product Manager",
      score: 82,
      isRecommended: true,
      breakdown: [
        { factor: "Salary Growth", score: 75, weight: 80 },
        { factor: "Work-Life Balance", score: 70, weight: 90 },
        { factor: "Career Advancement", score: 90, weight: 85 },
        { factor: "Job Satisfaction", score: 88, weight: 95 },
        { factor: "Skill Development", score: 80, weight: 70 },
      ],
    },
    {
      name: "Software Engineer",
      score: 74,
      isRecommended: false,
      breakdown: [
        { factor: "Salary Growth", score: 85, weight: 80 },
        { factor: "Work-Life Balance", score: 65, weight: 90 },
        { factor: "Career Advancement", score: 70, weight: 85 },
        { factor: "Job Satisfaction", score: 75, weight: 95 },
        { factor: "Skill Development", score: 90, weight: 70 },
      ],
    },
  ],
  explanation: {
    summary: "Based on your priorities, Product Manager emerges as the stronger choice. Your high emphasis on Job Satisfaction and Career Advancement aligns well with the PM role's opportunities for strategic impact and leadership growth.",
    strengths: [
      "Higher potential for career advancement to leadership roles",
      "Better alignment with your interest in strategic thinking",
      "Strong job satisfaction due to diverse responsibilities",
    ],
    considerations: [
      "Salary growth may be slightly slower initially",
      "Work-life balance can vary significantly by company",
      "Requires developing new skills in stakeholder management",
    ],
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Result() {
  const [feedback, setFeedback] = useState<"helpful" | "not-helpful" | null>(null);
  const { toast } = useToast();

  const handleFeedback = (type: "helpful" | "not-helpful") => {
    setFeedback(type);
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve our recommendations.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Link copied!",
      description: "Share this result with others.",
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <Link to="/new-decision">
              <Button variant="ghost" size="sm" className="mb-2 -ml-2 gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Decision
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{resultData.decision}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare} className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Recommendation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-primary/20 recommended-glow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI Recommendation</p>
                    <p className="text-2xl font-bold">{resultData.recommendation}</p>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-wrap items-center gap-4 md:justify-end">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className={`text-2xl font-bold ${
                      resultData.confidence >= 80 ? "text-success" : 
                      resultData.confidence >= 60 ? "text-warning" : "text-destructive"
                    }`}>
                      {resultData.confidence}%
                    </p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={
                      resultData.riskLevel === "Low" 
                        ? "bg-success/10 text-success" 
                        : resultData.riskLevel === "Medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                    }
                  >
                    {resultData.riskLevel} Risk
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Comparison Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid gap-4 md:grid-cols-2"
        >
          {resultData.options.map((option) => (
            <motion.div key={option.name} variants={fadeInUp}>
              <Card className={option.isRecommended ? "border-primary/30 bg-primary/5" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{option.name}</CardTitle>
                      {option.isRecommended && (
                        <Badge className="bg-primary">Recommended</Badge>
                      )}
                    </div>
                    <span className="text-2xl font-bold">{option.score}%</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {option.breakdown.map((item) => (
                    <div key={item.factor} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.factor}</span>
                        <span className="font-medium">{item.score}</span>
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Explanation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Why This Recommendation?
              </CardTitle>
              <CardDescription>
                Transparent reasoning behind the AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">{resultData.explanation.summary}</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                {/* Strengths */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    Key Strengths
                  </h4>
                  <ul className="space-y-2">
                    {resultData.explanation.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-success shrink-0" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Considerations */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2 text-warning">
                    <AlertTriangle className="h-4 w-4" />
                    Considerations
                  </h4>
                  <ul className="space-y-2">
                    {resultData.explanation.considerations.map((consideration, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warning shrink-0" />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Responsible AI Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-3 p-4 rounded-lg bg-info/10 text-sm"
        >
          <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">AI Analysis Disclaimer</p>
            <p className="text-muted-foreground mt-1">
              This recommendation is based on the factors and weights you provided. 
              Consider your unique circumstances, consult relevant experts, and trust 
              your own judgment when making your final decision.
            </p>
          </div>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-medium">Was this analysis helpful?</p>
                  <p className="text-sm text-muted-foreground">Your feedback helps improve our recommendations</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={feedback === "helpful" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFeedback("helpful")}
                    className="gap-1"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Helpful
                  </Button>
                  <Button
                    variant={feedback === "not-helpful" ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFeedback("not-helpful")}
                    className="gap-1"
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Not Helpful
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/compare">
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Detailed Comparison
            </Button>
          </Link>
          <Link to="/new-decision">
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Start New Decision
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
