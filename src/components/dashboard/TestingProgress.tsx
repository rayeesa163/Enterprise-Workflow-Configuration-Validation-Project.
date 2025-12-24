import { FlaskConical, Play, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";

interface TestCase {
  id: string;
  name: string;
  status: "passed" | "failed" | "running" | "pending";
  duration?: string;
}

const initialTestCases: TestCase[] = [
  { id: "1", name: "Pre-boarding email trigger", status: "passed", duration: "1.2s" },
  { id: "2", name: "Document upload validation", status: "passed", duration: "0.8s" },
  { id: "3", name: "Approval workflow routing", status: "passed", duration: "2.1s" },
  { id: "4", name: "IT provisioning automation", status: "running" },
  { id: "5", name: "Access permission assignment", status: "pending" },
  { id: "6", name: "Compliance training assignment", status: "pending" },
  { id: "7", name: "Manager notification delivery", status: "pending" },
  { id: "8", name: "Day-1 checklist generation", status: "pending" }
];

const statusConfig: Record<TestCase["status"], { icon: typeof CheckCircle2 | null; color: string; bg: string; animate?: boolean }> = {
  passed: { icon: CheckCircle2, color: "text-success", bg: "bg-success" },
  failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive" },
  running: { icon: Loader2, color: "text-primary", bg: "bg-primary", animate: true },
  pending: { icon: null, color: "text-muted-foreground", bg: "bg-muted" }
};

export function TestingProgress() {
  const [testCases, setTestCases] = useState(initialTestCases);
  const [isRunning, setIsRunning] = useState(false);

  const passed = testCases.filter(t => t.status === "passed").length;
  const total = testCases.length;
  const percentage = Math.round((passed / total) * 100);

  const runTests = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    toast.info("Running tests...", { description: "Starting test suite" });

    // Reset pending tests
    setTestCases(prev => prev.map(t => 
      t.status === "pending" || t.status === "failed" ? { ...t, status: "pending" as const, duration: undefined } : t
    ));

    let currentIndex = testCases.findIndex(t => t.status === "pending" || t.status === "running");
    if (currentIndex === -1) currentIndex = 0;

    const runNextTest = (index: number) => {
      if (index >= testCases.length) {
        setIsRunning(false);
        const finalPassed = testCases.filter(t => t.status === "passed").length;
        toast.success("Tests completed!", { 
          description: `${finalPassed}/${total} tests passed` 
        });
        return;
      }

      // Set current test to running
      setTestCases(prev => prev.map((t, i) => 
        i === index ? { ...t, status: "running" as const } : t
      ));

      // Complete after random delay
      const duration = (Math.random() * 2 + 0.5).toFixed(1);
      setTimeout(() => {
        const passed = Math.random() > 0.15; // 85% pass rate
        setTestCases(prev => prev.map((t, i) => 
          i === index ? { 
            ...t, 
            status: passed ? "passed" as const : "failed" as const,
            duration: `${duration}s`
          } : t
        ));
        runNextTest(index + 1);
      }, parseFloat(duration) * 1000);
    };

    runNextTest(currentIndex);
  };

  const handleTestClick = (test: TestCase) => {
    if (test.status === "passed") {
      toast.success(test.name, { description: `Completed in ${test.duration}` });
    } else if (test.status === "failed") {
      toast.error(test.name, { 
        description: "Test failed - click to view details",
        action: {
          label: "Retry",
          onClick: () => {
            setTestCases(prev => prev.map(t => 
              t.id === test.id ? { ...t, status: "pending" as const, duration: undefined } : t
            ));
            toast.info("Test queued for retry");
          }
        }
      });
    } else if (test.status === "running") {
      toast.info(test.name, { description: "Test is currently running..." });
    } else {
      toast.info(test.name, { description: "Test pending - run tests to execute" });
    }
  };
  
  return (
    <div className="rounded-lg border border-border bg-card p-6 animate-slide-up" style={{ animationDelay: "500ms" }}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <FlaskConical className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Testing Cycle</h2>
            <p className="text-sm text-muted-foreground">Workflow validation tests</p>
          </div>
        </div>
        <button 
          onClick={runTests}
          disabled={isRunning}
          className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          {isRunning ? "Running..." : "Run All"}
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">{passed}/{total} tests passed</span>
          <span className="text-sm text-muted-foreground">{percentage}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div 
            className="h-full rounded-full bg-success transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      
      {/* Test list */}
      <div className="space-y-2">
        {testCases.map((test) => {
          const config = statusConfig[test.status];
          const Icon = config.icon;
          
          return (
            <div 
              key={test.id}
              onClick={() => handleTestClick(test)}
              className="flex items-center justify-between rounded-lg border border-border px-4 py-3 transition-colors hover:bg-accent/50 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full",
                  test.status === "pending" ? "border-2 border-border" : config.bg
                )}>
                  {Icon && (
                    <Icon className={cn(
                      "h-3.5 w-3.5",
                      test.status === "pending" ? "" : "text-primary-foreground",
                      config.animate && "animate-spin"
                    )} />
                  )}
                </div>
                <span className={cn(
                  "text-sm font-medium",
                  test.status === "pending" ? "text-muted-foreground" : "text-foreground"
                )}>
                  {test.name}
                </span>
              </div>
              {test.duration && (
                <span className="text-xs text-muted-foreground">{test.duration}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}