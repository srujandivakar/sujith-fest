import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, CalendarDays, Megaphone, Castle } from "lucide-react";

// Dummy data (admin-driven later)
const zones = [
  { id: "great-hall", name: "Great Hall", description: "Opening ceremony, feasts, and awards.", coords: { x: 25, y: 35 }, theme: "gold" },
  { id: "quidditch-pitch", name: "Quidditch Pitch", description: "Sports & field events.", coords: { x: 70, y: 20 }, theme: "ember" },
  { id: "library-arcana", name: "Library of Arcana", description: "Workshops, talks, and quizzes.", coords: { x: 40, y: 65 }, theme: "mystic" },
  { id: "potions-lab", name: "Potions Lab", description: "Maker booths & experiments.", coords: { x: 15, y: 75 }, theme: "gold-light" },
];

const schedule = [
  { time: "10:00", title: "Opening Spell & Welcome", stage: "Great Hall" },
  { time: "11:30", title: "Charms Workshop", stage: "Library of Arcana" },
  { time: "13:00", title: "Magical Feast", stage: "Great Hall" },
  { time: "15:00", title: "Quidditch Scrimmage", stage: "Quidditch Pitch" },
  { time: "17:30", title: "Awards & Closing", stage: "Great Hall" },
];

const venues = [
  { name: "Great Hall", category: "Ceremony", blurb: "Grand gatherings with glowing candles and banners.", tag: "gold" },
  { name: "Quidditch Pitch", category: "Sports", blurb: "Broomsticks optional; cheers guaranteed.", tag: "ember" },
  { name: "Library of Arcana", category: "Workshop", blurb: "Ancient tomes, modern minds.", tag: "mystic" },
  { name: "Potions Lab", category: "Maker", blurb: "Brews, bubbles, and curiosities.", tag: "gold-light" },
];

const announcements = [
  { title: "Feast seating opens at 12:45", level: "info" },
  { title: "Quidditch scrimmage moved to 15:15", level: "warning" },
  { title: "Workshop slots limited—arrive early", level: "info" },
];

const tokenToClass = (token: string) => {
  switch (token) {
    case "gold":
      return "bg-gold";
    case "gold-light":
      return "bg-gold-light";
    case "ember":
      return "bg-ember";
    case "mystic":
      return "bg-mystic";
    default:
      return "bg-gold";
  }
};

const MagicalMap = () => {
  return (
    <div className="relative w-full h-[420px] rounded-xl parchment-bg magical-border overflow-hidden">
      {/* Stylized castle silhouette */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ background: "var(--gradient-card)" }} />

      {zones.map((z) => (
        <div
          key={z.id}
          className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-md backdrop-blur-md border border-border text-foreground magical-glow hover:animate-glow-pulse`}
          style={{
            left: `${z.coords.x}%`,
            top: `${z.coords.y}%`,
            background: "hsl(var(--midnight-light) / 0.6)",
          }}
        >
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4`} style={{ color: `hsl(var(--${z.theme}))` }} />
            <span className="font-display tracking-wider">{z.name}</span>
          </div>
          <Separator className="my-2 opacity-30" />
          <p className="text-sm text-muted-foreground max-w-[220px]">{z.description}</p>
        </div>
      ))}

      {/* Decorative floating orbs */}
      <div className="absolute top-6 left-6 w-2 h-2 bg-gold rounded-full floating opacity-60" />
      <div className="absolute bottom-10 right-10 w-3 h-3 bg-mystic rounded-full floating opacity-40" />
    </div>
  );
};

const Navigator = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="mb-8 text-center animate-fade-in-up">
        <h1 className="font-display text-4xl md:text-5xl text-gradient-gold tracking-wider mb-2">Fest Navigator</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A magical guide through the festival—map, schedule, venues, and announcements.
        </p>
      </div>

      <Tabs defaultValue="map" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="map" className="font-display tracking-wider"><Castle className="w-4 h-4 mr-2" />Map</TabsTrigger>
          <TabsTrigger value="schedule" className="font-display tracking-wider"><CalendarDays className="w-4 h-4 mr-2" />Schedule</TabsTrigger>
          <TabsTrigger value="venues" className="font-display tracking-wider"><MapPin className="w-4 h-4 mr-2" />Venues</TabsTrigger>
          <TabsTrigger value="announcements" className="font-display tracking-wider"><Megaphone className="w-4 h-4 mr-2" />Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card className="magical-border">
            <CardHeader>
              <CardTitle className="font-display tracking-wider">Enchanted Grounds</CardTitle>
            </CardHeader>
            <CardContent>
              <MagicalMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="magical-border">
            <CardHeader>
              <CardTitle className="font-display tracking-wider">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schedule.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-md border border-border backdrop-blur-md"
                       style={{ background: "hsl(var(--midnight-light) / 0.5)" }}>
                    <div className="flex items-center justify-between">
                      <span className="font-display tracking-wider text-gold">{s.time}</span>
                      <Badge variant="outline" className="font-display tracking-wider">{s.stage}</Badge>
                    </div>
                    <p className="mt-2 text-foreground">{s.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="venues" className="space-y-4">
          <Card className="magical-border">
            <CardHeader>
              <CardTitle className="font-display tracking-wider">Venue Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Input placeholder="Search venues..." className="font-body" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venues.map((v, idx) => (
                  <div key={idx} className="p-4 rounded-md border border-border magical-glow"
                       style={{ background: "hsl(var(--midnight-light) / 0.5)" }}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display tracking-wider">{v.name}</h3>
                      <Badge variant="outline" className="font-display tracking-wider">{v.category}</Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">{v.blurb}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card className="magical-border">
            <CardHeader>
              <CardTitle className="font-display tracking-wider">Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.map((a, idx) => (
                <div key={idx} className="p-4 rounded-md border border-border"
                     style={{ background: "hsl(var(--midnight-light) / 0.5)" }}>
                  <p className="font-display tracking-wider">{a.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Navigator;
