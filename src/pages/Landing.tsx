import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BarChart3, 
  Brain, 
  CheckCircle2, 
  Scale, 
  Shield, 
  Sparkles,
  Target,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Scale,
    title: "Weighted Comparison",
    description: "Assign importance to factors that matter most to you for personalized analysis.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations backed by explainable reasoning.",
  },
  {
    icon: Shield,
    title: "Responsible AI",
    description: "Transparent, bias-aware analysis that supports—not replaces—your judgment.",
  },
  {
    icon: Target,
    title: "Clear Results",
    description: "Visual comparisons and confidence levels help you understand the recommendation.",
  },
];

const useCases = [
  "Career decisions",
  "Job offers",
  "City relocation",
  "College selection",
  "Startup ideas",
  "Major purchases",
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

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">DecideWise</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container pt-16 pb-24 md:pt-24 md:pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Decision Support
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Make Better Decisions with{" "}
            <span className="text-primary">Clarity & Confidence</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="mt-6 text-lg text-muted-foreground md:text-xl">
            DecideWise helps you analyze important life choices by comparing options, 
            weighing factors, and providing AI-powered recommendations with clear explanations.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/new-decision">
              <Button size="lg" className="gap-2 px-8">
                Start Your Decision
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn How It Works
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-sm text-muted-foreground">Perfect for:</span>
          {useCases.map((useCase) => (
            <span
              key={useCase}
              className="rounded-full bg-secondary px-4 py-1.5 text-sm text-secondary-foreground"
            >
              {useCase}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="container pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mx-auto max-w-4xl"
        >
          <motion.h2 variants={fadeInUp} className="mb-12 text-center text-3xl font-bold">
            How It Works
          </motion.h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: 1, title: "Define Your Decision", desc: "Enter your options and the factors that matter to you." },
              { step: 2, title: "Set Your Priorities", desc: "Assign weights to show which factors are most important." },
              { step: 3, title: "Get AI Insights", desc: "Receive a clear recommendation with transparent reasoning." },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeInUp} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="container pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-2xl bg-secondary/50 p-8 text-center"
        >
          <Shield className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h3 className="mb-3 text-xl font-semibold">Responsible AI Promise</h3>
          <p className="text-muted-foreground">
            DecideWise is a decision support tool, not a decision maker. Our AI provides 
            transparent reasoning, acknowledges limitations, and always encourages you 
            to trust your own judgment alongside our analysis.
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-primary p-8 md:p-12 text-center text-primary-foreground"
        >
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Ready to Make Your Next Big Decision?
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Join thousands making more informed choices with AI-powered clarity.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">DecideWise</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">Ethics</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 DecideWise. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
