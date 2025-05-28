import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const educations = [
  {
    degree: 'B.Tech in Computer Science Engineering',
    specialization: 'IoT & Cybersecurity',
    institution: 'C.V. Raman Global University',
    location: 'Bhubaneswar',
    period: '2021 – 2025',
    grade: 'CGPA: 8.03',
  },
  {
    degree: 'Higher Secondary Certificate',
    specialization: 'CBSE',
    institution: 'B.J.E.M School',
    location: 'Bhubaneswar',
    period: '2019 – 2020',
    grade: 'Percentage: 82%',
  },
  {
    degree: 'Secondary School Certificate',
    specialization: 'CBSE',
    institution: 'B.J.E.M School',
    location: 'Bhubaneswar',
    period: '2017 – 2018',
    grade: 'Percentage: 92.4%',
  }
];

const Education = () => {
  return (
    <section id="education" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <SectionTitle title="Education" subtitle="My Academic Background" />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations.map((edu, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-800 to-teal-600 h-3"></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <GraduationCap className="text-blue-800 dark:text-blue-300" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{edu.degree}</h3>
                    <p className="text-teal-600 dark:text-teal-400 font-medium">{edu.specialization}</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{edu.institution}</h4>
                
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{edu.location}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full font-medium text-gray-800 dark:text-gray-200">
                    {edu.grade}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
