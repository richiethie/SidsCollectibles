import React from 'react';
import Link from 'next/link';
import { Facebook, Star, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaEtsy } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">S</span>
              </div>
              <div className="ml-3">
                <span className="text-xl sm:text-2xl font-bold">SidsCollectibles</span>
                <p className="text-blue-400 text-sm">Premium Pokémon Cards</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              Your trusted destination for premium Pokémon cards, expert restoration services, and professional grading preparation.
            </p>
            
            {/* Platform Links - Mobile Optimized */}
            <div className="space-y-3 mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-white">Shop Our Collection</h4>
              <div className="grid grid-cols-1 gap-3">
                <a
                  href="https://www.facebook.com/SidsCollectiblesShop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-gray-700 transition-colors group"
                >
                  <Facebook className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white block">Facebook Shop</span>
                    <span className="text-sm text-gray-400">Full Inventory</span>
                  </div>
                </a>
                <a
                  href="https://www.etsy.com/shop/SidsCollectiblesShop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-orange-400 hover:bg-gray-700 transition-colors group"
                >
                  <FaEtsy className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white block">Etsy Store</span>
                    <span className="text-sm text-gray-400">Secure Checkout</span>
                  </div>
                </a>
                <a
                  href="https://www.whatnot.com/user/sidscollectibles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 bg-gray-800 rounded-lg text-gray-300 hover:text-purple-400 hover:bg-gray-700 transition-colors group"
                >
                  <Star className="w-5 h-5 mr-3 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-white block">WhatNot</span>
                    <span className="text-sm text-gray-400">Live Auctions</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:block hidden">
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Buy Pokémon Cards
                </Link>
              </li>
              <li>
                <Link href="/repairs" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Card Restoration
                </Link>
              </li>
              <li>
                <Link href="/repairs" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Grading Preparation
                </Link>
              </li>
              <li>
                <Link href="/repairs" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Professional Appraisal
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Mobile Optimized */}
          <div className="lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Get in Touch</h3>
            <div className="space-y-4">
              <a 
                href="tel:+12242564715"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <p className="text-gray-300 text-sm">(224) 256-4715</p>
                </div>
              </a>
              
              <a 
                href="mailto:info@sidscollectibles.com"
                className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300 text-sm truncate">info@sidscollectibles.com</p>
                </div>
              </a>

              <div className="flex items-center p-3 bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Response Time</p>
                  <p className="text-gray-300 text-sm">Usually within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 text-sm leading-relaxed">
                Questions about cards, repairs, or services? We're here to help build your collection.
              </p>
            </div>
          </div>

          {/* Mobile Services Menu */}
          <div className="lg:hidden border-t border-gray-800 pt-6">
            <h3 className="text-base font-semibold mb-4 text-white">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/shop" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Buy Cards
              </Link>
              <Link href="/repairs" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Restoration
              </Link>
              <Link href="/repairs" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Grading Prep
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Contact
              </Link>
              <Link href="/repairs" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Appraisal
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Indicators - Mobile Optimized */}
        <div className="border-t border-gray-800 mt-8 pt-6 sm:mt-12 sm:pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">Authenticity Guaranteed</p>
                <p className="text-gray-400 text-xs sm:text-sm">Every card verified</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">Secure Transactions</p>
                <p className="text-gray-400 text-xs sm:text-sm">Safe & protected</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm sm:text-base">Fast Shipping</p>
                <p className="text-gray-400 text-xs sm:text-sm">Professional packaging</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Mobile Optimized */}
        <div className="border-t border-gray-800 mt-6 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} SidsCollectibles. All rights reserved.
            </p>
            <div className="flex flex-row space-y-0 space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors text-center sm:text-left">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors text-center sm:text-left">
                Terms of Service
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-white text-xs sm:text-sm transition-colors text-center sm:text-left">
                Returns & Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;