import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/learn", label: "Lernen", icon: "📖" },
  { href: "/vocabulary", label: "Vokabeln", icon: "📝" },
  { href: "/grammar", label: "Grammatik", icon: "🎓" },
  { href: "/dtz", label: "DTZ-Test", icon: "📝" },
  { href: "/review", label: "Üben", icon: "🔄" },
  { href: "/leaderboard", label: "Rangliste", icon: "🏆" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10">
      {/* Sidebar with Glassmorphism */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white/70 backdrop-blur-xl border-r border-white/20 flex-col z-30 shadow-xl">
        <div className="p-6 border-b border-white/20 bg-gradient-to-r from-primary to-indigo-600">
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">WortHeld</h1>
          <p className="text-blue-100/90 text-xs mt-1 font-medium">Deutsch lernen</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
            >
              <span className="text-xl transform group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/20 bg-gradient-to-r from-slate-50/50 to-white/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white/50">
              {(session.user?.name?.[0] ?? "U").toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate text-slate-900">{session.user?.name ?? "Benutzer"}</p>
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 flex justify-around py-2 px-2 z-30 shadow-2xl safe-area-bottom">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-1 text-xs text-slate-600 hover:text-primary transition-colors py-1 px-3 rounded-lg hover:bg-primary/5"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
