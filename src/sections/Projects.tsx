import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { ExternalLink, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'Stock Market Prediction',
    description: 'Developed a stock price prediction model using AdaBoost regression, achieving 97.58% precision with technical indicators such as RSI, MACD, and Bollinger bands.',
    technologies: ['Python', 'Machine Learning', 'AdaBoost', 'Technical Analysis'],
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://github.com/Subhaa9/StockMarket_ADABoost'
  },
  {
    title: 'Network Monitoring Web App',
    description: 'Built a real-time network status monitoring system, logging downtime history and network details.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    image: 'https://images.pexels.com/photos/7887800/pexels-photo-7887800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: 'https://github.com/Subhaa9/Network-Monitering-Web-App'
  },
  {
    title: 'Keylogger Application',
    description: 'Developed a cybersecurity tool for educational purposes to understand security vulnerabilities and protection mechanisms.',
    technologies: ['Python', 'Cybersecurity', 'System Programming'],
    image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#'
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        <SectionTitle title="Projects" subtitle="My Recent Work" />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project cards */}
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 ${
                activeProject === index 
                  ? 'ring-2 ring-blue-800 dark:ring-blue-500 scale-105' 
                  : 'hover:shadow-lg hover:-translate-y-1'
              }`}
              onMouseEnter={() => setActiveProject(index)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <a 
                    href={project.link} 
                    className="inline-flex items-center text-blue-800 dark:text-blue-400 font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-300"
                  >
                    View Project <ChevronRight size={18} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;