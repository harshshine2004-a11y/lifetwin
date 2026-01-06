import { motion } from "framer-motion";
import { 
  Shield, 
  Brain, 
  Eye, 
  Lock, 
  Users, 
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Heart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";

const principles = [
  {
    icon: Brain,
    title: "AI as Support, Not Authority",
    description: "Our AI provides recommendations and analysis to support your decision-making process. The final decision always remains yours. We believe human judgment is irreplaceable.",
  },
  {
    icon: Eye,
    title: "Transparency & Explainability",
    description: "Every recommendation comes with clear reasoning. We show you exactly how factors were weighted and why certain options scored higher, so you understand the logic behind each suggestion.",
  },
  {
    icon: AlertTriangle,
    title: "Bias Awareness",
    description: "AI systems can reflect biases present in training data. We actively work to identify and mitigate biases, and we encourage users to consider diverse perspectives beyond our analysis.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your decisions are personal. We use industry-standard encryption, never sell your data, and give you full control over your information. You can delete your data at any time.",
  },
  {
    icon: Users,
    title: "Inclusive Design",
    description: "DecideWise is built to be accessible to everyone, regardless of technical expertise or background. Clear language and intuitive interfaces are core to our design philosophy.",
  },
  {
    icon: Heart,
    title: "Human-Centered AI",
    description: "We design our AI to augment human capabilities, not replace human connection and wisdom. Major life decisions deserve thoughtful human consideration alongside data analysis.",
  },
];

const commitments = [
  "We will never make decisions for you",
  "We will always explain our reasoning",
  "We will acknowledge the limits of AI analysis",
  "We will protect your data with care",
  "We will continuously improve our bias detection",
  "We will listen to user feedback and concerns",
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

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Badge className="mb-4">Responsible AI</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Ethics & Responsibility
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At DecideWise, we believe AI should empower human decision-making, 
            not replace it. Here's how we put responsible AI principles into practice.
          </p>
        </motion.div>

        {/* Our Principles */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-center">Our Principles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((principle, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <principle.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{principle.title}</h3>
                        <p className="text-sm text-muted-foreground">{principle.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Commitments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Our Commitments to You
              </CardTitle>
              <CardDescription>
                These are the promises we make and uphold
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {commitments.map((commitment, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                    <span className="text-sm">{commitment}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-warning/10 border-warning/30">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertTriangle className="h-6 w-6 text-warning shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Important Disclaimer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    DecideWise is a decision support tool, not a decision maker. Our AI analysis 
                    is based on the information you provide and general patterns in decision-making. 
                    It cannot account for all personal circumstances, emotional factors, or 
                    unpredictable future events.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    For major life decisions, we recommend:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Consulting with relevant professionals (financial advisors, career counselors, etc.)</li>
                    <li>• Discussing with trusted friends and family</li>
                    <li>• Taking time to reflect on your values and long-term goals</li>
                    <li>• Considering factors that may not be easily quantified</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* About the Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card>
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-3">About DecideWise</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
                DecideWise was created to help people navigate important life decisions 
                with greater clarity and confidence. We combine structured decision-making 
                frameworks with responsible AI to provide personalized insights while 
                always respecting human autonomy.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with ❤️ for the Imagine Cup Innovation Challenge
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>
            Questions about our AI ethics practices? We'd love to hear from you.
          </p>
          <p className="mt-1">
            Contact us at{" "}
            <a href="mailto:ethics@decidewise.app" className="text-primary hover:underline">
              ethics@decidewise.app
            </a>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
