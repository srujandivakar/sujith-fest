import { Link } from "react-router-dom";
import { MagicalParticles } from "@/components/MagicalParticles";
import { Button } from "@/components/ui/button";
import { Home, Sparkles } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <MagicalParticles />
      
      <div className="relative z-10 text-center px-4 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border border-primary/30 mb-6 floating">
          <Sparkles className="w-12 h-12 text-gold" />
        </div>
        
        <h1 className="font-display text-6xl md:text-8xl text-gradient-gold mb-4">
          404
        </h1>
        
        <h2 className="font-display text-2xl md:text-3xl text-gold mb-4">
          Portal Not Found
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The magical pathway you seek has vanished into the mist. Perhaps it was never meant to be discovered...
        </p>
        
        <Link to="/">
          <Button variant="magical" size="lg">
            <Home className="w-5 h-5 mr-2" />
            Return to the Main Portal
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
