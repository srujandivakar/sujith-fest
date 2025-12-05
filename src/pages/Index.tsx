import { MagicalParticles } from "@/components/MagicalParticles";
import { EntryPortal } from "@/components/EntryPortal";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MagicalParticles />
      <Navbar />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-gradient-gold mb-4 tracking-wider">
            Arcanum Fest 2024
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-body max-w-2xl mx-auto">
            Where magic meets academia. Enter the enchanted realm of collegiate celebration and wonder.
          </p>
        </div>

        <EntryPortal />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-muted-foreground text-sm font-display tracking-widest">
          ✦ The Grand Magical College Festival ✦
        </p>
        </div>
      </main>

      {/* Decorative elements */}
      <div className="fixed top-1/4 left-10 w-2 h-2 bg-gold rounded-full floating opacity-60" style={{ animationDelay: "0s" }} />
      <div className="fixed top-1/3 right-20 w-3 h-3 bg-mystic rounded-full floating opacity-40" style={{ animationDelay: "1s" }} />
      <div className="fixed bottom-1/4 left-1/4 w-2 h-2 bg-gold-light rounded-full floating opacity-50" style={{ animationDelay: "2s" }} />
      <div className="fixed top-2/3 right-1/4 w-2 h-2 bg-ember rounded-full floating opacity-40" style={{ animationDelay: "3s" }} />
    </div>
  );
};

export default Index;
