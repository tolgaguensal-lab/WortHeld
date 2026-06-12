import { authOptions } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/learn", label: "Lernen", icon: "📖" },
  { href: "/vocabulary", label: "Vokabeltrainer", icon: "📝" },
  { href: "/grammar", label: "Grammatik", icon: "🎓" },
  { href: "/review", label: "Wiederholung", icon: "🔄" },
  { href: "/leaderboard", label: "Rangliste", icon: "🏆" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-background">
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 border-r bg-card flex-col z-30">
        <div className="p-6 border-b">
          <h1 className="text-xl font-display font-bold text-primary">DeutschQuest</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
            <span className="text-lg">⚙️</span> Admin
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
              {(session.user?.name?.[0] ?? "U").toUpperCase()}
            </div>
            <div className="text-sm">
              <p className="font-medium">{session.user?.name ?? "Benutzer"}</p>
              <p className="text-muted-foreground text-xs">{session.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around py-2 px-4 z-30 safe-area-bottom">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors py-1">
            <span className="text-xl">{item.icon}</span>
            <span>{item.label.split(" ")[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
