import { CheckCircle2, XCircle, AlertTriangle, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ConfigRule {
  id: string;
  name: string;
  category: string;
  status: "valid" | "invalid" | "warning";
  lastValidated: string;
  description: string;
}

const rules: ConfigRule[] = [
  {
    id: "1",
    name: "Email Template Configuration",
    category: "Communications",
    status: "valid",
    lastValidated: "2 hours ago",
    description: "Welcome and notification templates configured"
  },
  {
    id: "2",
    name: "Approval Workflow Chain",
    category: "Workflows",
    status: "valid",
    lastValidated: "4 hours ago",
    description: "Multi-level approval routing for new hires"
  },
  {
    id: "3",
    name: "Role-Based Access Rules",
    category: "Security",
    status: "warning",
    lastValidated: "1 day ago",
    description: "3 roles pending access review"
  },
  {
    id: "4",
    name: "Data Retention Policy",
    category: "Compliance",
    status: "valid",
    lastValidated: "5 hours ago",
    description: "90-day retention for temporary data"
  },
  {
    id: "5",
    name: "Integration Endpoints",
    category: "Integrations",
    status: "invalid",
    lastValidated: "30 minutes ago",
    description: "HRIS sync endpoint unreachable"
  },
  {
    id: "6",
    name: "Document Templates",
    category: "Documents",
    status: "valid",
    lastValidated: "3 hours ago",
    description: "Offer letters, contracts, NDA templates"
  }
];

const statusConfig = {
  valid: {
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    label: "Valid"
  },
  invalid: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Invalid"
  },
  warning: {
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    label: "Warning"
  }
};

export function ConfigurationRules() {
  const validCount = rules.filter(r => r.status === "valid").length;
  const totalCount = rules.length;

  const handleViewAll = () => {
    toast.info("Configuration Rules", {
      description: `Viewing all ${totalCount} configuration rules`,
    });
  };

  const handleRuleClick = (rule: ConfigRule) => {
    if (rule.status === "invalid") {
      toast.error(`${rule.name}`, {
        description: rule.description,
        action: {
          label: "Fix Now",
          onClick: () => toast.success("Opening fix wizard..."),
        },
      });
    } else if (rule.status === "warning") {
      toast.warning(`${rule.name}`, {
        description: rule.description,
        action: {
          label: "Review",
          onClick: () => toast.info("Opening review panel..."),
        },
      });
    } else {
      toast.success(`${rule.name}`, {
        description: `Last validated: ${rule.lastValidated}`,
      });
    }
  };
  
  return (
    <div className="rounded-lg border border-border bg-card p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Settings className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Configuration Rules</h2>
            <p className="text-sm text-muted-foreground">{validCount}/{totalCount} rules passing validation</p>
          </div>
        </div>
        <button 
          onClick={handleViewAll}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-primary hover:bg-accent transition-colors"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {rules.map((rule) => {
          const config = statusConfig[rule.status];
          const Icon = config.icon;
          
          return (
            <div 
              key={rule.id}
              onClick={() => handleRuleClick(rule)}
              className="group flex items-center justify-between rounded-lg border border-border p-4 transition-all hover:border-primary/20 hover:bg-accent/50 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", config.bg)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{rule.name}</h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{rule.category}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{rule.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={cn("text-sm font-medium", config.color)}>{config.label}</span>
                <p className="text-xs text-muted-foreground">{rule.lastValidated}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}