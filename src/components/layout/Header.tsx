import { Bell, Search, User, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <span className="text-lg font-bold text-primary-foreground">W</span>
            </div>
            <span className="text-xl font-semibold text-foreground">WorkflowOS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-foreground transition-colors hover:text-primary">Dashboard</a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Workflows</a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Employees</a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Reports</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search..."
              className="w-40 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="hidden lg:inline-flex items-center rounded border border-border bg-background px-1.5 text-xs text-muted-foreground">⌘K</kbd>
          </div>
          
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">3</span>
          </button>
          
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-accent">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
            <User className="h-4 w-4 text-accent-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}