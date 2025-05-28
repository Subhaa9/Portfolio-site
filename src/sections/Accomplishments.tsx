import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { Award, CheckCircle } from 'lucide-react';

const accomplishments = [
  {
    title: 'Silver Medalist',
    organization: 'Odisha Skills',
    field: 'Web Technology',
    year: '2024',
    icon: <Award className="text-amber-500" size={32} />,
    hoverBg: 'hover:bg-yellow-100 dark:hover:bg-yellow-900',
    hoverShadow: 'hover:shadow-yellow-300',
    certificateLink: 'https://drive.google.com/file/d/1F77vwh6Ac3YxTp4s-Y0jCDRV6Q2WYYEr/view?usp=sharing',
  },
  {
    title: 'CCNA',
    organization: 'Cisco Networking Academy',
    field: 'Switching, Routing, and Wireless Essentials',
    year: '2022',
    icon: <CheckCircle className="text-green-600" size={32} />,
    hoverBg: 'hover:bg-green-100 dark:hover:bg-green-900',
    hoverShadow: 'hover:shadow-green-300',
    certificateLink: 'https://drive.google.com/file/d/12EESXWcRcp5OwA69mnYyeVoQGVkNVuXR/view?usp=sharing',
  },
  {
    title: 'Java Full Stack',
    organization: 'Wipro Talent Next',
    field: 'Java',
    year: '2024',
    icon: <CheckCircle className="text-blue-600" size={32} />,
    hoverBg: 'hover:bg-blue-100 dark:hover:bg-blue-900',
    hoverShadow: 'hover:shadow-blue-300',
    certificateLink: 'https://drive.google.com/file/d/1sCHL6SwYBjSTr-NajUVHNudKrKun5eRM/view?usp=sharing',
  },
  {
    title: 'Practical Cyber Security',
    organization: 'NPTEL',
    field: 'Cyber Security Practitioners',
    year: '2024',
    icon: <CheckCircle className="text-purple-600" size={32} />,
    hoverBg: 'hover:bg-purple-100 dark:hover:bg-purple-900',
    hoverShadow: 'hover:shadow-purple-300',
    certificateLink: 'https://drive.google.com/file/d/1eavBNZFfrC0cklI1bqyNBNYgTu4f4-oq/view?usp=sharing',
  },
];

const Accomplishments = () => {
  return (
    <section id="accomplishments" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <SectionTitle title="Accomplishments" subtitle="My Achievements & Certifications" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {accomplishments.map((item, index) => (
            <a
              key={index}
              href={item.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-all duration-300 transform hover:-translate-y-1 ${item.hoverBg} ${item.hoverShadow}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {item.icon}
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{item.year}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">{item.organization}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.field}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;
