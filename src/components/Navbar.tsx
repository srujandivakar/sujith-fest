import { Link, useLocation } from "react-router-dom";
import { Sparkles, Calendar, Users, Home, Compass, Wand } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Portal", icon: Home },
  { path: "/events", label: "Events", icon: Calendar },
  { path: "/navigate", label: "Navigator", icon: Compass },
  { path: "/register", label: "Register", icon: Users },
];

export const Navbar = () => {
  const location = useLocation();
  const [lumosOn, setLumosOn] = useState<boolean>(() => {
    const v = localStorage.getItem("wand-light");
    return v === "on";
  });

  useEffect(() => {
    localStorage.setItem("wand-light", lumosOn ? "on" : "off");
    const evt = new CustomEvent("wand-light-toggle", { detail: { on: lumosOn } });
    window.dispatchEvent(evt);
  }, [lumosOn]);

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
            <button
              type="button"
              aria-label={lumosOn ? "Turn wand light off" : "Turn wand light on"}
              onClick={() => setLumosOn(!lumosOn)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md font-display text-sm tracking-wider transition-all duration-300 mr-1",
                lumosOn
                  ? "bg-primary/20 text-gold border border-primary/30"
                  : "text-muted-foreground hover:text-gold hover:bg-primary/10"
              )}
            >
              <Wand className="w-4 h-4" />
              <span className="hidden sm:inline">Lumos</span>
            </button>
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
