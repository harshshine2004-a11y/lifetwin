import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

interface Option {
  id: string;
  name: string;
}

interface Factor {
  id: string;
  name: string;
  weight: number;
}

// Pre-filled demo data
const demoDecision = {
  title: "Career Path: Product Manager vs. Software Engineer",
  context: "I'm a software developer with 3 years of experience considering a transition to product management. I enjoy both coding and strategic thinking.",
  options: [
    { id: "1", name: "Product Manager" },
    { id: "2", name: "Software Engineer" },
  ],
  factors: [
    { id: "1", name: "Salary Growth", weight: 80 },
    { id: "2", name: "Work-Life Balance", weight: 90 },
    { id: "3", name: "Career Advancement", weight: 85 },
    { id: "4", name: "Job Satisfaction", weight: 95 },
    { id: "5", name: "Skill Development", weight: 70 },
  ],
};

export default function NewDecision() {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(demoDecision.title);
  const [context, setContext] = useState(demoDecision.context);
  const [options, setOptions] = useState<Option[]>(demoDecision.options);
  const [factors, setFactors] = useState<Factor[]>(demoDecision.factors);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addOption = () => {
    if (options.length >= 5) {
      toast({ title: "Maximum 5 options allowed", variant: "destructive" });
      return;
    }
    setOptions([...options, { id: Date.now().toString(), name: "" }]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) {
      toast({ title: "Minimum 2 options required", variant: "destructive" });
      return;
    }
    setOptions(options.filter((o) => o.id !== id));
  };

  const updateOption = (id: string, name: string) => {
    setOptions(options.map((o) => (o.id === id ? { ...o, name } : o)));
  };

  const addFactor = () => {
    if (factors.length >= 8) {
      toast({ title: "Maximum 8 factors allowed", variant: "destructive" });
      return;
    }
    setFactors([...factors, { id: Date.now().toString(), name: "", weight: 50 }]);
  };

  const removeFactor = (id: string) => {
    if (factors.length <= 2) {
      toast({ title: "Minimum 2 factors required", variant: "destructive" });
      return;
    }
    setFactors(factors.filter((f) => f.id !== id));
  };

  const updateFactor = (id: string, updates: Partial<Factor>) => {
    setFactors(factors.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const validateStep1 = () => {
    if (!title.trim()) {
      toast({ title: "Please enter a decision title", variant: "destructive" });
      return false;
    }
    if (options.some((o) => !o.name.trim())) {
      toast({ title: "Please fill in all options", variant: "destructive" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (factors.some((f) => !f.name.trim())) {
      toast({ title: "Please fill in all factor names", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: "Analysis Complete!",
      description: "Your decision has been analyzed by AI.",
    });
    
    navigate("/result");
  };

  const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors ${
                  s === step
                    ? "bg-primary text-primary-foreground"
                    : s < step
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-secondary-foreground"
                }`}
              >
                {s}
              </div>
              <span className={`hidden sm:block text-sm ${s === step ? "font-medium" : "text-muted-foreground"}`}>
                {s === 1 ? "Options" : s === 2 ? "Factors" : "Review"}
              </span>
              {s < 3 && <div className="w-8 h-0.5 bg-border" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Decision & Options */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Define Your Decision</CardTitle>
                  <CardDescription>
                    What are you trying to decide? Add the options you're considering.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Decision Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Should I accept the job offer at TechCorp?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="context">Context (Optional)</Label>
                    <textarea
                      id="context"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Provide any relevant background information..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Options to Compare</Label>
                      <Button variant="outline" size="sm" onClick={addOption} className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Option
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {options.map((option, index) => (
                        <motion.div
                          key={option.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                            {index + 1}
                          </span>
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option.name}
                            onChange={(e) => updateOption(option.id, e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(option.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tip */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-info/10 text-sm">
                <Lightbulb className="h-5 w-5 text-info shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Tip:</strong> Be specific with your options. 
                  "Accept job at TechCorp" is better than just "New job".
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} className="gap-2">
                  Continue to Factors
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Factors & Weights */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Set Your Priorities</CardTitle>
                  <CardDescription>
                    What factors matter most to you? Adjust the weights to reflect importance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label>Decision Factors</Label>
                    <Button variant="outline" size="sm" onClick={addFactor} className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Factor
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {factors.map((factor) => (
                      <motion.div
                        key={factor.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 p-4 rounded-lg border bg-secondary/30"
                      >
                        <div className="flex items-center gap-3">
                          <Input
                            placeholder="Factor name (e.g., Salary, Work-life balance)"
                            value={factor.name}
                            onChange={(e) => updateFactor(factor.id, { name: e.target.value })}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFactor(factor.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground w-20">Importance:</span>
                          <Slider
                            value={[factor.weight]}
                            onValueChange={(value) => updateFactor(factor.id, { weight: value[0] })}
                            max={100}
                            step={5}
                            className="flex-1"
                          />
                          <span className="w-12 text-right font-medium">{factor.weight}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Weight Summary */}
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Weight Distribution</span>
                      <span className="font-medium">{totalWeight} points</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Weights are relative. Higher values = more important in the analysis.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button onClick={handleNext} className="gap-2">
                  Review Decision
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Analyze */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Decision</CardTitle>
                  <CardDescription>
                    Check your inputs before getting AI recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Decision Summary */}
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Decision</Label>
                    <p className="font-medium">{title}</p>
                    {context && (
                      <p className="text-sm text-muted-foreground">{context}</p>
                    )}
                  </div>

                  {/* Options Summary */}
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Options ({options.length})</Label>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <span
                          key={option.id}
                          className="px-3 py-1.5 rounded-full bg-primary/10 text-sm font-medium text-primary"
                        >
                          {option.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Factors Summary */}
                  <div className="space-y-3">
                    <Label className="text-muted-foreground">Factors ({factors.length})</Label>
                    <div className="space-y-2">
                      {factors.map((factor) => (
                        <div key={factor.id} className="flex items-center justify-between text-sm">
                          <span>{factor.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${factor.weight}%` }}
                              />
                            </div>
                            <span className="w-10 text-right text-muted-foreground">{factor.weight}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Responsible AI Notice */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 text-sm">
                <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Important Reminder</p>
                  <p className="text-muted-foreground mt-1">
                    AI recommendations are meant to support your decision-making, not replace it. 
                    Always consider your unique circumstances and trust your own judgment.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing}
                  className="gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Get AI Recommendation
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
