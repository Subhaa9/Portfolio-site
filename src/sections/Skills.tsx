import React, { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { Code, Server, Lock, Database, Globe, Lightbulb } from 'lucide-react';

const skillCategories = [
  {
    id: 'programming',
    name: 'Programming Languages',
    icon: <Code size={24} />,
    skills: [
      { name: 'PHP', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 75 },
      { name: 'Golang', level: 70 },
    ]
  },
  {
    id: 'webdev',
    name: 'Web Development',
    icon: <Globe size={24} />,
    skills: [
      { name: 'HTML/CSS', level: 90 },
      { name: 'React', level: 80 },
      { name: 'API Development', level: 85 },
      { name: 'Responsive Design', level: 90 },
      { name: 'UI/UX', level: 75 },
    ]
  },
  {
    id: 'security',
    name: 'Cybersecurity',
    icon: <Lock size={24} />,
    skills: [
      { name: 'Network Security', level: 80 },
      { name: 'Threat Detection', level: 75 },
      { name: 'Risk Management', level: 70 },
      { name: 'Cryptography', level: 75 },
      { name: 'Vulnerability Assessment', level: 80 },
    ]
  },
  {
    id: 'emerging',
    name: 'Emerging Technologies',
    icon: <Lightbulb size={24} />,
    skills: [
      { name: 'Blockchain', level: 75 },
      { name: 'Hyperledger', level: 70 },
      { name: 'Machine Learning', level: 65 },
      { name: 'IoT', level: 70 },
    ]
  },
  {
    id: 'backend',
    name: 'Backend & Database',
    icon: <Database size={24} />,
    skills: [
      { name: 'RESTful APIs', level: 85 },
      { name: 'SQL', level: 80 },
      { name: 'Flask', level: 75 },
      { name: 'TensorFlow', level: 65 },
      { name: 'Chaincode', level: 70 },
    ]
  },
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <SectionTitle title="Skills" subtitle="My Technical Expertise" />
        
        <div className="mt-12">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                className={`px-5 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-800 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className={activeCategory === category.id ? 'text-white' : 'text-teal-600 dark:text-teal-400'}>
                  {category.icon}
                </span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  activeCategory === category.id ? 'block' : 'hidden'
                }`}
              >
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">{skill.name}</h4>
                      <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-blue-800 to-teal-500 h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;