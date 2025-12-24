import { Activity, UserPlus, FileCheck, Settings2, Shield, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Event {
  id: string;
  type: "onboarding" | "document" | "config" | "security" | "notification";
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

const events: Event[] = [
  {
    id: "1",
    type: "onboarding",
    title: "New hire onboarding started",
    description: "Sarah Chen added to Engineering team",
    timestamp: "5 min ago",
    user: "System"
  },
  {
    id: "2",
    type: "document",
    title: "Documents approved",
    description: "Background check completed for Michael Torres",
    timestamp: "23 min ago",
    user: "HR Admin"
  },
  {
    id: "3",
    type: "config",
    title: "Workflow updated",
    description: "IT provisioning checklist modified",
    timestamp: "1 hour ago",
    user: "Admin"
  },
  {
    id: "4",
    type: "security",
    title: "Access granted",
    description: "Marketing portal access for new team members",
    timestamp: "2 hours ago",
    user: "IT Security"
  },
  {
    id: "5",
    type: "notification",
    title: "Reminder sent",
    description: "Pending document completion notification",
    timestamp: "3 hours ago",
    user: "System"
  }
];

const typeConfig: Record<Event["type"], { icon: typeof Activity; color: string; bg: string }> = {
  onboarding: { icon: UserPlus, color: "text-primary", bg: "bg-primary/10" },
  document: { icon: FileCheck, color: "text-success", bg: "bg-success/10" },
  config: { icon: Settings2, color: "text-warning", bg: "bg-warning/10" },
  security: { icon: Shield, color: "text-accent-foreground", bg: "bg-accent" },
  notification: { icon: Mail, color: "text-muted-foreground", bg: "bg-muted" }
};

export function RecentEvents() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Activity className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">Latest system events and actions</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => {
          const config = typeConfig[event.type];
          const Icon = config.icon;
          
          return (
            <div 
              key={event.id}
              className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent/50"
            >
              <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", config.bg)}>
                <Icon className={cn("h-4 w-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-foreground truncate">{event.title}</h3>
                  <span className="shrink-0 text-xs text-muted-foreground">{event.timestamp}</span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground truncate">{event.description}</p>
                {event.user && (
                  <p className="mt-1 text-xs text-muted-foreground">by {event.user}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}