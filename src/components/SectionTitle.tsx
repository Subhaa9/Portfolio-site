import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
      <p className="text-teal-600 dark:text-teal-400 text-lg">{subtitle}</p>
      <div className="w-24 h-1 bg-blue-800 mx-auto mt-4 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;