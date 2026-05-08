import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function NewsletterCTA({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-muted/30 ${compact ? "p-5" : "p-8"} text-center`}>
      <Mail className="h-6 w-6 text-brand mx-auto" />
      <h3 className="font-display text-2xl font-black uppercase mt-2">Join the Squad</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
        Subscribe for exclusive deals, restock alerts and supplement guides.
      </p>
      <form
        className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input type="email" required placeholder="you@email.com" className="flex-1" />
        <Button type="submit" className="bg-brand hover:bg-brand-dark text-brand-foreground font-bold uppercase">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
