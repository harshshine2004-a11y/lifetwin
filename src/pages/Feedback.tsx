import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Star, 
  Send,
  CheckCircle2,
  Lightbulb,
  Bug,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const feedbackTypes = [
  { id: "general", label: "General Feedback", icon: MessageSquare },
  { id: "feature", label: "Feature Request", icon: Lightbulb },
  { id: "bug", label: "Report an Issue", icon: Bug },
  { id: "praise", label: "Share Appreciation", icon: Heart },
];

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("general");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({ 
        title: "Please enter your feedback", 
        variant: "destructive" 
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const handleReset = () => {
    setRating(0);
    setFeedbackType("general");
    setMessage("");
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center py-12">
              <CardContent>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mx-auto mb-6"
                >
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6">
                  Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.
                </p>
                <Button onClick={handleReset}>Submit More Feedback</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold">Share Your Feedback</h1>
          <p className="text-muted-foreground mt-1">
            Help us improve DecideWise by sharing your thoughts and experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Your Feedback
                </CardTitle>
                <CardDescription>
                  All feedback is anonymous unless you choose to include contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Rating */}
                <div className="space-y-3">
                  <Label>Overall Experience</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            star <= (hoveredRating || rating)
                              ? "fill-accent text-accent"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-sm text-muted-foreground">
                        {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Feedback Type */}
                <div className="space-y-3">
                  <Label>Feedback Type</Label>
                  <RadioGroup
                    value={feedbackType}
                    onValueChange={setFeedbackType}
                    className="grid grid-cols-2 gap-3"
                  >
                    {feedbackTypes.map((type) => (
                      <div key={type.id}>
                        <RadioGroupItem
                          value={type.id}
                          id={type.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={type.id}
                          className="flex items-center gap-2 rounded-lg border-2 border-muted p-4 cursor-pointer hover:bg-secondary/50 transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                        >
                          <type.icon className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts, suggestions, or report any issues you've encountered..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </motion.div>

        {/* Privacy Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm text-muted-foreground"
        >
          Your feedback helps us build a better product. We take privacy seriously 
          and will never share your information without consent.
        </motion.p>
      </div>
    </Layout>
  );
}
