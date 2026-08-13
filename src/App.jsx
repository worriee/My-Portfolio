import { useState, useEffect, useRef } from "react";
import myPic from "./assets/my-pic.png";
import resumeIcon from "./assets/downloads.png";
import emaillogo from "./assets/email-logo.png";
import phonelogo from "./assets/phone-logo.png";
import github from "./assets/github.png";
import facebook from "./assets/facebook.png";
import rightArrow from "./assets/rightarrow.png";
import insta from "./assets/instagram.png";
import js from "./assets/js.png";
import java from "./assets/java.png";
import py from "./assets/python.png";
import html from "./assets/html.png";
import xml from "./assets/xml.png";
import css from "./assets/css.png";
import react from "./assets/react.png";
import nodejs from "./assets/nodejs.png";
import tailwind from "./assets/tailwind.png";
import git from "./assets/git.png";
import androidstudio from "./assets/androidstudio.png";
import zed from "./assets/zed.png";
import vscode from "./assets/vscode.png";
import linkedin from "./assets/linkedin.png";
import jobstreet from "./assets/jobstreet.png";

const NAV_LINKS = ["home", "about", "skills", "projects", "contact"];

// icon kind: color = transparent bg + colored logo, dark = black logo,
// white = white bg (multiply blend), zed = black bg (invert in light, screen in dark)
const SKILLS = [
  { src: zed, alt: "Zed", name: "Zed", kind: "zed" },
  {
    src: vscode,
    alt: "Visual Studio Code",
    name: "Visual Studio Code",
    kind: "color",
  },
  {
    src: androidstudio,
    alt: "Android Studio",
    name: "Android Studio",
    kind: "color",
  },
  { src: github, alt: "Github", name: "Github", kind: "dark" },
  { src: git, alt: "Git", name: "Git", kind: "color" },
  { src: react, alt: "React.js", name: "React.js", kind: "color" },
  { src: nodejs, alt: "Node.js", name: "Node.js", kind: "color" },
  { src: tailwind, alt: "Tailwind CSS", name: "Tailwind", kind: "white" },
  { src: js, alt: "JavaScript", name: "JavaScript", kind: "dark" },
  { src: py, alt: "Python", name: "Python", kind: "color" },
  { src: java, alt: "Java", name: "Java", kind: "color" },
  { src: html, alt: "HTML", name: "HTML", kind: "white" },
  { src: xml, alt: "XML", name: "XML", kind: "color" },
  { src: css, alt: "CSS", name: "CSS", kind: "color" },
];

const CONTACTS = [
  { src: emaillogo, label: "julrymahilum12@gmail.com", href: null },
  { src: phonelogo, label: "09859722995", href: null },
  {
    src: facebook,
    label: "Julry Mahilum",
    href: "https://web.facebook.com/itzworrie",
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
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
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

function SkillIcon({ skill }) {
  // No chip — blend mode hides the PNG background so only the logo shows on the card
  // white-bg (html, tailwind): multiply → white bg vanishes on light & dark cards
  // black-bg (zed): invert in light (bg→white, logo→dark), screen in dark (bg→invisible)
  const blend =
    skill.kind === "white"
      ? "mix-blend-multiply"
      : skill.kind === "zed"
        ? "invert dark:invert-0 dark:mix-blend-screen"
        : "";
  return (
    <img
      src={skill.src}
      alt={skill.alt}
      className={`h-14 w-14 object-contain mb-3 ${blend}`}
    />
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
  const aboutRef = useReveal();
  const skillsRef = useReveal();
  const projectsRef = useReveal();
  const contactRef = useReveal();

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
      if (e.key === "Escape") setIsContactOpen(false);
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
              className="p-2 rounded-md border border-slate-300 text-slate-700 bg-white/70 hover:border-blue-500 transition-colors dark:border-white/10 dark:text-white dark:bg-white/5 dark:hover:border-blue-400"
            >
              {theme === "dark" ? (
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
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-2 rounded-md border border-slate-300 text-slate-700 bg-white/70 dark:border-white/10 dark:text-white dark:bg-white/5"
            >
              {theme === "dark" ? (
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
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md border border-slate-300 text-slate-700 bg-white/70 dark:border-white/10 dark:text-white dark:bg-white/5"
              aria-label="Toggle menu"
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
          <div className="md:hidden mx-4 mb-4 rounded-xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl dark:bg-[#0a1022]/95 dark:border-white/10">
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
        )}
      </nav>

      <section
        id="home"
        className="min-h-screen relative overflow-hidden flex items-center"
      >
        <div className="orb bg-blue-500/40 w-96 h-96 -top-20 -left-20"></div>
        <div className="orb bg-cyan-400/30 w-80 h-80 top-1/3 right-0"></div>
        <div className="orb bg-violet-500/30 w-72 h-72 bottom-0 left-1/3"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
          <div
            ref={heroRef}
            className="reveal flex flex-col md:flex-row items-center gap-10 md:gap-16"
          >
            <img
              src={myPic}
              alt="Julry Mahilum"
              className="h-44 w-44 md:h-56 md:w-56 object-cover rounded-full border-4 border-blue-500/50 shadow-2xl shadow-blue-500/30"
            />
            <div className="text-center md:text-left">
              <h2 className="mt-3 text-blue-600 font-semibold text-lg dark:text-blue-300">
                AI Integration Developer.
              </h2>
              <h1 className="gradient-text font-bold font-serif text-4xl md:text-5xl mt-2 min-h-[3rem] md:min-h-[3.5rem]">
                {heroText || "\u00A0"}
              </h1>
              <p className="mt-3 text-slate-700 italic text-lg md:text-xl dark:text-slate-300">
                "Think with AI"
              </p>
              <div className="flex flex-col sm:flex-row mt-8 space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <a
                  href="/Mahilum_Resume.pdf"
                  download
                  className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-transparent text-blue-600 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 font-bold dark:text-blue-300 dark:border-blue-400"
                >
                  <img
                    src={resumeIcon}
                    alt="Document"
                    className="w-4 h-4 mr-2 dark:invert"
                  />
                  Download Resume
                </a>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-blue-500 text-white border border-blue-500 rounded-md hover:bg-blue-400 transition duration-300 font-bold"
                >
                  Contact Me
                  <img
                    src={rightArrow}
                    alt="Arrow"
                    className="w-4 h-4 ml-2 dark:invert"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={aboutRef} className="reveal">
            <h1 className="text-slate-900 font-bold font-serif text-4xl border-b-2 border-blue-500 dark:text-white">
              ABOUT ME
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-700 mt-8 leading-relaxed max-w-3xl dark:text-slate-300">
              Since Pandemic (2020) I suddenly get interested about vpn. I used
              vpn that time for "Free Internet" cause those were the hard times
              like everyone has no work. I'm also struggling to access the
              internet that's why I used vpn then came up of a random idea of
              making my own vpn application. From that moment on I started
              learning App Development first then ended up learning Web
              Development as well in college.
            </h2>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={skillsRef} className="reveal">
            <h1 className="text-slate-900 font-bold font-serif text-4xl border-b-2 border-blue-500 dark:text-white">
              SKILLS & TECHNOLOGIES
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 hover:shadow-blue-500/30 hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:shadow-blue-500/20 dark:hover:border-blue-500/50"
                >
                  <SkillIcon skill={skill} />
                  <span className="font-bold text-lg text-slate-800 dark:text-slate-200">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={projectsRef} className="reveal">
            <h1 className="text-slate-900 font-bold font-serif text-4xl border-b-2 border-blue-500 dark:text-white">
              PROJECTS
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-blue-500/30 hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:shadow-blue-500/20 dark:hover:border-blue-500/50">
                <div className="flex gap-2 mb-2 md:absolute md:top-6 md:right-6 md:mb-0">
                  <span className="text-blue-600 font-bold text-sm tracking-wider dark:text-blue-300">
                    JAVA
                  </span>
                  <span className="text-blue-600 font-bold text-sm tracking-wider dark:text-blue-300">
                    XML
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 md:pr-12 w-fit dark:text-white dark:border-white/10">
                  AI Notes
                </h2>
                <p className="text-slate-600 text-base mb-6 dark:text-slate-300">
                  Turn YouTube videos into study notes instantly. Just paste a
                  link, and the app automatically generates organized notes with
                  headings and bullet points — no more watching videos that are
                  hours long.
                </p>
                <a
                  href="https://github.com/worriee/SimpleNoteApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-transparent text-blue-600 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 font-bold dark:text-blue-300 dark:border-blue-400"
                >
                  View Repository
                </a>
              </div>

              <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-blue-500/30 hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:shadow-blue-500/20 dark:hover:border-blue-500/50">
                <div className="flex gap-2 mb-2 md:absolute md:top-6 md:right-6 md:mb-0">
                  <span className="text-blue-600 font-bold text-sm tracking-wider dark:text-blue-300">
                    JAVASCRIPT
                  </span>
                  <span className="text-blue-600 font-bold text-sm tracking-wider dark:text-blue-300">
                    REACT
                  </span>
                  <span className="text-blue-600 font-bold text-sm tracking-wider dark:text-blue-300">
                    PWA
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 md:pr-12 w-fit dark:text-white dark:border-white/10">
                  Web Loader
                </h2>
                <p className="text-slate-600 text-base mb-6 dark:text-slate-300">
                  A mobile-friendly app for buying and managing data (GB) load.
                  Users can submit orders and upload payment receipts, while
                  admins track and manage everything in real time through a
                  secure dashboard.
                </p>
                <a
                  href="https://github.com/worriee/web-loaderbyjimzxworrie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-transparent text-blue-600 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 font-bold dark:text-blue-300 dark:border-blue-400"
                >
                  View Repository
                </a>
              </div>

              <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-slate-200 hover:shadow-blue-500/30 hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 dark:bg-white/5 dark:border-white/10 dark:hover:shadow-blue-500/20 dark:hover:border-blue-500/50">
                <div className="flex gap-2 mb-2 md:absolute md:top-6 md:right-6 md:mb-0">
                  <span className="text-blue-600 font-bold text-sm tracking-wider dark:text-blue-300">
                    REACT
                  </span>
                  <span className="text-blue-600 font-bold text-sm tracking-wider dark:text-blue-300">
                    EXPRESS
                  </span>
                  <span className="text-blue-600 font-bold text-sm tracking-wider dark:text-blue-300">
                    PWA
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4 md:pr-12 w-fit dark:text-white dark:border-white/10">
                  TUON AI
                </h2>
                <p className="text-slate-600 text-base mb-6 dark:text-slate-300">
                  An AI study companion that lets you chat with AI, generate
                  notes on any topic, and test yourself with interactive
                  quizzes. Supports multiple AI models.
                </p>
                <a
                  href="https://github.com/worriee/quizmakerapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-transparent text-blue-600 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 font-bold dark:text-blue-300 dark:border-blue-400"
                >
                  View Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={contactRef} className="reveal">
            <h1 className="text-slate-900 font-bold font-serif text-4xl border-b-2 border-blue-500 dark:text-white">
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
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 font-bold text-lg md:text-xl hover:text-blue-600 hover:underline dark:text-white dark:hover:text-blue-300"
                    >
                      {c.label}
                    </a>
                  ) : (
                    <h2 className="text-slate-800 font-bold text-lg md:text-xl dark:text-slate-200">
                      {c.label}
                    </h2>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a1022]/60">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="https://web.facebook.com/itzworrie"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img
                src={facebook}
                alt="Facebook"
                className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer dark:invert"
              />
            </a>
            <a
              href="https://github.com/worriee"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img
                src={github}
                alt="GitHub"
                className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer dark:invert"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/julry-mahilum-91a47240a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src={linkedin}
                alt="LinkedIn"
                className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer dark:invert"
              />
            </a>
          </div>
          <p className="text-sm text-slate-500 text-center dark:text-slate-400">
            &copy; {new Date().getFullYear()} Julry Mahilum. <br /> All rights
            reserved.
          </p>
        </div>
      </footer>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 dark:bg-[#0a1022] dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Contact Me
              </h2>
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
            <form onSubmit={handleSend} className="px-6 py-5 space-y-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-500"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-500"
              />
              <textarea
                required
                rows={4}
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-slate-500"
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
                className="w-full px-5 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-300 font-bold disabled:opacity-60"
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
