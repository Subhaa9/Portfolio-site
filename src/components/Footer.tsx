import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 100; // 100px from bottom
      setIsVisible(scrollPosition >= threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer
      className={`
        fixed bottom-0 left-0 right-0 z-40
        transition-opacity duration-500 ease-in-out
        backdrop-blur-lg
        py-4
        text-white
        bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 shadow-lg
        ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      aria-hidden={!isVisible}
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <a
          href="#hero"
          className="text-2xl font-extrabold tracking-tight flex items-center"
          aria-label="Go to top"
        >
          
        </a>

        <p className="mt-3 md:mt-0 text-sm md:text-base flex items-center gap-1">
          © {currentYear} Subhashree Parida.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
