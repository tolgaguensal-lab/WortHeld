import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageHeader";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card variant="elevated" className="max-w-sm w-full p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12v.01" />
          </svg>
        </div>
        <h2 className="text-xl font-display font-semibold text-foreground mb-2">Du bist offline</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Keine Internetverbindung. Bereits besuchte Lektionen und Vokabeln sind weiterhin verfügbar.
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>✓ Vokabeln wiederholen</p>
          <p>✓ Bereits geladene Lektionen</p>
          <p>✓ Grammatik nachlesen</p>
        </div>
      </Card>
    </div>
  );
}
