import { useState, useEffect, useRef } from "react";
import myPic from "./assets/my-pic.png";
import emaillogo from "./assets/email-logo.png";
import phonelogo from "./assets/phone-logo.png";
import github from "./assets/github.png";
import facebook from "./assets/facebook.png";
import insta from "./assets/instagram.png";
import linkedin from "./assets/linkedin.png";
import jobstreet from "./assets/jobstreet.png";

const NAV_LINKS = ["home", "about", "projects", "contact"];

const SKILL_GROUPS = [
  {
    title: "STACK",
    items: [
      "React",
      "Typescript",
      "Javascript",
      "Node.js",
      "Tailwind",
      "Java",
      "Python",
      "PostgreSQL",
    ],
  },
  {
    title: "TOOLS / PLATFORMS",
    items: [
      "Git",
      "GitHub",
      "Zed",
      "Visual Studio Code",
      "Android Studio",
      "PWA",
      "Vercel",
      "Render",
      "Supabase",
      "Resend",
      "Upstash",
    ],
  },
  {
    title: "AI / WORKFLOW",
    items: ["Deepseek", "GLM", "Kimi", "OpenCode CLI", "Pi"],
  },
];

const PROJECTS = [
  {
    title: "TUON AI",
    tags: ["REACT", "EXPRESS", "SUPABASE", "PWA"],
    summary:
      "AI learning platform that generates structured notes and adaptive quizzes — built to understand, not memorize.",
    bullets: [
      "Multi-model AI: Gemini, Step, GLM, or any OpenAI-compatible API",
      "Email verification, password reset, 5-attempt account lockout",
      "Installable PWA with per-model rate limiting",
    ],
    repo: "https://github.com/worriee/tuon-ai",
    demo: "https://tuon-ai.vercel.app",
  },
  {
    title: "UVE Workflow",
    tags: ["AI", "WORKFLOW", "TEMPLATE"],
    summary:
      "Structured AI coding workflow template with persistent memory, 8 specialized personas, and one-command session recovery.",
    bullets: [
      "7 markdown memory layers with automatic archival",
      "8 modular AI personas + manual trigger flags",
      "Workspace-level isolation — no cross-project context leaks",
    ],
    repo: "https://github.com/worriee/uveworkflow",
  },
  {
    title: "Pi-Worrie",
    tags: ["PI", "AI", "CLI"],
    summary:
      "Personal Pi CLI extension suite — semi-automated version of my UVE workflow, installable in one command.",
    bullets: [
      "Persona skills: /plan, /coder, /orchestrator, /orch-full 11-stage pipeline",
      "Subagents with single, parallel, chain, and background modes",
      "Memory CRUD commands with auto-archiving and in-CLI updater",
    ],
    repo: "https://github.com/worriee/pi-worrie",
  },
  {
    title: "AI Notes",
    tags: ["JAVA", "ANDROID", "GEMINI"],
    summary:
      "Android app that turns any YouTube video into structured study notes in one tap.",
    bullets: [
      "Gemini-generated notes with academic formatting",
      "Archive + recently-deleted recovery, encrypted local storage",
      "Full light/dark adaptive UI",
    ],
    repo: "https://github.com/worriee/SimpleNoteApp",
  },
  {
    title: "StudyHub",
    tags: ["C#", "WINFORMS", "SQL SERVER"],
    summary:
      "Study material marketplace desktop app — project-swap transactions with real-time chat. (a project in my 2nd yr. college)",
    bullets: [
      "Login sessions, dashboard cards, transaction history w/ search + filters",
      "Real-time chatroom and file-swap flow backed by SQL Server",
      "Dark mode, input validation, drag-and-drop project upload",
    ],
    repo: "https://github.com/worriee/StudyHub-Progress",
  },
  {
    title: "Web Loader",
    tags: ["REACT", "SUPABASE", "REDIS", "PWA"],
    summary:
      "Mobile-first data-loading app with APK + PWA — order, upload receipt, track by transaction ID.",
    bullets: [
      "Real-time admin dashboard with one-click status updates",
      "Security: bcrypt, JWT httpOnly cookies, rate limiting, upload validation",
      "Installable as a native-feel PWA or Android APK",
    ],
    repo: "https://github.com/worriee/web-loaderbyjimzxworrie",
  },
];

const CONTACTS = [
  { src: emaillogo, label: "julrymahilum12@gmail.com", href: null },
  { src: phonelogo, label: "09859722995", href: null },
  {
    src: facebook,
    label: "Julry Mahilum",
    href: "https://web.facebook.com/profile.php?id=61594069880193",
  },
  {
    src: insta,
    label: "Julry M.",
    href: "https://www.instagram.com/itz.jmworrie/",
  },
  { src: github, label: "Worriee", href: "https://github.com/worriee" },
  {
    src: linkedin,
    label: "Julry Mahilum",
    href: "https://www.linkedin.com/in/julry-mahilum-91a47240a",
  },
  {
    src: jobstreet,
    label: "Julry Mahilum",
    href: "https://ph.jobstreet.com/profiles/julry-mahilum-nrpn26H1WV",
  },
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("visible", entry.isIntersecting);
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function useTypewriter(text) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setOut(text.substring(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(timer);
      }
    }, 100); // 100ms delay sa every letter
    return () => clearInterval(timer);
  }, [text]);
  return out;
}

function ThemeIcon({ dark }) {
  return dark ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      />
    </svg>
  );
}

function KeyChip({ k }) {
  return (
    <span className="h-6 min-w-6 px-1.5 rounded-md bg-white/70 border border-slate-200 text-slate-800 text-sm font-bold flex items-center justify-center mr-2 dark:bg-white/5 dark:border-white/10 dark:text-slate-200">
      {k}
    </span>
  );
}

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );
  const [activeLink, setActiveLink] = useState("#home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sendStatus, setSendStatus] = useState("idle"); // idle | sending | sent | error
  const navbarName = useTypewriter("Julry M.");
  const heroText = useTypewriter("Hi, I'm Julry.");
  const heroRef = useReveal();
  const techRef = useReveal();
  const aboutRef = useReveal();
  const contactRef = useReveal();
  const resumeRef = useRef(null);
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!isContactOpen) return;
    document.body.style.overflow = "hidden";
    const prevFocus = document.activeElement;
    nameInputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, [isContactOpen]);

  const handleModalKeyDown = (e) => {
    if (e.key !== "Tab") return;
    const focusables = modalRef.current?.querySelectorAll(
      "button, input, textarea, a[href]",
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSection = "#home";
      for (const id of NAV_LINKS) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = `#${id}`;
        }
      }
      setActiveLink(currentSection);
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setIsContactOpen(false);
        setIsMenuOpen(false);
        return;
      }
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        setIsContactOpen(true);
      } else if (e.key.toLowerCase() === "d") {
        e.preventDefault();
        resumeRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    setSendStatus("sending");
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/julrymahilum12@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
            _subject: "Portfolio Contact Message",
          }),
        },
      );
      if (!res.ok) throw new Error("send failed");
      setSendStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setSendStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#050816]">
      <div
        className="fixed inset-0 z-[70] overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <span className="flake"></span>
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="flake"></span>
        ))}
      </div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-lg shadow-slate-900/5 dark:bg-[#050816]/80 dark:border-white/10 dark:shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-slate-900 font-bold text-xl tracking-tight dark:text-white">
            {navbarName || "\u00A0"}
          </span>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => setIsMenuOpen(false)}
                className={`nav-link text-lg capitalize ${
                  activeLink === `#${link}` ? "active" : ""
                }`}
              >
                {link === "contact" ? "Contacts" : link}
              </a>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="p-2 rounded-md border border-slate-300 text-slate-700 bg-white/70 transition-colors dark:border-white/10 dark:text-white dark:bg-white/5"
            >
              <ThemeIcon dark={theme === "dark"} />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-2 rounded-md border border-slate-300 text-slate-700 bg-white/70 dark:border-white/10 dark:text-white dark:bg-white/5"
            >
              <ThemeIcon dark={theme === "dark"} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md border border-slate-300 text-slate-700 bg-white/70 dark:border-white/10 dark:text-white dark:bg-white/5"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              id="mobile-menu"
              className="md:hidden mx-4 mb-4 rounded-xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl dark:bg-[#0a1022]/95 dark:border-white/10"
            >
              <div className="flex flex-col p-4 space-y-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`nav-link text-lg capitalize ${activeLink === `#${link}` ? "active" : ""}`}
                  >
                    {link === "contact" ? "Contacts" : link}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>

      <section
        id="home"
        className="min-h-screen relative overflow-hidden flex items-center"
      >
        <div className="orb bg-white/10 w-96 h-96 -top-20 -left-20"></div>
        <div className="orb bg-zinc-400/20 w-80 h-80 top-1/3 right-0"></div>
        <div className="orb bg-white/5 w-72 h-72 bottom-0 left-1/3"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
          <div
            ref={heroRef}
            className="reveal flex flex-col md:flex-row items-center gap-10 md:gap-16"
          >
            <img
              src={myPic}
              alt="Julry Mahilum"
              className="h-44 w-44 md:h-56 md:w-56 object-cover rounded-full border-4 border-white/20 shadow-2xl shadow-black/40"
            />
            <div className="text-center md:text-left">
              <h2 className="mt-3 text-zinc-600 font-semibold text-lg dark:text-zinc-300">
                Full Stack | AI Software Integration
              </h2>
              <h1 className="gradient-text font-bold font-serif text-4xl md:text-5xl mt-2 min-h-[3rem] md:min-h-[3.5rem]">
                {heroText || "\u00A0"}
              </h1>
              <div className="flex flex-col sm:flex-row mt-8 space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="btn-fill flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-transparent text-zinc-600 border border-zinc-400 rounded-md font-bold dark:text-zinc-300 dark:border-zinc-500"
                >
                  <KeyChip k="C" />
                  Contact Me
                </button>
                <a
                  ref={resumeRef}
                  href="/Mahilum_Resume.pdf"
                  download
                  className="btn-fill flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-transparent text-zinc-600 border border-zinc-400 rounded-md font-bold dark:text-zinc-300 dark:border-zinc-500"
                >
                  <KeyChip k="D" />
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tech" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={techRef} className="reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.title}
                  className="p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 hover:shadow-white/10 hover:border-zinc-300 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:shadow-white/5 dark:hover:border-zinc-500/60"
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">
                    {group.title}
                  </h2>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-zinc-400 to-white rounded-full mb-4"></div>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/70 border border-slate-200 text-slate-800 transition-all duration-200 dark:bg-white/5 dark:border-white/10 dark:text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={aboutRef} className="reveal">
            <h1 className="text-slate-900 font-bold font-serif text-4xl border-b-2 border-zinc-400 dark:text-white">
              ABOUT ME
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-700 mt-8 leading-relaxed max-w-3xl dark:text-slate-300">
              <p>
                I make full-stack web and mobile apps (PWA) with AI integration.
                I integrate AI model APIs: Gemini or any OpenAI-compatible
                provider directly into products. I also built my workflow tools
                (eg. uveworkflow, pi-worrie). I use them heavily to ship faster
                while learning.
              </p>
            </h2>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h1 className="text-slate-900 font-bold font-serif text-4xl border-b-2 border-zinc-400 dark:text-white">
              PROJECTS
            </h1>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {PROJECTS.map((p) => (
              <Reveal
                key={p.title}
                className="relative flex flex-col bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-white/10 hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:shadow-white/5 dark:hover:border-zinc-500/60"
              >
                <div className="flex flex-wrap gap-2 mb-2 md:absolute md:top-6 md:right-6 md:mb-0">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-zinc-500 font-bold text-sm tracking-wider dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 md:pr-12 w-fit dark:text-white dark:border-white/10">
                  {p.title}
                </h2>
                <p className="text-slate-600 text-base mb-3 dark:text-slate-300">
                  {p.summary}
                </p>
                <ul className="text-sm text-slate-500 space-y-1 mb-6 dark:text-slate-400">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-zinc-400 shrink-0 dark:bg-zinc-500"></span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-4 mt-auto pt-4">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-fill inline-flex items-center px-4 py-2 bg-transparent text-zinc-600 border border-zinc-400 rounded-md font-bold dark:text-zinc-300 dark:border-zinc-500"
                  >
                    View Repository
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-zinc-500 font-bold hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-white"
                    >
                      Live URL
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={contactRef} className="reveal">
            <h1 className="text-slate-900 font-bold font-serif text-4xl border-b-2 border-zinc-400 dark:text-white">
              CONTACTS
            </h1>
            <div className="flex flex-col mt-10 space-y-6">
              {CONTACTS.map((c, i) => (
                <div key={i} className="flex flex-row items-center space-x-6">
                  <div className="bg-white rounded-lg flex items-center justify-center p-2 shadow-inner dark:bg-slate-800/80">
                    <img
                      src={c.src}
                      alt={`${c.label} Logo`}
                      className="h-7 w-7 object-contain dark:invert"
                    />
                  </div>
                  <div className="min-w-0">
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 font-bold text-lg md:text-xl hover:text-zinc-900 hover:underline dark:text-white dark:hover:text-zinc-100"
                      >
                        {c.label}
                      </a>
                    ) : (
                      <h2 className="text-slate-800 font-bold text-lg md:text-xl break-all dark:text-slate-200">
                        {c.label}
                      </h2>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a1022]/60">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-sm text-slate-500 text-center dark:text-slate-400">
            &copy; {new Date().getFullYear()} JulryM x Worrie
          </p>
        </div>
      </footer>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Contact Me"
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 dark:bg-[#0a1022] dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleModalKeyDown}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Contact Me
              </h2>
              <div className="flex items-center gap-1">
                <KeyChip k="esc" />
                <button
                  onClick={() => setIsContactOpen(false)}
                  aria-label="Close"
                  className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleSend} className="px-6 py-5 space-y-4">
              <input
                ref={nameInputRef}
                type="text"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-zinc-400 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-500"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-zinc-400 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-500"
              />
              <textarea
                required
                rows={4}
                placeholder="What's this about?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-zinc-400 resize-none dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-500"
              />
              {sendStatus === "sent" && (
                <p className="text-green-400 font-semibold dark:text-green-200">
                  Message received! Thanks for reaching me out.
                </p>
              )}
              {sendStatus === "error" && (
                <p className="text-red-400 font-semibold dark:text-red-200">
                  Failed to send. Try again or email me directly.
                </p>
              )}
              <button
                type="submit"
                disabled={sendStatus === "sending"}
                className="w-full px-5 py-2.5 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 transition duration-300 font-bold disabled:opacity-60"
              >
                {sendStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
