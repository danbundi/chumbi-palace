import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link to="/" className="text-gray-500 hover:text-gray-700 flex items-center">
            <Home size={16} className="mr-1" />
            Home
          </Link>
        </li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

          return (
            <li key={name} className="flex items-center">
              <ChevronRight size={16} className="text-gray-400" />
              {isLast ? (
                <span className="ml-2 text-gray-900 font-medium">{displayName}</span>
              ) : (
                <Link 
                  to={routeTo} 
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;