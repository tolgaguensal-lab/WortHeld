"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Plus, Filter, Search, Eye, Edit3, Lock, Unlock, 
  BarChart3, Users, FileText, CheckCircle2, AlertCircle 
} from "lucide-react";

// Expanded mock data for production feel
const contentStats = {
  totalLessons: 250,
  published: 180,
  draft: 70,
  totalExercises: 2500,
  totalVocabulary: 5000,
};

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

const lessons = [
  { id: "l1", name: "Hallo! Begrüßungen", unit: "Begrüßung & Vorstellung", level: "A1" as const, exercises: 15, vocabulary: 24, status: "published", type: "grammar" },
  { id: "l2", name: "Wie heißt du?", unit: "Begrüßung & Vorstellung", level: "A1" as const, exercises: 10, vocabulary: 18, status: "published", type: "vocabulary" },
  { id: "l3", name: "Woher kommst du?", unit: "Begrüßung & Vorstellung", level: "A1" as const, exercises: 12, vocabulary: 20, status: "draft", type: "mixed" },
  { id: "l4", name: "Zahlen von 1-20", unit: "Zahlen & Zeit", level: "A1" as const, exercises: 8, vocabulary: 20, status: "published", type: "vocabulary" },
  { id: "l5", name: "Bewerbung schreiben", unit: "Arbeit & Beruf", level: "B1" as const, exercises: 15, vocabulary: 30, status: "draft", type: "writing" },
  { id: "l6", name: "Krankmeldung per E-Mail", unit: "Gesundheit & Medizin", level: "A2" as const, exercises: 12, vocabulary: 22, status: "published", type: "writing" },
  { id: "l7", name: "Passiv: Der Vorgang", unit: "Grammatik Basis", level: "B2" as const, exercises: 18, vocabulary: 15, status: "draft", type: "grammar" },
  { id: "l8", name: "Argumentation & Diskussion", unit: "Gesellschaft & Politik", level: "C1" as const, exercises: 20, vocabulary: 35, status: "draft", type: "mixed" },
];

export default function AdminContentPage() {
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = lessons.filter(l => {
    const matchLevel = filterLevel === "all" || l.level === filterLevel;
    const matchSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Content Management</h1>
            <p className="text-muted-foreground mt-1">Verwalte alle Level, Lektionen und Übungen der App.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-2 text-sm flex items-center gap-2 border-green-200 bg-green-50 text-green-700">
              <CheckCircle2 size={14} /> Produktiv
            </Badge>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2" size={18} /> Neue Lektion
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <BookOpen size={20} />, label: "Lektionen", value: contentStats.totalLessons, color: "text-blue-600 bg-blue-100" },
            { icon: <CheckCircle2 size={20} />, label: "Veröffentlicht", value: contentStats.published, color: "text-green-600 bg-green-100" },
            { icon: <FileText size={20} />, label: "Entwürfe", value: contentStats.draft, color: "text-amber-600 bg-amber-100" },
            { icon: <BarChart3 size={20} />, label: "Übungen", value: contentStats.totalExercises, color: "text-purple-600 bg-purple-100" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm bg-white">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">{stat.value.toLocaleString()}</div>
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Quality Bar */}
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-slate-700">Content-Qualität</span>
              <span className="text-xs font-medium text-slate-400">
                {contentStats.published}/{contentStats.totalLessons} Lektionen veröffentlicht
              </span>
            </div>
            <Progress value={(contentStats.published / contentStats.totalLessons) * 100} className="h-3 bg-slate-100" />
            <div className="grid grid-cols-5 gap-2 mt-4 text-center">
              {LEVELS.map(level => (
                <div key={level} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-sm font-bold text-slate-700">{level}</div>
                  <div className="text-xs text-slate-400">{Math.floor(Math.random() * 20 + 30)} Lektionen</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lesson Table */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold text-slate-800">Alle Lektionen</CardTitle>
            <div className="flex items-center gap-3">
              {/* Level Filter */}
              <select 
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 bg-white"
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="all">Alle Level</option>
                {LEVELS.map(l => <option key={l} value={l}>Niveau {l}</option>)}
              </select>
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Lektion suchen..." 
                  className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left">
                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Lektion</th>
                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Einheit</th>
                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Level</th>
                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Übungen</th>
                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Vokabeln</th>
                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLessons.length > 0 ? filteredLessons.map((lesson) => (
                    <tr key={lesson.id} className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 font-semibold text-slate-800">{lesson.name}</td>
                      <td className="py-4 text-slate-500">{lesson.unit}</td>
                      <td className="py-4">
                        <Badge className="text-xs font-bold px-2 py-1" variant="outline">{lesson.level}</Badge>
                      </td>
                      <td className="py-4 text-slate-600">{lesson.exercises}</td>
                      <td className="py-4 text-slate-600">{lesson.vocabulary}</td>
                      <td className="py-4">
                        <Badge 
                          className={`text-xs font-bold px-2 py-1 ${
                            lesson.status === "published" 
                              ? "bg-green-100 text-green-700 border-green-200" 
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          }`}
                          variant="outline"
                        >
                          {lesson.status === "published" ? "Veröffentlicht" : "Entwurf"}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                            <Edit3 size={16} />
                          </button>
                          <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                            {lesson.status === "published" ? <Lock size={16} /> : <Unlock size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        Keine Lektionen gefunden für dieses Filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Level Management */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEVELS.map(level => (
            <Card key={level} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="text-base font-black px-3 py-1" variant="outline">{level}</Badge>
                  <span className="text-xs text-slate-400">50 Lektionen</span>
                </div>
                <Progress value={60} className="h-2 bg-slate-100" />
                <div className="flex justify-between mt-3 text-xs text-slate-400">
                  <span>30 freigeschaltet</span>
                  <span>20 kostenpflichtig</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
