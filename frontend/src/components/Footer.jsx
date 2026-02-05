import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../public/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex gap-2 items-center">
              <img src={Logo} alt="Logo" className="w-10 h-10 dark:invert" />
              <h1 className="text-2xl font-bold">MindGarden</h1>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Share insights, tutorials, and ideas. Discover the latest trends in tech and creativity.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-center">
            <div>
              <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-red-500 transition-colors">Blogs</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-red-500 transition-colors">FAQs</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
              <div className="flex space-x-5 text-2xl text-gray-600 dark:text-gray-400">
                <a href="#" className="hover:text-blue-600 transition-colors"><FaFacebook /></a>
                <a href="#" className="hover:text-pink-600 transition-colors"><FaInstagram /></a>
                <a href="#" className="hover:text-blue-400 transition-colors"><FaTwitterSquare /></a>
                <a href="#" className="hover:text-red-600 transition-colors"><FaPinterest /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-red-500 font-semibold">MindGarden</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;