import { motion } from "framer-motion";
import { BarChart3, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";

// Demo comparison data
const comparisonData = {
  decision: "Career Path: Product Manager vs. Software Engineer",
  factors: [
    { name: "Salary Growth", weight: 80 },
    { name: "Work-Life Balance", weight: 90 },
    { name: "Career Advancement", weight: 85 },
    { name: "Job Satisfaction", weight: 95 },
    { name: "Skill Development", weight: 70 },
  ],
  options: [
    {
      name: "Product Manager",
      isRecommended: true,
      totalScore: 82,
      scores: {
        "Salary Growth": 75,
        "Work-Life Balance": 70,
        "Career Advancement": 90,
        "Job Satisfaction": 88,
        "Skill Development": 80,
      },
    },
    {
      name: "Software Engineer",
      isRecommended: false,
      totalScore: 74,
      scores: {
        "Salary Growth": 85,
        "Work-Life Balance": 65,
        "Career Advancement": 70,
        "Job Satisfaction": 75,
        "Skill Development": 90,
      },
    },
  ],
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "bg-success/20 text-success";
  if (score >= 60) return "bg-warning/20 text-warning";
  return "bg-destructive/20 text-destructive";
};

const getBarWidth = (score: number) => `${score}%`;

export default function Compare() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/result">
            <Button variant="ghost" size="sm" className="mb-2 -ml-2 gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Result
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Detailed Comparison</h1>
          <p className="text-muted-foreground mt-1">{comparisonData.decision}</p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Factor-by-Factor Analysis
              </CardTitle>
              <CardDescription>
                Compare how each option scores across your decision factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Table Header */}
              <div className="grid grid-cols-[1fr,auto,1fr,1fr] gap-4 pb-4 border-b mb-4">
                <div className="font-medium text-muted-foreground text-sm">Factor</div>
                <div className="font-medium text-muted-foreground text-sm w-16 text-center">Weight</div>
                {comparisonData.options.map((option) => (
                  <div key={option.name} className="font-medium text-sm flex items-center gap-2">
                    {option.name}
                    {option.isRecommended && (
                      <Badge className="bg-primary text-xs">Recommended</Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* Table Rows */}
              <div className="space-y-4">
                {comparisonData.factors.map((factor, index) => (
                  <motion.div
                    key={factor.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="grid grid-cols-[1fr,auto,1fr,1fr] gap-4 items-center"
                  >
                    <div className="font-medium">{factor.name}</div>
                    <div className="w-16 text-center">
                      <span className="text-sm text-muted-foreground">{factor.weight}%</span>
                    </div>
                    {comparisonData.options.map((option) => {
                      const score = option.scores[factor.name as keyof typeof option.scores];
                      return (
                        <div key={`${option.name}-${factor.name}`} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="h-3 flex-1 bg-secondary rounded-full overflow-hidden mr-3">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: getBarWidth(score) }}
                                transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                className={`h-full rounded-full ${
                                  option.isRecommended ? "bg-primary" : "bg-muted-foreground/50"
                                }`}
                              />
                            </div>
                            <span className={`text-sm font-medium px-2 py-0.5 rounded ${getScoreColor(score)}`}>
                              {score}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                ))}

                {/* Total Row */}
                <div className="grid grid-cols-[1fr,auto,1fr,1fr] gap-4 items-center pt-4 border-t">
                  <div className="font-bold">Overall Score</div>
                  <div className="w-16"></div>
                  {comparisonData.options.map((option) => (
                    <div key={`total-${option.name}`} className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${option.isRecommended ? "text-primary" : ""}`}>
                        {option.totalScore}%
                      </span>
                      {option.isRecommended && (
                        <Badge className="bg-success">Winner</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Visual Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Visual Comparison</CardTitle>
              <CardDescription>Side-by-side bar comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {comparisonData.factors.map((factor, index) => (
                  <div key={factor.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{factor.name}</span>
                      <span className="text-muted-foreground">Weight: {factor.weight}%</span>
                    </div>
                    <div className="space-y-2">
                      {comparisonData.options.map((option) => {
                        const score = option.scores[factor.name as keyof typeof option.scores];
                        return (
                          <div key={`bar-${option.name}-${factor.name}`} className="flex items-center gap-3">
                            <span className="w-32 text-sm text-muted-foreground truncate">{option.name}</span>
                            <div className="flex-1 h-6 bg-secondary rounded overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: getBarWidth(score) }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                                className={`h-full flex items-center justify-end pr-2 ${
                                  option.isRecommended 
                                    ? "bg-gradient-to-r from-primary to-primary/80" 
                                    : "bg-muted-foreground/40"
                                }`}
                              >
                                <span className={`text-xs font-medium ${
                                  option.isRecommended ? "text-primary-foreground" : "text-foreground"
                                }`}>
                                  {score}
                                </span>
                              </motion.div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interpretation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-3 p-4 rounded-lg bg-info/10 text-sm"
        >
          <Info className="h-5 w-5 text-info shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">How to Read This Comparison</p>
            <p className="text-muted-foreground mt-1">
              Each factor is scored from 0-100 for each option. The overall score is a weighted 
              average based on your importance settings. Higher scores indicate better alignment 
              with your priorities. The recommended option has the highest weighted total.
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link to="/result">
            <Button variant="outline">Back to Summary</Button>
          </Link>
          <Link to="/new-decision">
            <Button>Start New Decision</Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
