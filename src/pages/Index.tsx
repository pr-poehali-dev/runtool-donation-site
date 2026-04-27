import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/5a15d1a1-6e3c-4330-9638-d76545e58ec5/files/322e14ee-87c5-4e61-9a98-86c19d76e296.jpg";

const NAV_LINKS = [
  { id: "home", label: "Главная" },
  { id: "donate", label: "Донаты" },
  { id: "status", label: "Статус" },
  { id: "about", label: "О сервере" },
];

const DONATE_ITEMS = [
  {
    id: 1,
    name: "Привилегия VIP",
    desc: "Цветной ник, доступ к /fly, 3 домашних точки",
    price: "149 ₽",
    badge: "Популярно",
    emoji: "⭐",
  },
  {
    id: 2,
    name: "Привилегия PRO",
    desc: "Всё из VIP + /god режим, 10 точек, приоритет входа",
    price: "299 ₽",
    badge: "Выгодно",
    emoji: "💎",
  },
  {
    id: 3,
    name: "Набор ресурсов",
    desc: "64× алмаза, 32× изумруда, редкие материалы",
    price: "99 ₽",
    badge: null,
    emoji: "🪨",
  },
  {
    id: 4,
    name: "Кейс «Удача»",
    desc: "Случайный ценный предмет с гарантированным рарити",
    price: "59 ₽",
    badge: null,
    emoji: "🎁",
  },
  {
    id: 5,
    name: "Набор Builder",
    desc: "Набор блоков для строительства: 500 уникальных блоков",
    price: "79 ₽",
    badge: null,
    emoji: "🏗️",
  },
  {
    id: 6,
    name: "Привилегия LEGEND",
    desc: "Все привилегии + эксклюзивные частицы и питомец",
    price: "599 ₽",
    badge: "Топ",
    emoji: "👑",
  },
];

const SERVER_IP = "play.craftworld.ru";
const ONLINE_COUNT = 47;
const MAX_PLAYERS = 200;

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [orderItem, setOrderItem] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
    const handleScroll = () => {
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const scrollY = window.scrollY + 120;
      sections.forEach((sec) => {
        if (sec && scrollY >= sec.offsetTop) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="font-['Cormorant'] text-2xl font-semibold tracking-wide cursor-pointer"
            onClick={() => scrollTo("home")}
          >
            CraftWorld
          </span>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-['Golos_Text'] transition-all duration-200 pb-0.5 border-b-2 ${
                  activeSection === link.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm animate-fade-in">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="w-full text-left px-6 py-3 text-sm hover:bg-secondary/50 transition-colors font-['Golos_Text']"
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
          <img
            src={HERO_IMG}
            alt="Сервер"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
        </div>

        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
          <div className="animate-fade-in-up">
            <span className="inline-block text-xs font-['Golos_Text'] uppercase tracking-[0.2em] text-muted-foreground mb-6 border border-border px-4 py-1.5 rounded-full">
              Minecraft сервер
            </span>
          </div>

          <h1 className="font-['Cormorant'] text-6xl md:text-8xl font-semibold leading-tight mb-6 animate-fade-in-up delay-100">
            Добро пожаловать
            <br />
            <em className="not-italic" style={{ color: "hsl(25, 45%, 50%)" }}>
              в CraftWorld
            </em>
          </h1>

          <p className="font-['Golos_Text'] text-lg text-muted-foreground max-w-md mb-10 animate-fade-in-up delay-200">
            Спокойный сервер для тех, кто любит строить, исследовать и общаться.
            Без токсичности — только творчество.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
            <button
              onClick={() => scrollTo("donate")}
              className="px-8 py-3.5 bg-foreground text-background rounded-xl font-['Golos_Text'] font-medium text-sm hover:opacity-80 transition-all duration-200 hover:scale-105"
            >
              Магазин привилегий
            </button>
            <button
              onClick={() => scrollTo("status")}
              className="px-8 py-3.5 bg-transparent border border-border text-foreground rounded-xl font-['Golos_Text'] font-medium text-sm hover:bg-secondary/60 transition-all duration-200"
            >
              Статус сервера
            </button>
          </div>

          <div className="mt-12 animate-fade-in-up delay-400">
            <p className="text-xs text-muted-foreground mb-2 font-['Golos_Text']">
              Адрес для подключения
            </p>
            <button
              className="font-['Cormorant'] text-xl tracking-widest border border-border px-6 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors flex items-center gap-3 mx-auto"
              onClick={copyIP}
            >
              {copied ? "Скопировано!" : SERVER_IP}
              <Icon name={copied ? "Check" : "Copy"} size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center pb-10 animate-fade-in delay-500">
          <Icon name="ChevronDown" size={18} className="text-muted-foreground animate-bounce" />
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-['Golos_Text'] uppercase tracking-[0.2em] text-muted-foreground">
              Поддержи сервер
            </span>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-semibold mt-3">
              Магазин
            </h2>
            <p className="text-muted-foreground font-['Golos_Text'] mt-4 max-w-sm mx-auto text-sm">
              Все привилегии косметические — честная игра гарантирована
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DONATE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative"
              >
                {item.badge && (
                  <span className="absolute -top-3 right-5 text-xs px-3 py-1 bg-foreground text-background rounded-full font-['Golos_Text'] font-medium">
                    {item.badge}
                  </span>
                )}
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="font-['Cormorant'] text-2xl font-semibold mb-2">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-sm font-['Golos_Text'] mb-5 leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-['Cormorant'] text-2xl font-medium">
                    {item.price}
                  </span>
                  <button
                    onClick={() => setOrderItem(item.id)}
                    className="px-4 py-2 bg-foreground text-background text-sm rounded-lg font-['Golos_Text'] hover:opacity-75 transition-opacity"
                  >
                    Купить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {orderItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fade-in"
          onClick={() => setOrderItem(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl p-8 max-w-sm w-full mx-6 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-['Cormorant'] text-3xl font-semibold mb-2">
              {DONATE_ITEMS.find((d) => d.id === orderItem)?.name}
            </h3>
            <p className="text-muted-foreground text-sm font-['Golos_Text'] mb-6">
              Укажи свой никнейм для зачисления привилегии
            </p>
            <input
              type="text"
              placeholder="Твой никнейм"
              className="w-full border border-border bg-background rounded-lg px-4 py-3 text-sm font-['Golos_Text'] mb-4 focus:outline-none focus:ring-1 focus:ring-foreground/30"
            />
            <button className="w-full py-3 bg-foreground text-background rounded-lg font-['Golos_Text'] font-medium text-sm hover:opacity-80 transition-opacity mb-3">
              Оформить заказ — {DONATE_ITEMS.find((d) => d.id === orderItem)?.price}
            </button>
            <button
              onClick={() => setOrderItem(null)}
              className="w-full py-2 text-muted-foreground text-sm font-['Golos_Text'] hover:text-foreground transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* STATUS */}
      <section id="status" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-['Golos_Text'] uppercase tracking-[0.2em] text-muted-foreground">
              Мониторинг
            </span>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-semibold mt-3">
              Статус сервера
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-['Golos_Text'] text-sm font-medium text-green-600">Онлайн</span>
              </div>
              <p className="font-['Cormorant'] text-5xl font-semibold text-green-600">✓</p>
              <p className="text-muted-foreground text-xs font-['Golos_Text'] mt-3">Статус соединения</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <Icon name="Users" size={20} className="mx-auto mb-4 text-muted-foreground" />
              <p className="font-['Cormorant'] text-5xl font-semibold">{ONLINE_COUNT}</p>
              <p className="text-muted-foreground text-xs font-['Golos_Text'] mt-3 mb-3">Игроков онлайн</p>
              <div className="bg-secondary rounded-full h-1.5 w-full">
                <div
                  className="bg-foreground h-1.5 rounded-full"
                  style={{ width: `${(ONLINE_COUNT / MAX_PLAYERS) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground font-['Golos_Text'] mt-1.5">из {MAX_PLAYERS}</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <Icon name="Cpu" size={20} className="mx-auto mb-4 text-muted-foreground" />
              <p className="font-['Cormorant'] text-5xl font-semibold">1.20</p>
              <p className="text-muted-foreground text-xs font-['Golos_Text'] mt-3">Версия Minecraft</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl divide-y divide-border">
            {[
              { label: "IP адрес", value: SERVER_IP, icon: "Globe" },
              { label: "Версия", value: "Java 1.20.x", icon: "Code" },
              { label: "Режим", value: "Survival + Creative", icon: "Gamepad2" },
              { label: "Аптайм этой недели", value: "99.8%", icon: "Activity" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <Icon name={row.icon} size={15} className="text-muted-foreground" fallback="Circle" />
                  <span className="text-sm font-['Golos_Text'] text-muted-foreground">{row.label}</span>
                </div>
                <span className="text-sm font-['Golos_Text'] font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-['Golos_Text'] uppercase tracking-[0.2em] text-muted-foreground">
              История
            </span>
            <h2 className="font-['Cormorant'] text-5xl md:text-6xl font-semibold mt-3">
              О сервере
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <p className="font-['Golos_Text'] text-muted-foreground leading-relaxed mb-5">
                CraftWorld — это место, где творчество встречается с сообществом.
                Мы открылись в 2022 году и с тех пор стали домом для тысяч
                игроков, которые ценят спокойную атмосферу и честную игру.
              </p>
              <p className="font-['Golos_Text'] text-muted-foreground leading-relaxed">
                Нет гриферства, нет токсичности — только строительство,
                исследования и дружеское общение. Наша администрация активна
                24/7 и всегда готова помочь.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "2022", label: "Год основания", emoji: "📅" },
                { num: "12 000+", label: "Всего игроков", emoji: "👥" },
                { num: "3", label: "Игровых мира", emoji: "🌍" },
                { num: "24/7", label: "Поддержка", emoji: "💬" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-5 text-center">
                  <div className="text-2xl mb-2">{stat.emoji}</div>
                  <div className="font-['Cormorant'] text-2xl font-semibold">{stat.num}</div>
                  <div className="text-xs text-muted-foreground font-['Golos_Text'] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary/40 border border-border rounded-2xl p-8">
            <h3 className="font-['Cormorant'] text-3xl font-semibold mb-6">Правила сервера</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Уважай других игроков",
                "Запрещено гриферство и воровство",
                "Не используй читы и моды с преимуществом",
                "Не спамь в чате",
                "Слушай администрацию",
                "Не строй некрасивые постройки вблизи спавна",
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-['Cormorant'] text-lg text-muted-foreground mt-0.5 w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-['Golos_Text'] text-sm text-muted-foreground leading-relaxed">
                    {rule}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-['Cormorant'] text-2xl font-semibold">CraftWorld</span>
          <p className="text-muted-foreground text-sm font-['Golos_Text']">
            {SERVER_IP} · Java Edition 1.20
          </p>
          <p className="text-muted-foreground text-xs font-['Golos_Text']">© 2024 CraftWorld</p>
        </div>
      </footer>
    </div>
  );
}