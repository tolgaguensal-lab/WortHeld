"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { DtzSpeakingOverview, DtzSpeakingPractice } from "@/components/dtz/DtzSpeakingPractice";
import type { DtzScenario } from "@/components/dtz/DtzSpeakingPractice";

export default function SpeakingPage() {
  const [selectedScenario, setSelectedScenario] = useState<DtzScenario | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <PageHeader
        title="Sprechen üben"
        description="Bereite dich auf die mündliche DTZ-Prüfung vor — mit realistischen Rollenspielen und Sprechübungen."
      />

      {selectedScenario ? (
        <DtzSpeakingPractice
          scenario={selectedScenario}
          onComplete={() => setSelectedScenario(null)}
        />
      ) : (
        <DtzSpeakingOverview onSelectScenario={setSelectedScenario} />
      )}
    </div>
  );
}
