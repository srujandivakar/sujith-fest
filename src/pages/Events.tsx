import { useState } from "react";
import { MagicalParticles } from "@/components/MagicalParticles";
import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Sparkles, Filter } from "lucide-react";

const events = [
  {
    id: "1",
    title: "Wizard's Duel - Coding Competition",
    description: "Battle through algorithmic challenges in this mystical coding showdown. Wands ready, keyboards set!",
    date: "March 15, 2024",
    time: "10:00 AM - 6:00 PM",
    venue: "The Great Hall (Lab 101)",
    category: "Technical",
    spots: 120,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Enchanted Evening - Cultural Night",
    description: "A magical evening of dance, music, and theatrical performances from realms across the land.",
    date: "March 16, 2024",
    time: "6:00 PM - 11:00 PM",
    venue: "Amphitheatre of Wonders",
    category: "Cultural",
    spots: 500,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Quidditch Championship",
    description: "Teams from all houses compete in this legendary aerial sport. May the best seekers win!",
    date: "March 17, 2024",
    time: "9:00 AM - 5:00 PM",
    venue: "The Enchanted Grounds",
    category: "Sports",
    spots: 80,
    image: "https://images.unsplash.com/photo-1461896836934- voices-in-sports?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Spellbound Debate",
    description: "Engage in intellectual discourse on matters of magic and mundane. Words sharper than wands!",
    date: "March 15, 2024",
    time: "2:00 PM - 5:00 PM",
    venue: "Chamber of Rhetoric",
    category: "Literary",
    spots: 60,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Potion Brewing - Science Exhibition",
    description: "Witness extraordinary experiments and innovations from the brightest minds in magical sciences.",
    date: "March 16, 2024",
    time: "10:00 AM - 4:00 PM",
    venue: "Alchemy Labs",
    category: "Technical",
    spots: 200,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Mystic Music Battle",
    description: "Bands compete in an epic battle of musical sorcery. Let the enchanting melodies begin!",
    date: "March 17, 2024",
    time: "7:00 PM - 11:00 PM",
    venue: "The Resonance Arena",
    category: "Cultural",
    spots: 300,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
  },
];

const categories = ["All", "Cultural", "Technical", "Sports", "Literary"];

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  const handleRegister = (eventId: string) => {
    const event = events.find((e) => e.id === eventId);
    toast.success(`Registration initiated for ${event?.title}`, {
      description: "Proceed to the registration portal to complete enrollment.",
      icon: <Sparkles className="w-4 h-4 text-gold" />,
    });
  };

  return (
    <div className="min-h-screen relative">
      <MagicalParticles />
      <Navbar />

      <main className="relative z-10 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="font-display text-4xl md:text-5xl text-gradient-gold mb-4">
              Magical Events
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover enchanting competitions, performances, and gatherings awaiting you at Arcanum Fest
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fade-in-up delay-100">
            <Filter className="w-5 h-5 text-gold mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "magical" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard event={event} onRegister={handleRegister} />
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No events found in this category. The magic awaits elsewhere...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Events;
