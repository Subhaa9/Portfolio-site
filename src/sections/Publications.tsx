import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const publications = [
  {
    title: 'Electronic Health Record Management System',
    journal: 'Under Review',
    year: '2025',
    description:
      'A Hyperledger-based EHR system implementing regulatory compliance with HIPAA, GDPR, HL7, and JWT authentication.',
    icon: <BookOpen className="text-indigo-600" size={32} />,
    hoverBg: 'hover:bg-indigo-100 dark:hover:bg-indigo-900',
    hoverShadow: 'hover:shadow-indigo-300',
    paperLink: '/under-review', // Internal route for under-review papers
    publicationLink: '/under-review', // Leave empty if not published yet
  },
];

const Publications = () => {
  return (
    <section
      id="publications"
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col justify-center"
    >
      <div className="container mx-auto max-w-4xl">
        <SectionTitle title="Publications" subtitle="My Research & Papers" />

        {publications.map((item, index) => (
          <div
            key={index}
            className={`mx-auto mt-12 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg transition-all duration-300 transform ${item.hoverBg} ${item.hoverShadow}`}
            style={{ maxWidth: '800px', minHeight: '320px' }}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">{item.icon}</div>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{item.year}</span>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 text-center">{item.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-4 text-center">{item.journal}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 text-center">{item.description}</p>

            <div className="flex justify-center gap-6">
              {/* Paper Link Button */}
              {item.paperLink ? (
                <Link
                  to={item.paperLink}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition"
                >
                  Paper Link
                </Link>
              ) : (
                <button
                  disabled
                  className="px-6 py-2 bg-indigo-400 text-white font-semibold rounded-md cursor-not-allowed"
                  title="Paper link not available"
                >
                  Paper Link
                </button>
              )}

              {/* Publication Link Button */}
              {item.publicationLink ? (
                <a
                  href={item.publicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition"
                >
                  Publication Link
                </a>
              ) : (
                <button
                  disabled
                  className="px-6 py-2 bg-indigo-400 text-white font-semibold rounded-md cursor-not-allowed"
                  title="Publication link not available"
                >
                  Publication Link
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;
