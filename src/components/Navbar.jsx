import { useState } from 'react';
import { TfiAlignJustify } from 'react-icons/tfi';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl sm:text-2xl font-bold">BrandName</h1>

        <button
          className="sm:hidden text-white text-2xl"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle menu"
        >
          {showMenu ? <FaTimes /> : <TfiAlignJustify />}
        </button>

        <ul className="hidden sm:flex space-x-6 text-white font-medium">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to='/'>Home</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/services">Services</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {showMenu && (
        <ul className="flex flex-col space-y-6 text-white font-medium items-center mt-4 sm:hidden">
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to='/'>Home</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/services">Services</Link>
          </li>
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
