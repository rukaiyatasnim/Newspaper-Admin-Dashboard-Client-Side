import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full bg-neutral-900 text-neutral-200 py-8">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Quick Links */}
                <nav className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
                    <a className="hover:text-white transition" href="/about">About</a>
                    <a className="hover:text-white transition" href="/contact">Contact</a>
                    <a className="hover:text-white transition" href="/privacy-policy">Privacy</a>
                </nav>

                {/* Social Icons */}
                <div className="flex gap-4 text-xl">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                        <FaFacebook />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">
                        <FaTwitter />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
            <div className="mt-4 text-center text-xs sm:text-sm text-neutral-400">
                © {new Date().getFullYear()} Newsly. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
