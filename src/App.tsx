import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Accomplishments from './sections/Accomplishments';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import Publications from './sections/Publications';
import UnderReview from './pages/UnderReview';

// Define the props type for HomePage component
interface HomePageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

function HomePage({ isDarkMode, toggleTheme }: HomePageProps) {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar isDarkMode={isDarkMode} />
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Accomplishments />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route path="/under-review" element={<UnderReview />} />
      </Routes>
    </Router>
  );
}

export default App;
