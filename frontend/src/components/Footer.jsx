import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Github, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo + About */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-2xl font-bold text-blue-700">Hirely</h1>
          <p className="text-sm text-gray-600 mt-3">
            Find your dream job from top companies.  
            Apply, track, and succeed — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/jobs" className="hover:text-blue-600">Browse Jobs</Link></li>
            <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-600">Sign Up</Link></li>
            <li><Link to="/profile" className="hover:text-blue-600">Profile</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="text-xl font-semibold mb-3">Connect With Us</h2>
          <div className="flex items-center gap-4 mt-3 justify-center md:justify-start">
            <a href="#" className="p-2 rounded-full bg-white shadow hover:scale-110 transition">
              <Linkedin className="h-5 w-5 text-blue-700" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:scale-110 transition">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white shadow hover:scale-110 transition">
              <Instagram className="h-5 w-5 text-pink-500" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t pt-5">
        © {new Date().getFullYear()} Hirely — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
