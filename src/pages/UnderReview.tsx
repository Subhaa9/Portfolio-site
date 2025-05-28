import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnderReview: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <BookOpen className="text-indigo-600" size={40} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Paper Under Review
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-md mb-6">
          This paper is currently under review and will be published soon. Please check back later.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnderReview;
