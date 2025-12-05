import { useState } from "react";
import { MagicalParticles } from "@/components/MagicalParticles";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Sparkles, School, Users, Send } from "lucide-react";

const events = [
  "Wizard's Duel - Coding Competition",
  "Enchanted Evening - Cultural Night",
  "Quidditch Championship",
  "Spellbound Debate",
  "Potion Brewing - Science Exhibition",
  "Mystic Music Battle",
];

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    collegeName: "",
    contactPerson: "",
    email: "",
    phone: "",
    teamSize: "",
    specialRequirements: "",
  });

  const handleEventToggle = (event: string) => {
    setSelectedEvents((prev) =>
      prev.includes(event)
        ? prev.filter((e) => e !== event)
        : [...prev, event]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.collegeName || !formData.email || selectedEvents.length === 0) {
      toast.error("Please fill in all required fields and select at least one event");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Registration scroll submitted successfully!", {
      description: "We'll send an owl with confirmation details soon.",
      icon: <Sparkles className="w-4 h-4 text-gold" />,
    });

    setFormData({
      collegeName: "",
      contactPerson: "",
      email: "",
      phone: "",
      teamSize: "",
      specialRequirements: "",
    });
    setSelectedEvents([]);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen relative">
      <MagicalParticles />
      <Navbar />

      <main className="relative z-10 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-4">
              <School className="w-8 h-8 text-gold" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-gradient-gold mb-4">
              College Registration
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Register your institution for the grandest magical festival. Fill the enchanted scroll below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="magical-border rounded-2xl p-6 md:p-10 bg-card/50 backdrop-blur-sm animate-fade-in-up delay-100">
            <div className="space-y-6">
              {/* College Details */}
              <div className="space-y-4">
                <h3 className="font-display text-xl text-gold flex items-center gap-2">
                  <School className="w-5 h-5" />
                  Institution Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="collegeName" className="text-foreground">
                      College Name *
                    </Label>
                    <Input
                      id="collegeName"
                      placeholder="Enter your college name"
                      value={formData.collegeName}
                      onChange={(e) =>
                        setFormData({ ...formData, collegeName: e.target.value })
                      }
                      className="bg-input border-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamSize" className="text-foreground">
                      Expected Delegation Size
                    </Label>
                    <Select
                      value={formData.teamSize}
                      onValueChange={(value) =>
                        setFormData({ ...formData, teamSize: value })
                      }
                    >
                      <SelectTrigger className="bg-input border-primary/30">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 members</SelectItem>
                        <SelectItem value="11-25">11-25 members</SelectItem>
                        <SelectItem value="26-50">26-50 members</SelectItem>
                        <SelectItem value="50+">50+ members</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="space-y-4">
                <h3 className="font-display text-xl text-gold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Contact Person
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="contactPerson"
                      placeholder="Contact person name"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        setFormData({ ...formData, contactPerson: e.target.value })
                      }
                      className="bg-input border-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="owlmail@college.edu"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-input border-primary/30"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-input border-primary/30"
                    />
                  </div>
                </div>
              </div>

              {/* Event Selection */}
              <div className="space-y-4">
                <h3 className="font-display text-xl text-gold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Select Events *
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {events.map((event) => (
                    <label
                      key={event}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-input/50 hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedEvents.includes(event)}
                        onCheckedChange={() => handleEventToggle(event)}
                        className="border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <span className="text-sm text-foreground">{event}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-foreground">
                  Special Requirements or Messages
                </Label>
                <Textarea
                  id="requirements"
                  placeholder="Any special accommodations, dietary requirements, or messages for the organizing committee..."
                  value={formData.specialRequirements}
                  onChange={(e) =>
                    setFormData({ ...formData, specialRequirements: e.target.value })
                  }
                  className="bg-input border-primary/30 min-h-[100px]"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="magical"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Sending Registration Owl...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Registration
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
