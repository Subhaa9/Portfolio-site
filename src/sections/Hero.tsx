import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

type TypewriterProps = {
  text: string;
  speed?: number;
  onTypingEnd?: () => void;
};

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, onTypingEnd }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    let currentText = "";
    const interval = setInterval(() => {
      if (index < text.length) {
        currentText += text.charAt(index);
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(interval);
        if (onTypingEnd) onTypingEnd();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onTypingEnd]);

  return <>{displayedText}</>;
};

const Hero: React.FC = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-16 md:py-0"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Section */}
          <div className="md:col-span-7 space-y-6">
            <p className="text-lg md:text-xl text-teal-600 dark:text-teal-400 font-medium">
              Hello, I'm
            </p>

            {/* Name */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white min-h-[3rem]">
              {!showTitle ? (
                <Typewriter
                  text="Subhashree Parida"
                  speed={40}
                  onTypingEnd={() => setShowTitle(true)}
                />
              ) : (
                "Subhashree Parida"
              )}
            </h1>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 dark:text-gray-300 min-h-[2.5rem]">
              {showTitle && !showDesc ? (
                <Typewriter
                  text="(Internet of Things & Cyber Security)"
                  speed={25}
                  onTypingEnd={() => setShowDesc(true)}
                />
              ) : showDesc ? (
                "(Internet of Things & Cyber Security)"
              ) : (
                ""
              )}
            </h2>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed min-h-[5rem]">
              {showDesc ? (
                <Typewriter
                  text="Experienced in building scalable, secure web applications and IT systems. Passionate about API development, responsive design, and network security."
                  speed={15}
                />
              ) : (
                ""
              )}
            </p>

            {/* Buttons and Social Icons */}
            {showDesc && (
              <>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-2 font-medium"
                  >
                    <Mail size={18} />
                    Contact Me
                  </a>
                  <a
                    href="src/sections/resume.pdf"
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors duration-300 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="https://github.com/Subhaa9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-teal-400 transition-colors duration-300"
                  >
                    <Github size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/subhashreeparida743/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-teal-400 transition-colors duration-300"
                  >
                    <Linkedin size={22} />
                  </a>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin size={18} />
                    <a
                      href="https://www.google.com/maps/place/Bhubaneswar,+Odisha"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Bhubaneswar, India</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Image Section */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-teal-500 dark:border-teal-400 shadow-xl">
              <img
                src="src/sections/Profile.jpg"
                alt="Subhashree Parida"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
