import { Users, FileCheck, Settings2, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { OnboardingTimeline } from "@/components/dashboard/OnboardingTimeline";
import { ConfigurationRules } from "@/components/dashboard/ConfigurationRules";
import { RecentEvents } from "@/components/dashboard/RecentEvents";
import { TestingProgress } from "@/components/dashboard/TestingProgress";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-6 py-8">
        {/* Page header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Workflow Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor onboarding workflows, validate configurations, and track testing cycles
          </p>
        </div>
        
        {/* Metrics grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Onboardings"
            value={12}
            subtitle="3 starting this week"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 15, positive: true }}
            delay={0}
          />
          <MetricCard
            title="Documents Pending"
            value={8}
            subtitle="2 require attention"
            icon={<FileCheck className="h-5 w-5" />}
            delay={50}
          />
          <MetricCard
            title="Config Rules"
            value="24/26"
            subtitle="2 validation warnings"
            icon={<Settings2 className="h-5 w-5" />}
            trend={{ value: 4, positive: false }}
            delay={100}
          />
          <MetricCard
            title="Avg. Onboarding Time"
            value="4.2 days"
            subtitle="Target: 5 days"
            icon={<Clock className="h-5 w-5" />}
            trend={{ value: 12, positive: true }}
            delay={150}
          />
        </div>
        
        {/* Quick status */}
        <div className="mb-8 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-4 py-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">All systems operational</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-4 py-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-warning">1 integration needs attention</span>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <OnboardingTimeline />
          <ConfigurationRules />
        </div>
        
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <RecentEvents />
          <TestingProgress />
        </div>
      </main>
    </div>
  );
};

export default Index;