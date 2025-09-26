
import React from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onAuthButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onAuthButtonClick }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
          104的<span className="text-blue-500">30公分</span>們
        </h1>
        <button
          onClick={onAuthButtonClick}
          className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
            isLoggedIn
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoggedIn ? '後台登出' : '後台登入'}
        </button>
      </div>
    </header>
  );
};

export default Header;