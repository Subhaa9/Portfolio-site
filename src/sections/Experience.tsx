import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { CalendarIcon, MapPin, FileText } from 'lucide-react';

const experiences = [
  {
    title: 'Web Developer & Networking Intern',
    company: 'Indian Oil Corporation Limited',
    location: 'Bhubaneswar',
    period: 'June 2024 – July 2024',
    description: [
      'Developed a high-performance RESTful API, reducing the response time by 95% (200 to 10 ms).',
      'Designed and implemented a modular web application that optimizes responsive design and user experience.'
    ],
    certificateLink: 'https://drive.google.com/file/d/1eXE0fjhzl5vnWG10JcpAgbyR1nDijGda/view?usp=sharing'
  },
  {
    title: 'Cybersecurity Intern',
    company: 'Edunet Foundation',
    location: 'Remote',
    period: 'June 2023 – July 2023',
    description: [
      'Built a keylogger application to strengthen cybersecurity skills.',
      'Gained hands-on experience in threat detection, risk management, and vulnerability assessment.'
    ],
    certificateLink: 'https://drive.google.com/file/d/1J7YLQ1hY-JF71jBhgp7eoMK8zEVTWL00/view?usp=sharing'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <SectionTitle title="Experience" subtitle="My Professional Journey" />

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-full"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-[-8px] md:left-1/2 transform md:translate-x-[-50%] w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 border-4 border-white dark:border-gray-900 shadow-lg"></div>

                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 ml-6 md:ml-0' : 'md:pl-12 ml-6 md:ml-auto'}`}>
                  <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md transition duration-300 hover:shadow-xl hover:scale-[1.02] border border-blue-100 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{exp.title}</h3>
                      <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 text-xs rounded-full font-semibold">
                        {index === 0 ? 'Latest' : ''}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">{exp.company}</h4>

                    <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4 list-disc list-inside">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-700 dark:text-gray-300">{item}</li>
                      ))}
                    </ul>

                    {exp.certificateLink && (
                      <a
                        href={exp.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <FileText size={16} /> View Certificate
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
