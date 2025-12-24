import { Check, Clock, AlertCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending" | "error";
  timestamp: string;
  employee?: string;
}

const events: TimelineEvent[] = [
  {
    id: "1",
    title: "Pre-boarding Initiated",
    description: "Welcome email sent, documents requested",
    status: "completed",
    timestamp: "Dec 20, 2024 • 9:00 AM",
    employee: "Sarah Chen"
  },
  {
    id: "2",
    title: "Document Collection",
    description: "ID verification, tax forms, background check consent",
    status: "completed",
    timestamp: "Dec 21, 2024 • 2:30 PM",
    employee: "Sarah Chen"
  },
  {
    id: "3",
    title: "IT Provisioning",
    description: "Equipment ordered, accounts created, access configured",
    status: "in-progress",
    timestamp: "Dec 23, 2024 • 10:15 AM",
    employee: "Sarah Chen"
  },
  {
    id: "4",
    title: "Compliance Training",
    description: "Security awareness, policy acknowledgment",
    status: "pending",
    timestamp: "Scheduled: Dec 26, 2024",
    employee: "Sarah Chen"
  },
  {
    id: "5",
    title: "Manager Introduction",
    description: "Team meeting, role overview, 30-60-90 plan",
    status: "pending",
    timestamp: "Scheduled: Dec 27, 2024",
    employee: "Sarah Chen"
  }
];

const statusConfig = {
  completed: {
    icon: Check,
    color: "text-success",
    bg: "bg-success/10",
    border: "border-success/30"
  },
  "in-progress": {
    icon: Clock,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30"
  },
  pending: {
    icon: Clock,
    color: "text-muted-foreground",
    bg: "bg-muted",
    border: "border-border"
  },
  error: {
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30"
  }
};

export function OnboardingTimeline() {
  const handleEmployeeClick = () => {
    toast.info("Sarah Chen", {
      description: "Software Engineer • Engineering Team",
      action: {
        label: "View Profile",
        onClick: () => toast.success("Opening employee profile..."),
      },
    });
  };

  const handleEventClick = (event: TimelineEvent) => {
    if (event.status === "completed") {
      toast.success(event.title, {
        description: `Completed on ${event.timestamp}`,
      });
    } else if (event.status === "in-progress") {
      toast.info(event.title, {
        description: event.description,
        action: {
          label: "View Details",
          onClick: () => toast.info("Opening task details..."),
        },
      });
    } else if (event.status === "pending") {
      toast.info(event.title, {
        description: event.timestamp,
      });
    } else {
      toast.error(event.title, {
        description: "Action required",
        action: {
          label: "Resolve",
          onClick: () => toast.success("Opening resolution wizard..."),
        },
      });
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Onboarding Lifecycle</h2>
          <p className="text-sm text-muted-foreground">Track employee onboarding progress</p>
        </div>
        <button 
          onClick={handleEmployeeClick}
          className="flex items-center gap-2 rounded-full bg-accent px-3 py-1 hover:bg-accent/80 transition-colors cursor-pointer"
        >
          <User className="h-4 w-4 text-accent-foreground" />
          <span className="text-sm font-medium text-accent-foreground">Sarah Chen</span>
        </button>
      </div>
      
      <div className="relative space-y-0">
        {events.map((event, index) => {
          const config = statusConfig[event.status];
          const Icon = config.icon;
          const isLast = index === events.length - 1;
          
          return (
            <div 
              key={event.id} 
              className="relative flex gap-4 cursor-pointer group"
              onClick={() => handleEventClick(event)}
            >
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-[19px] top-10 h-[calc(100%-8px)] w-0.5 bg-border" />
              )}
              
              {/* Icon */}
              <div className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-110",
                config.bg,
                config.border
              )}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <span className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                    config.bg,
                    config.color
                  )}>
                    {event.status.replace("-", " ")}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{event.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}