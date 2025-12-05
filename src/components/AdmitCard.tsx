import { forwardRef, useMemo, useRef } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toPng } from "html-to-image";
import { CalendarDays, MapPin, User2, ShieldCheck } from "lucide-react";

export interface AdmitEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
}

export interface AdmitPerson {
  name: string;
  usn: string;
  email?: string;
}

interface AdmitCardProps {
  event: AdmitEvent;
  person: AdmitPerson;
}

const BORDER_GRAD =
  "linear-gradient(145deg, hsl(280 70% 60% / 0.8), hsl(190 80% 60% / 0.8), hsl(43 74% 49% / 0.9))";

export const AdmitCard = ({ event, person }: AdmitCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const payload = useMemo(() => {
    return JSON.stringify({
      v: 1,
      type: "arcanum.admit",
      event: { id: event.id, title: event.title, date: event.date, time: event.time, venue: event.venue },
      person: { name: person.name, usn: person.usn, email: person.email },
      issuedAt: new Date().toISOString(),
    });
  }, [event, person]);

  const download = async () => {
    if (!ref.current) return;
    const dataUrl = await toPng(ref.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#0b1020",
    });
    const link = document.createElement("a");
    const safeName = `${event.title.replace(/\s+/g, "_")}-${person.usn}`;
    link.download = `${safeName}-admit.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex w-full justify-center">
      <Card
        ref={ref}
        className="w-full max-w-md rounded-2xl p-0 overflow-hidden magical-border"
        style={{
          boxShadow: "0 0 40px hsl(43 74% 49% / 0.25)",
          background: "hsl(var(--midnight) / 0.8)",
          border: "1px solid hsl(var(--gold)/0.3)",
        }}
      >
        <div
          className="p-[2px]"
          style={{ background: BORDER_GRAD }}
        >
          <div className="rounded-[14px] p-5 bg-background/95">
            <div className="text-center mb-3">
              <p className="font-display tracking-widest text-xs text-gold/80">OFFICIAL TICKET</p>
              <h2 className="font-display text-2xl tracking-wider text-gradient-gold">INTERFEST 2025</h2>
            </div>

            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <ShieldCheck className="w-4 h-4 text-gold" />
                  <span className="font-display tracking-wider">Event: </span>
                  <span className="opacity-90">{event.title}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CalendarDays className="w-4 h-4 text-gold" />
                  <span className="font-display tracking-wider">Date:</span>
                  <span className="opacity-90">{event.date}, {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="font-display tracking-wider">Venue:</span>
                  <span className="opacity-90">{event.venue}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center">
                <div className="p-2 rounded-xl border border-gold/20 bg-background/60 magical-glow">
                  <div className="p-3 rounded-lg bg-background">
                    <QRCode value={payload} size={180} fgColor="#EDE3C8" bgColor="transparent" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1 pt-2 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <User2 className="w-4 h-4 text-gold" />
                  <span className="font-display tracking-wider">Name student</span>
                  <span className="ml-auto opacity-90">{person.name}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <span className="font-display tracking-wider">USN</span>
                  <span className="ml-auto opacity-90">{person.usn}</span>
                </div>
              </div>

              <div className="pt-3">
                <Button onClick={download} variant="outline" className="w-full font-display tracking-wider">
                  Download
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdmitCard;
