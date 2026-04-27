import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/5a15d1a1-6e3c-4330-9638-d76545e58ec5/files/600b8da9-484c-4b6c-bc4b-34a299fe0d64.jpg";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "status", label: "Статус" },
];

const SERVER_IP = "mc.runtool.ru";
const MAX_PLAYERS = 200;

interface Particle {
  id: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function SandParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const list: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      size: Math.random() * 7 + 2,
      duration: Math.random() * 6 + 3,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.65 + 0.3,
    }));
    setParticles(list);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="sand-particle absolute"
          style={{
            top: `${p.top}%`,
            left: "-20px",
            width: `${p.size}px`,
            height: `${p.size * 0.35}px`,
            borderRadius: "40%",
            background: `hsla(28, 72%, 55%, ${p.opacity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyIP = () => {
    navigator.clipboard?.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.players?.online !== undefined) {
          setOnlineCount(data.players.online);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const scrollY = window.scrollY + 120;
      sections.forEach((sec) => {
        if (sec && scrollY >= sec.offsetTop) setActiveSection(sec.id);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <SandParticles />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
        style={{ boxShadow: "0 2px 20px hsla(22,40%,20%,0.1)" }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="font-['Cinzel'] text-xl font-semibold tracking-widest cursor-pointer"
            style={{ color: "hsl(18, 72%, 38%)", letterSpacing: "0.15em" }}
            onClick={() => scrollTo("home")}
          >
            ✦ RunTool ✦
          </span>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-['Cinzel'] tracking-wider transition-all duration-200 pb-0.5 border-b-2 ${
                  activeSection === link.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm animate-fade-in">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full text-left px-6 py-3 text-sm hover:bg-secondary/50 transition-colors font-['Cinzel'] tracking-wider"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMG} alt="Пустыня" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, hsla(22,55%,28%,0.15) 0%, transparent 40%)" }} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
          <svg viewBox="0 0 1440 130" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,80 C360,140 720,20 1080,90 C1260,125 1380,70 1440,80 L1440,130 L0,130 Z"
              fill="hsl(33, 55%, 84%)" opacity="0.6" />
            <path d="M0,100 C240,60 480,120 720,95 C960,70 1200,115 1440,100 L1440,130 L0,130 Z"
              fill="hsl(33, 55%, 84%)" opacity="0.9" />
          </svg>
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-24">
          <div className="animate-fade-in-up">
            <span className="inline-block text-xs font-['Cinzel'] uppercase tracking-[0.3em] text-muted-foreground mb-6 border border-border px-5 py-2 rounded-full"
              style={{ background: "hsla(35,50%,95%,0.7)" }}>
              ☀ Minecraft сервер ☀
            </span>
          </div>

          <h1 className="font-['Cinzel'] text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-100 tracking-wider">
            Добро пожаловать
            <br />
            <span style={{ color: "hsl(18, 72%, 42%)", textShadow: "0 2px 20px hsla(18,72%,48%,0.3)" }}>
              в RunTool
            </span>
          </h1>

          <p className="font-['Nunito'] text-lg text-muted-foreground max-w-md mb-10 animate-fade-in-up delay-200 leading-relaxed">
            Спокойный сервер для тех, кто любит строить, исследовать и общаться.
            Без токсичности — только творчество.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <button
              onClick={() => scrollTo("status")}
              className="btn-desert px-8 py-3.5 rounded-xl font-['Cinzel'] font-medium text-sm tracking-wider"
            >
              Статус сервера
            </button>
          </div>

          <div className="mt-12 animate-fade-in-up delay-400">
            <p className="text-xs text-muted-foreground mb-2 font-['Nunito'] tracking-widest uppercase">
              Адрес для подключения
            </p>
            <button
              className="font-['Cinzel'] text-lg tracking-widest border border-border px-6 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors flex items-center gap-3 mx-auto"
              style={{ background: "hsla(35,50%,95%,0.7)" }}
              onClick={copyIP}
            >
              {copied ? "Скопировано!" : SERVER_IP}
              <Icon name={copied ? "Check" : "Copy"} size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center pb-10 animate-fade-in delay-500 z-10">
          <Icon name="ChevronDown" size={18} className="text-muted-foreground animate-bounce" />
        </div>
      </section>

      {/* STATUS */}
      <section id="status" className="py-24 px-6" style={{ background: "hsla(33,40%,85%,0.4)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-['Cinzel'] uppercase tracking-[0.3em] text-muted-foreground">
              ✦ Мониторинг ✦
            </span>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl font-bold mt-4 tracking-wider">
              Статус сервера
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div className="desert-card rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-['Cinzel'] text-sm tracking-wider text-green-600">Онлайн</span>
              </div>
              <p className="font-['Cinzel'] text-5xl font-bold text-green-600">✓</p>
              <p className="text-muted-foreground text-xs font-['Nunito'] mt-3 tracking-wide">Статус соединения</p>
            </div>

            <div className="desert-card rounded-2xl p-6 text-center">
              <Icon name="Users" size={20} className="mx-auto mb-4 text-muted-foreground" />
              <p className="font-['Cinzel'] text-5xl font-bold">
                {onlineCount !== null ? onlineCount : "—"}
              </p>
              <p className="text-muted-foreground text-xs font-['Nunito'] mt-3 mb-3 tracking-wide">Игроков онлайн</p>
              {onlineCount !== null && (
                <>
                  <div className="bg-secondary rounded-full h-1.5 w-full">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${Math.min((onlineCount / MAX_PLAYERS) * 100, 100)}%`, background: "hsl(18,72%,48%)" }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground font-['Nunito'] mt-1.5">из {MAX_PLAYERS}</p>
                </>
              )}
            </div>

            <div className="desert-card rounded-2xl p-6 text-center">
              <Icon name="Cpu" size={20} className="mx-auto mb-4 text-muted-foreground" />
              <p className="font-['Cinzel'] text-5xl font-bold">1.21</p>
              <p className="text-muted-foreground text-xs font-['Nunito'] mt-3 tracking-wide">Версия Minecraft</p>
            </div>
          </div>

          <div className="desert-card rounded-2xl divide-y divide-border overflow-hidden">
            {[
              { label: "IP адрес", value: SERVER_IP, icon: "Globe" },
              { label: "Версия", value: "Java 1.21.8", icon: "Code" },
              { label: "Режим", value: "Survival + Creative", icon: "Gamepad2" },
              { label: "Год основания", value: "2026", icon: "Calendar" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <Icon name={row.icon} size={15} className="text-muted-foreground" fallback="Circle" />
                  <span className="text-sm font-['Nunito'] text-muted-foreground">{row.label}</span>
                </div>
                <span className="text-sm font-['Cinzel'] font-medium tracking-wider">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6"
        style={{ background: "linear-gradient(180deg, transparent, hsla(33,40%,82%,0.4))" }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-['Cinzel'] text-xl font-bold tracking-widest"
            style={{ color: "hsl(18,72%,38%)" }}>
            ✦ RunTool ✦
          </span>
          <p className="text-muted-foreground text-sm font-['Nunito']">
            {SERVER_IP} · Java Edition 1.21.8
          </p>
          <p className="text-muted-foreground text-xs font-['Nunito']">© 2026 RunTool</p>
        </div>
      </footer>
    </div>
  );
}
