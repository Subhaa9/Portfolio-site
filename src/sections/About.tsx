import React from 'react';
import { Award, BookOpen, Code, Shield, Mail, Phone } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        <SectionTitle title="About Me" subtitle="My Background" />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-12">
          <div className="md:col-span-7 space-y-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I am a passionate Web Developer and Cybersecurity Specialist with expertise in building scalable, 
              secure web applications and IT systems. My technical background includes proficiency in API development, 
              responsive design, and network security.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I enjoy exploring emerging technologies like Blockchain and implementing robust Cybersecurity practices 
              to create efficient solutions. My goal is to contribute to developing innovative technological solutions 
              that are both secure and user-friendly.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="text-teal-600 dark:text-teal-400" size={18} />
                  <a 
                    href="mailto:subhashreeparida743@gmail.com" 
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-teal-400 transition-colors duration-300"
                  >
                    subhashreeparida743@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-teal-600 dark:text-teal-400" size={18} />
                  <a 
                    href="tel:+919437219501" 
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-teal-400 transition-colors duration-300"
                  >
                    +91 9437219501
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <Code className="text-blue-800 dark:text-blue-400 mb-3" size={28} />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Web Development</h3>
                <p className="text-gray-600 dark:text-gray-300">Building responsive, scalable web applications.</p>
              </div>
              
              <div className="bg-teal-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <Shield className="text-teal-600 dark:text-teal-400 mb-3" size={28} />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Cybersecurity</h3>
                <p className="text-gray-600 dark:text-gray-300">Implementing robust security practices.</p>
              </div>
              
              <div className="bg-amber-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <BookOpen className="text-amber-600 dark:text-amber-400 mb-3" size={28} />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Education</h3>
                <p className="text-gray-600 dark:text-gray-300">CSE with IoT & Cybersecurity focus.</p>
              </div>
              
              <div className="bg-indigo-50 dark:bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <Award className="text-indigo-600 dark:text-indigo-400 mb-3" size={28} />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Achievements</h3>
                <p className="text-gray-600 dark:text-gray-300">Silver Medalist in Web Technology.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;