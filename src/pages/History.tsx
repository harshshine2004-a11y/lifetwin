import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Search,
  Filter,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Demo history data
const historyData = [
  {
    id: 1,
    title: "Career Path: Product Manager vs. Software Engineer",
    date: "2024-01-15",
    status: "completed",
    recommendation: "Product Manager",
    confidence: 82,
    options: ["Product Manager", "Software Engineer"],
    factorCount: 5,
  },
  {
    id: 2,
    title: "City Relocation: Austin vs. Seattle vs. Denver",
    date: "2024-01-10",
    status: "completed",
    recommendation: "Austin",
    confidence: 75,
    options: ["Austin", "Seattle", "Denver"],
    factorCount: 6,
  },
  {
    id: 3,
    title: "Job Offer: TechCorp vs. StartupX",
    date: "2024-01-08",
    status: "pending",
    recommendation: null,
    confidence: null,
    options: ["TechCorp", "StartupX"],
    factorCount: 4,
  },
  {
    id: 4,
    title: "University Selection for MBA",
    date: "2023-12-20",
    status: "completed",
    recommendation: "Stanford GSB",
    confidence: 88,
    options: ["Stanford GSB", "Harvard Business", "Wharton"],
    factorCount: 7,
  },
  {
    id: 5,
    title: "First Car Purchase: Tesla Model 3 vs. BMW 3 Series",
    date: "2023-12-15",
    status: "completed",
    recommendation: "Tesla Model 3",
    confidence: 71,
    options: ["Tesla Model 3", "BMW 3 Series", "Audi A4"],
    factorCount: 5,
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredHistory = historyData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold">Decision History</h1>
            <p className="text-muted-foreground mt-1">
              Review and revisit your past decision analyses
            </p>
          </div>
          <Link to="/new-decision">
            <Button className="gap-2">
              New Decision
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search decisions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
              className="gap-1"
            >
              <CheckCircle2 className="h-4 w-4" />
              Completed
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
              className="gap-1"
            >
              <Clock className="h-4 w-4" />
              Pending
            </Button>
          </div>
        </motion.div>

        {/* History List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-4"
        >
          {filteredHistory.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No decisions found matching your criteria.</p>
                <Link to="/new-decision">
                  <Button className="mt-4">Create Your First Decision</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredHistory.map((item) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${
                            item.status === "completed" ? "bg-success/10" : "bg-warning/10"
                          }`}>
                            {item.status === "completed" ? (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            ) : (
                              <Clock className="h-4 w-4 text-warning" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <span>{formatDate(item.date)}</span>
                              <span>•</span>
                              <span>{item.options.length} options</span>
                              <span>•</span>
                              <span>{item.factorCount} factors</span>
                            </div>
                          </div>
                        </div>

                        {item.recommendation && (
                          <div className="ml-11 flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Recommended:</span>
                            <span className="text-sm font-medium text-primary">{item.recommendation}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 ml-11 md:ml-0">
                        {item.confidence && (
                          <Badge 
                            variant="secondary"
                            className={
                              item.confidence >= 80 
                                ? "bg-success/10 text-success" 
                                : item.confidence >= 60 
                                  ? "bg-warning/10 text-warning" 
                                  : "bg-destructive/10 text-destructive"
                            }
                          >
                            {item.confidence}% confidence
                          </Badge>
                        )}
                        <Link to={item.status === "completed" ? "/result" : "/new-decision"}>
                          <Button variant="outline" size="sm" className="gap-1">
                            {item.status === "completed" ? "View" : "Continue"}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-secondary/30">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold">{historyData.length}</p>
                  <p className="text-sm text-muted-foreground">Total Decisions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{historyData.filter(d => d.status === "completed").length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(historyData.filter(d => d.confidence).reduce((sum, d) => sum + (d.confidence || 0), 0) / historyData.filter(d => d.confidence).length)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Confidence</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{historyData.filter(d => d.status === "pending").length}</p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
