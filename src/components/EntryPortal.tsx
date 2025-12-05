import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Key, Sparkles } from "lucide-react";
import { toast } from "sonner";

const MAGIC_PASSWORD = "lumos2024";

export const EntryPortal = () => {
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (password.toLowerCase() === MAGIC_PASSWORD) {
      toast.success("Portal unlocked! Welcome to Arcanum Fest", {
        icon: <Sparkles className="w-4 h-4 text-gold" />,
      });
      localStorage.setItem("fest_access", "granted");
      navigate("/events");
    } else {
      toast.error("Invalid incantation. The portal remains sealed.");
    }
    setIsVerifying(false);
  };

  const handleQRScan = () => {
    toast.info("Point your wand at the QR code to enter", {
      description: "QR scanning coming soon...",
    });
  };

  return (
    <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in-up">
      <div className="relative">
        <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full animate-glow-pulse" />
        <div className="relative magical-border rounded-2xl p-8 md:p-12 bg-card/50 backdrop-blur-sm max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 border border-primary/30 mb-4 floating">
              <Sparkles className="w-10 h-10 text-gold" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl text-gold mb-2">
              Enter the Realm
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose your path to unlock the magical gates
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="magical"
              size="xl"
              className="w-full"
              onClick={handleQRScan}
            >
              <QrCode className="w-5 h-5 mr-2" />
              Scan QR Portal
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-sm font-display">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {!showPasswordInput ? (
              <Button
                variant="outline"
                size="xl"
                className="w-full"
                onClick={() => setShowPasswordInput(true)}
              >
                <Key className="w-5 h-5 mr-2" />
                Enter Secret Incantation
              </Button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Speak the secret words..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-input border-primary/30 text-foreground placeholder:text-muted-foreground h-12 font-body text-lg pr-12"
                    autoFocus
                  />
                  <Key className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <Button
                  type="submit"
                  variant="portal"
                  size="xl"
                  className="w-full"
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Casting Spell...
                    </>
                  ) : (
                    "Unlock Portal"
                  )}
                </Button>
              </form>
            )}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            Hint: The light-bringing spell of 2024
          </p>
        </div>
      </div>
    </div>
  );
};
