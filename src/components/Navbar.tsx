import React, { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
}

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Accomplishments", href: "#accomplishments" },
  { label: "Publications", href: "#publications" },  // <-- NEW nav item added here
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC<NavbarProps> = ({ isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg ${
        isScrolled
          ? "bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 text-white shadow-lg py-2"
          : "bg-white/60 dark:bg-gray-900/60 text-gray-900 dark:text-gray-100 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-extrabold tracking-tight">
          <span className="text-teal-600 dark:text-teal-400">S</span>P
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={closeMenu}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
                isScrolled
                  ? "hover:bg-white/10"
                  : "hover:bg-blue-100 dark:hover:bg-gray-800"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-blue-100 dark:hover:bg-gray-800"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <a
              href="#hero"
              className="text-2xl font-bold text-blue-800 dark:text-white"
              onClick={closeMenu}
            >
              <span className="text-teal-600 dark:text-teal-400">S</span>P
            </a>
            <button onClick={toggleMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={closeMenu}
                className="px-4 py-3 text-lg font-medium text-gray-800 dark:text-white hover:bg-teal-100 dark:hover:bg-teal-900 rounded-md transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex justify-center gap-4 pt-8 pb-12">
            <a
              href="https://github.com/Subhaa9"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/subhashree-parida"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
