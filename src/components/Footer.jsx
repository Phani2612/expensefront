import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-8 mt-10 w-full overflow-x-auto">
      <div className="max-w-6xl mx-auto min-w-[300px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm break-words">
        {/* About Section */}
        <div className="min-w-[200px]">
          <h2 className="text-lg font-semibold mb-3">About Us</h2>
          <p className="text-xs">
            BrandName is committed to delivering high-quality services that
            bring value and delight to our customers.
          </p>
        </div>

        {/* Quick Links */}
        <div className="min-w-[150px]">
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 cursor-pointer">About</li>
            <li className="hover:text-gray-300 cursor-pointer">Services</li>
            <li className="hover:text-gray-300 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="min-w-[180px]">
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2 break-all">
              <FaPhone /> +91 12345 67890
            </li>
            <li className="flex items-center gap-2 break-all">
              <FaEnvelope /> support@brandname.com
            </li>
            <li className="flex items-center gap-2 break-words">
              <FaMapMarkerAlt /> Bengaluru, India
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="min-w-[150px]">
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-xl mt-2">
            <FaFacebook className="hover:text-gray-300 cursor-pointer" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs border-t border-white/30 pt-4 whitespace-nowrap">
        &copy; 2024 BrandName. All rights reserved.
      </div>
    </footer>
  );
};
