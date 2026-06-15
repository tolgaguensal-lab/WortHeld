"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ReviewItem {
  id: string;
  contentType: string;
  contentId: string;
  status: string;
  notes: string | null;
  createdAt: string;
}

interface QualityReport {
  lessonId: string;
  lessonName: string;
  level: string;
  hasSteps: boolean;
  stepCount: number;
  exerciseCount: number;
  hasLearningObjective: boolean;
  isPublished: boolean;
  completeness: number;
}

export default function AdminReviewPage() {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [qualityReports, setQualityReports] = useState<QualityReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"review" | "quality">("review");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/review").then(r => r.json()).catch(() => ({ items: [] })),
      fetch("/api/admin/quality").then(r => r.json()).catch(() => ({ reports: [] })),
    ]).then(([reviewData, qualityData]) => {
      setReviewItems(reviewData.items || []);
      setQualityReports(qualityData.reports || []);
      setLoading(false);
    });
  }, []);

  async function handleReview(itemId: string, action: "approve" | "reject") {
    await fetch("/api/admin/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, action }),
    });
    setReviewItems((prev) => prev.filter((i) => i.id !== itemId));
  }

  if (loading) {
    return <div className="p-6 max-w-6xl mx-auto"><p className="text-muted-foreground">Lade...</p></div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-display font-bold">Qualitätskontrolle</h1>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b pb-2">
        <button
          onClick={() => setTab("review")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            tab === "review" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          Ausstehende Prüfungen
          {reviewItems.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">{reviewItems.length}</span>
          )}
        </button>
        <button
          onClick={() => setTab("quality")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            tab === "quality" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          Lektions-Qualität
        </button>
      </div>

      {/* Review Queue */}
      {tab === "review" && (
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Ausstehende Inhaltsprüfungen</CardTitle>
          </CardHeader>
          <CardContent>
            {reviewItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Keine ausstehenden Prüfungen. Alle Inhalte sind freigegeben.</p>
            ) : (
              <div className="space-y-3">
                {reviewItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border bg-card">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{item.contentType}</Badge>
                        <span className="text-sm text-muted-foreground">{item.contentId}</span>
                      </div>
                      {item.notes && <p className="text-sm text-muted-foreground">{item.notes}</p>}
                      <p className="text-xs text-muted-foreground mt-1">
                        Erstellt: {new Date(item.createdAt).toLocaleDateString("de-DE")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50"
                        onClick={() => handleReview(item.id, "approve")}>
                        Freigeben
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50"
                        onClick={() => handleReview(item.id, "reject")}>
                        Ablehnen
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quality Gates */}
      {tab === "quality" && (
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Lektions-Qualitätsprüfung</CardTitle>
          </CardHeader>
          <CardContent>
            {qualityReports.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Keine Daten verfügbar.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 font-medium">Lektion</th>
                      <th className="pb-3 font-medium">Level</th>
                      <th className="pb-3 font-medium">Steps</th>
                      <th className="pb-3 font-medium">Übungen</th>
                      <th className="pb-3 font-medium">Lernziel</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Qualität</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qualityReports.map((r) => (
                      <tr key={r.lessonId} className="border-b">
                        <td className="py-3 font-medium">{r.lessonName}</td>
                        <td className="py-3"><Badge className="text-xs">{r.level}</Badge></td>
                        <td className="py-3">
                          <span className={r.stepCount >= 12 ? "text-green-600" : "text-amber-600"}>
                            {r.stepCount}/12
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={r.exerciseCount >= 5 ? "text-green-600" : "text-amber-600"}>
                            {r.exerciseCount}
                          </span>
                        </td>
                        <td className="py-3">
                          {r.hasLearningObjective ? "✅" : "❌"}
                        </td>
                        <td className="py-3">
                          <Badge variant={r.isPublished ? "success" : "warning"} className="text-xs">
                            {r.isPublished ? "Veröffentlicht" : "Entwurf"}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  r.completeness >= 80 ? "bg-green-500" : r.completeness >= 50 ? "bg-amber-500" : "bg-red-500"
                                }`}
                                style={{ width: `${r.completeness}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{r.completeness}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
