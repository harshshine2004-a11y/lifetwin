import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  ArrowRight,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";

// Demo data for recent decisions
const recentDecisions = [
  {
    id: 1,
    title: "Career Path: Product Manager vs. Software Engineer",
    date: "2 days ago",
    status: "completed",
    recommendation: "Product Manager",
    confidence: 82,
  },
  {
    id: 2,
    title: "City Relocation: Austin vs. Seattle vs. Denver",
    date: "1 week ago",
    status: "completed",
    recommendation: "Austin",
    confidence: 75,
  },
  {
    id: 3,
    title: "Job Offer: TechCorp vs. StartupX",
    date: "In progress",
    status: "pending",
    recommendation: null,
    confidence: null,
  },
];

const stats = [
  { label: "Decisions Made", value: "12", icon: CheckCircle2 },
  { label: "This Month", value: "3", icon: Clock },
  { label: "Avg. Confidence", value: "78%", icon: TrendingUp },
];

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

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Alex</h1>
            <p className="mt-1 text-muted-foreground">
              Ready to make your next important decision?
            </p>
          </div>
          <Link to="/new-decision">
            <Button size="lg" className="gap-2">
              <PlusCircle className="h-5 w-5" />
              New Decision
            </Button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid gap-4 md:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Start Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Start a New Decision Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Compare options, set priorities, and get AI-powered recommendations.
                  </p>
                </div>
                <Link to="/new-decision">
                  <Button className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Decisions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Decisions</CardTitle>
                  <CardDescription>Your latest decision analyses</CardDescription>
                </div>
                <Link to="/history">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDecisions.map((decision) => (
                  <Link 
                    key={decision.id} 
                    to={decision.status === "completed" ? "/result" : "/new-decision"}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/50 transition-colors">
                      <div className="space-y-1">
                        <p className="font-medium">{decision.title}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{decision.date}</span>
                          {decision.recommendation && (
                            <>
                              <span>•</span>
                              <span className="text-primary font-medium">
                                Recommended: {decision.recommendation}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {decision.confidence && (
                          <Badge 
                            variant="secondary" 
                            className={
                              decision.confidence >= 80 
                                ? "bg-success/10 text-success" 
                                : decision.confidence >= 60 
                                  ? "bg-warning/10 text-warning" 
                                  : "bg-destructive/10 text-destructive"
                            }
                          >
                            {decision.confidence}% confidence
                          </Badge>
                        )}
                        <Badge variant={decision.status === "completed" ? "default" : "secondary"}>
                          {decision.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
