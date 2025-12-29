import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PenTool, CheckSquare } from "lucide-react";
import { NotificationManager } from "./NotificationManager";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/log", label: "Journal", icon: PenTool },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <nav className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border/50 z-50 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-serif font-bold text-xl">
            D
          </div>
          <span className="font-serif font-semibold text-lg hidden md:block tracking-tight">Daily Flow</span>
        </div>

        <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium",
                  isActive 
                    ? "bg-white shadow-sm text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}>
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
           <NotificationManager />
        </div>
      </nav>

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
