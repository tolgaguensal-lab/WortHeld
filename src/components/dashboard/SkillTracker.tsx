"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen, Headphones, MessageSquare, PenLine } from "lucide-react";

interface SkillData {
  name: string;
  level: string;
  percent: number;
  icon: typeof BookOpen;
  canDo: number;
  canDoTotal: number;
  color: string;
}

export function SkillTracker() {
  const [skills, setSkills] = useState<SkillData[]>([
    {
      name: "Leseverstehen",
      level: "B1",
      percent: 68,
      icon: BookOpen,
      canDo: 16,
      canDoTotal: 24,
      color: "text-primary stroke-primary",
    },
    {
      name: "Hörverstehen",
      level: "A2",
      percent: 52,
      icon: Headphones,
      canDo: 12,
      canDoTotal: 24,
      color: "text-sky-500 stroke-sky-500",
    },
    {
      name: "Schreiben",
      level: "A2",
      percent: 45,
      icon: PenLine,
      canDo: 10,
      canDoTotal: 24,
      color: "text-amber-500 stroke-amber-500",
    },
    {
      name: "Sprechen",
      level: "A2",
      percent: 38,
      icon: MessageSquare,
      canDo: 8,
      canDoTotal: 24,
      color: "text-rose-500 stroke-rose-500",
    },
  ]);

  const overallPercent = Math.round(
    skills.reduce((sum, s) => sum + s.percent, 0) / skills.length
  );

  return (
    <Card variant="elevated" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-foreground">Deine Sprachfertigkeiten</h3>
          <p className="text-xs text-muted-foreground mt-0.5">CEFR-basierte Bewertung aller vier Fertigkeiten</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-display font-bold text-foreground">{overallPercent}%</div>
          <div className="text-xs text-muted-foreground">Gesamtfortschritt</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <skill.icon size={18} className={skill.color} />
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
              </div>
              <span className="text-xs font-semibold text-muted-foreground">{skill.level}</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${skill.color.replace("text-", "bg-").replace("stroke-", "")}`}
                style={{ width: `${skill.percent}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>{skill.percent}%</span>
              <span>
                {skill.canDo}/{skill.canDoTotal} Can-Do
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Radar Chart (CSS-only approximation) */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Kompetenz-Radar
        </h4>
        <div className="relative w-48 h-48 mx-auto">
          {/* Background rings */}
          <div className="absolute inset-0 rounded-full border border-border/50" />
          <div className="absolute inset-4 rounded-full border border-border/50" />
          <div className="absolute inset-8 rounded-full border border-border/50" />
          <div className="absolute inset-12 rounded-full border border-border/50" />

          {/* Cross lines */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border/30" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border/30" />

          {/* Skill points on radar */}
          {skills.map((skill, i) => {
            const angle = (i * 90 - 90) * (Math.PI / 180); // 4 points at 0°, 90°, 180°, 270°
            const radius = (skill.percent / 100) * 72; // max 72px from center
            const x = 96 + Math.cos(angle) * radius - 4;
            const y = 96 + Math.sin(angle) * radius - 4;

            return (
              <div
                key={skill.name}
                className={`absolute w-2 h-2 rounded-full ${skill.color.replace("text-", "bg-").replace("stroke-", "")}`}
                style={{ left: `${x}px`, top: `${y}px` }}
                title={`${skill.name}: ${skill.percent}%`}
              />
            );
          })}

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-display font-bold text-foreground">B1</div>
              <div className="text-[9px] text-muted-foreground">angestrebt</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function CanDoList() {
  const canDos = [
    { skill: "Lesen", statement: "Kann einfache Briefe und E-Mails verstehen.", done: true },
    { skill: "Lesen", statement: "Kann Anzeigen und Prospekte nach Informationen durchsuchen.", done: true },
    { skill: "Lesen", statement: "Kann kurze Zeitungsartikel zu vertrauten Themen verstehen.", done: false },
    { skill: "Hören", statement: "Kann einfache Durchsagen (z.B. am Bahnhof) verstehen.", done: true },
    { skill: "Hören", statement: "Kann die Hauptpunkte von kurzen Gesprächen erfassen.", done: false },
    { skill: "Hören", statement: "Kann Telefongespräche zu vertrauten Themen führen.", done: false },
    { skill: "Schreiben", statement: "Kann einfache Formulare mit persönlichen Daten ausfüllen.", done: true },
    { skill: "Schreiben", statement: "Kann kurze Notizen und Mitteilungen schreiben.", done: true },
    { skill: "Schreiben", statement: "Kann einen einfachen persönlichen Brief schreiben.", done: false },
    { skill: "Sprechen", statement: "Kann mich in einfachen Alltagssituationen verständigen.", done: true },
    { skill: "Sprechen", statement: "Kann einfache Fragen zu vertrauten Themen beantworten.", done: true },
    { skill: "Sprechen", statement: "Kann in einfachen Sätzen über meine Familie sprechen.", done: false },
  ];

  const done = canDos.filter((c) => c.done).length;

  return (
    <Card variant="default" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">Can-Do-Statements</h3>
        <span className="text-xs text-muted-foreground">
          {done}/{canDos.length} erreicht
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full mb-4">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(done / canDos.length) * 100}%` }}
        />
      </div>
      <div className="space-y-1.5">
        {canDos.map((item, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
              item.done ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <span className={`shrink-0 mt-0.5 ${item.done ? "text-success" : "text-border"}`}>
              {item.done ? "✓" : "○"}
            </span>
            <span>
              <span className="text-[10px] font-medium uppercase text-primary-muted-foreground mr-1.5">
                {item.skill}
              </span>
              {item.statement}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
