import { useState, useEffect, useRef } from 'react';
import myPic from './assets/my-pic.png';
import myPic2 from './assets/my-picc.jpg';
import document from './assets/document.png';
import emaillogo from './assets/email-logo.png';
import phonelogo from './assets/phone-logo.png';
import menu from './assets/menu.png';
import arrow from './assets/right-arrow.png';
import fb from './assets/fb-logo.png';
import github from './assets/github.png';
import insta from './assets/instagram.png';
import js from './assets/js.png';
import java from './assets/java.png';
import c from './assets/c.png';
import html from './assets/html.png';
import xml from './assets/xml.png';
import css from './assets/css.png';
import react from './assets/react.png';
import tailwind from './assets/tailwind.png';


export default function App() {
  const [activeLink, setActiveLink] = useState('#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [homeText1, setHomeText1] = useState('');
  const [homeText2, setHomeText2] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = content.scrollTop + 150;

      let currentSection = '#home';
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section) {
          if (section.offsetTop <= scrollPosition) {
            currentSection = `#${id}`;
          }
        }
      }
      setActiveLink(currentSection);
    };

    content.addEventListener('scroll', handleScroll);
    return () => {
      content.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (activeLink === '#home') {
      setHomeText1('');
      setHomeText2('');
      const text1 = "Hi, I'm Julry.";
      const text2 = "A beginner Web and App developer.";
      let i = 0;
      let j = 0;
      let timer1, timer2, timeout;

      timer1 = setInterval(() => {
        setHomeText1(text1.substring(0, i + 1));
        i++;
        if (i === text1.length) {
          clearInterval(timer1);
          timeout = setTimeout(() => {
            timer2 = setInterval(() => {
              setHomeText2(text2.substring(0, j + 1));
              j++;
              if (j === text2.length) {
                clearInterval(timer2);
              }
            }, 50); // Medyo mas paspas gamay ang ikaduhang text
          }, 300); // 300ms nga delay ayha mo-start ang 2nd text
        }
      }, 100); // 100ms delay sa every letter sa 1st text
      return () => {
        clearInterval(timer1);
        clearInterval(timer2);
        clearTimeout(timeout);
      };
    }
  }, [activeLink]);

  return (
    <div className="relative min-h-screen md:flex">
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 bg-white rounded-md shadow-lg border border-gray-300 transition duration-300 hover:bg-gray-100">
          <img src={menu} alt="Menu" className="h-8 w-8 bg-white" />
        </button>
      </div>

      {/*Overlay para ma-close ang menu ig click sa gawas*/}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div className={`fixed top-0 left-0 z-50 md:relative w-2/3 md:w-1/4 ${isMenuOpen ? 'flex' : 'hidden md:flex'} flex-col h-screen bg-gray-100 shadow-2xl md:shadow-none`}>
        <div className="flex-grow overflow-y-auto min-h-0 p-8">
          <img src={myPic} alt="My Pic" className="h-32 w-32 md:h-28 md:w-28 object-cover" />
          <div className="mt-10">
            <h3 className="text-black font-bold font-serif text-2xl md:text-2xl mt-2 md:mt-5">Julry Mahilum</h3>
            <h3 className="mt-3">Web & App Developer.</h3>
          </div>
          <ul className="mt-10 space-y-5">
            <li>
              <a href="#home" onClick={() => { setActiveLink('#home'); setIsMenuOpen(false); }} className={`text-lg ${activeLink === '#home' ? 'border-b-2 border-black' : ''}`}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => { setActiveLink('#about'); setIsMenuOpen(false); }} className={`text-lg ${activeLink === '#about' ? 'border-b-2 border-black' : ''}`}>
                About
              </a>
            </li>
            <li>
              <a href="#skills" onClick={() => { setActiveLink('#skills'); setIsMenuOpen(false); }} className={`text-lg ${activeLink === '#skills' ? 'border-b-2 border-black' : ''}`}>
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => { setActiveLink('#projects'); setIsMenuOpen(false); }} className={`text-lg ${activeLink === '#projects' ? 'border-b-2 border-black' : ''}`}>
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => { setActiveLink('#contact'); setIsMenuOpen(false); }} className={`text-lg ${activeLink === '#contact' ? 'border-b-2 border-black' : ''}`}>
                Contacts
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-auto bg-gray-300 px-8 pb-8 pt-6">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://web.facebook.com/itzworrie" target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="Facebook" className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
            </a>
            <a href="https://github.com/worriee" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="GitHub" className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/itz.jmworrie/" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="Instagram" className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
            </a>
          </div>
          <p className="text-sm text-gray-700 text-center">
            &copy; {new Date().getFullYear()} Julry Mahilum. <br /> All rights reserved.
          </p>
        </div>
      </div>

      <div ref={contentRef} className="w-full md:w-3/4 p-8 h-screen overflow-y-auto">
        {activeLink === '#home' && (
        <div id="home" className="h-screen -m-8 bg-cover bg-center flex flex-col justify-center items-center" style={{ backgroundImage: `url(${myPic2})`}}>
          <h2 className="text-gray-300 [-webkit-text-stroke:1px_black] text-2xl md:text-3xl font-bold bg-opacity-50 px-4 py-2 rounded min-h-[3rem] md:min-h-[3.5rem] flex items-center text-center">{homeText1 || '\u00A0'}</h2>
          <h2 className="text-gray-300 [-webkit-text-stroke:1px_black] text-2xl md:text-3xl font-bold bg-opacity-50 px-4 py-2 rounded min-h-[3rem] md:min-h-[3.5rem] flex items-center text-center">{homeText2 || '\u00A0'}</h2>
          <div className="flex flex-row mt-6 space-x-4">
            <button onClick={() => setActiveLink('#about')} className="flex items-center px-4 py-2 bg-transparent text-black border border-black rounded-md hover:bg-gray-300 hover:text-black transition duration-300 [-webkit-text-stroke:1px_black]">
              About Me
              <img src={arrow} alt="Arrow" className="w-5 h-5 ml-2" />
            </button>
            <a href="/Mahilum-Resume.docx" download className="flex items-center px-4 py-2 bg-transparent text-black border border-black rounded-md hover:bg-gray-300 hover:text-black transition duration-300 [-webkit-text-stroke:1px_black]">
              <img src={document} alt="Document" className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </div>
        </div>
        )}

        {activeLink === '#about' && (
        <div id="about" className="mt-16 md:mt-10 text-left">
          <h1 className="text-black font-bold font-serif text-4xl md:text-4xl border-b-2 border-black">ABOUT ME</h1>
          <h2 className="text-xl md:text-2xl mx-4 md:mx-10 p-4 md:p-10">Since Pandemic (2020) I'm at home (quarantine) bored then suddenly get interested about vpn. I used vpn that time for "Free Internet" cause those were the hard times and my parents currently have no work. Also I'm struggling to access the internet that's why I used vpn so I can access the internet free and unlimited. Then I came up of an idea of making my own vpn application. From that moment on I started learning App Development first then ended up learning Web Development as well in college.</h2>
        </div>
        )}

        {activeLink === '#skills' && (
        <div id="skills" className="mt-16 md:mt-0 text-left">
          <h1 className="text-black font-bold font-serif text-4xl md:text-4xl border-b-2 border-black">SKILLS & TECHNOLOGIES</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10 mx-4 md:mx-0">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={html} alt="HTML" className="h-16 w-16 object-contain mb-3" />
              <span className="font-bold text-lg text-black">HTML</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={css} alt="CSS" className="h-16 w-16 object-contain mb-3" />
              <span className="font-bold text-lg text-black">CSS</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={js} alt="JavaScript" className="h-16 w-16 object-contain mb-3" />
              <span className="font-bold text-lg text-black">JavaScript</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={react} alt="React" className="h-16 w-16 object-contain mb-3" />
              <span className="font-bold text-lg text-black">React</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={tailwind} alt="Tailwind CSS" className="h-16 w-16 object-contain mb-3" />
              <span className="font-bold text-lg text-black">Tailwind</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={java} alt="Java" className="h-16 w-16 object-contain mb-3" />
              <span className="font-bold text-lg text-black">Java</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={c} alt="C" className="h-16 w-16 object-contain mb-3" />
              <span className="font-bold text-lg text-black">C</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <img src={xml} alt="XML" className="h-16 w-16 object-contain mb-3" />
              <span className="font-bold text-lg text-black">XML</span>
            </div>
          </div>
        </div>
        )}

        {activeLink === '#projects' && (
        <div id="projects" className="mt-16 md:mt-0 text-left pb-30">
          <h1 className="text-black font-bold font-serif text-4xl md:text-4xl border-b-2 border-black">PROJECTS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mx-4 md:mx-0">
            <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
              <span className="absolute top-6 right-6 text-gray-500 font-bold text-sm tracking-wider">JAVA</span>
              <h2 className="text-2xl font-bold text-black border-b border-gray-300 pb-2 mb-4 pr-12 w-fit">AI Notes</h2>
              <p className="text-gray-700 text-base mb-6">
                A smart note-taking application powered by Gemini AI. Features include automatic summarization from a YouTube Video, and an intuitive user interface designed to maximize productivity.
              </p>
              <a href="https://github.com/worriee/SimpleNoteApp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-transparent text-black border border-black rounded-md hover:bg-gray-200 transition duration-300 font-bold">
                View Repository
              </a>
            </div>
          </div>
        </div>
        )}

        {activeLink === '#contact' && (
        <div id="contact" className="mt-16 md:mt-0 text-left pb-10">
          <h1 className="text-black font-bold font-serif text-4xl md:text-4xl border-b-2 border-black">CONTACTS</h1>
          <div className="flex flex-col mt-10 mx-4 md:mx-10 space-y-6">
            <div className="flex flex-row items-center space-x-6">
              <img src={emaillogo} alt="Email Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <h2 className="text-black font-bold text-lg md:text-xl">julrymahilum12@gmail.com</h2>
            </div>
            <div className="flex flex-row items-center space-x-6">
              <img src={phonelogo} alt="Phone Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <h2 className="text-black font-bold text-lg md:text-xl">09859722995</h2>
            </div>
            <div className="flex flex-row items-center space-x-6">
              <img src={fb} alt="Facebook Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <a href="https://web.facebook.com/itzworrie" target="_blank" rel="noopener noreferrer" className="text-black font-bold text-lg md:text-xl hover:underline">
                Julry Mahilum
              </a>
            </div>
            <div className="flex flex-row items-center space-x-6">
              <img src={github} alt="GitHub Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <a href="https://github.com/worriee" target="_blank" rel="noopener noreferrer" className="text-black font-bold text-lg md:text-xl hover:underline">
                Worriee
              </a>
            </div>
            <div className="flex flex-row items-center space-x-6">
              <img src={insta} alt="Instagram Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              <a href="https://www.instagram.com/itz.jmworrie/" target="_blank" rel="noopener noreferrer" className="text-black font-bold text-lg md:text-xl hover:underline">
                Julry M.
              </a>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
