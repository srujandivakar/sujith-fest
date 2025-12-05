import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  spots: number;
  image: string;
}

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string) => void;
}

export const EventCard = ({ event, onRegister }: EventCardProps) => {
  const categoryColors: Record<string, string> = {
    "Cultural": "bg-mystic/20 text-mystic border-mystic/30",
    "Technical": "bg-primary/20 text-gold border-primary/30",
    "Sports": "bg-ember/20 text-ember border-ember/30",
    "Literary": "bg-gold-light/20 text-gold-light border-gold-light/30",
  };

  return (
    <div className="group magical-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)]">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-display tracking-wider border ${categoryColors[event.category] || categoryColors["Cultural"]}`}
        >
          {event.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-gold mb-2 group-hover:text-gold-light transition-colors">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-gold/70" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-gold/70" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-gold/70" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-gold/70" />
            <span>{event.spots} spots available</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => onRegister(event.id)}
        >
          Register for Event
        </Button>
      </div>
    </div>
  );
};
