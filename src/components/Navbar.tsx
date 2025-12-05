import { Link, useLocation } from "react-router-dom";
import { Sparkles, Calendar, Users, Home, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Portal", icon: Home },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/navigate", label: "Navigator", icon: Compass },
  { path: "/register", label: "Register", icon: Users },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-gold group-hover:animate-pulse" />
            <span className="font-display text-xl tracking-wider text-gold">
              Arcanum Fest
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md font-display text-sm tracking-wider transition-all duration-300",
                    isActive
                      ? "bg-primary/20 text-gold border border-primary/30"
                      : "text-muted-foreground hover:text-gold hover:bg-primary/10"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
