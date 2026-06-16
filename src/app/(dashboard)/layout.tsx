import { authOptions } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/learn", label: "Lernen", icon: "📖" },
  { href: "/vocabulary", label: "Vokabeln", icon: "📝" },
  { href: "/grammar", label: "Grammatik", icon: "🎓" },
  { href: "/review", label: "Üben", icon: "🔄" },
  { href: "/leaderboard", label: "Rangliste", icon: "🏆" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex-col z-30 shadow-lg">
        <div className="p-6 border-b border-slate-200/60 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-2xl font-display font-bold text-white">WortHeld</h1>
          <p className="text-blue-100 text-xs mt-1">Deutsch lernen</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
            >
              <span className="text-xl transform group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200/60 bg-slate-50/50">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {(session.user?.name?.[0] ?? "U").toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{session.user?.name ?? "Benutzer"}</p>
              <p className="text-muted-foreground text-xs truncate">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 flex justify-around py-2 px-2 z-30 shadow-2xl safe-area-bottom">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 text-xs text-slate-600 hover:text-blue-600 transition-colors py-1 px-3 rounded-lg hover:bg-blue-50"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
