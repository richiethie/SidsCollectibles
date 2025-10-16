'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { ShoppingCart, Phone, Menu, X, Search } from 'lucide-react';
import { useCart } from './CartContext';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartState = useCart();
  const pathname = usePathname();

  // Navigation with Repair & Conditioning tab
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Repair & Conditioning', href: '/explanation' },
    { name: 'Shop', href: '/shop' },
    { name: 'Repairs', href: '/repairs' },
    { name: 'About', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-gradient-to-r from-purple-700 via-blue-500 to-yellow-300 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-row justify-between items-center h-24">
          {/* Left Section: Logo and Bible Verse */}
          <div className="flex items-center flex-shrink-0 w-1/3 min-w-[220px]">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-yellow-300 hover:bg-purple-700 rounded-lg transition-colors mr-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <Link href="/" className="flex items-center group">
                  <div className="w-10 h-10 bg-purple-700 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <span className="text-yellow-300 font-bold text-xl">S</span>
                  </div>
                  <div className="ml-3 flex flex-col items-start">
                    <span className="text-xl font-bold text-white leading-none drop-shadow whitespace-nowrap">
                      SidsCollectibles
                    </span>
                    {/* Bible Verse */}
                    <span className="hidden md:block text-[10px] text-yellow-100 leading-none drop-shadow whitespace-nowrap mt-1">
                      Psalm 23: "The Lord is my shepherd; I shall not want..."
                    </span>
                  </div>
                </Link>
          </div>

          {/* Center Section: Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-grow space-x-2 text-base">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'px-4 py-2 font-medium rounded-lg transition-all duration-200',
                  isActive(item.href)
                    ? 'text-yellow-300 bg-purple-700 border border-yellow-300'
                    : 'text-white hover:text-yellow-300 hover:bg-blue-600'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section: Search, Cart, Login */}
          <div className="flex items-center justify-end w-1/3 min-w-[220px] space-x-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-white cursor-pointer hover:text-yellow-300 hover:bg-purple-700 rounded-lg transition-colors"
            >
              {isSearchOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Search className="w-6 h-6" />
              )}
            </button>
            <Link
              href="/shop/cart"
              className="relative p-2 text-white hover:text-yellow-300 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {Array.isArray(cartState.items) && cartState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-300 text-purple-700 text-xs rounded-full flex items-center justify-center font-bold">
                  {cartState.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-base font-medium rounded-lg bg-yellow-300 text-purple-700 hover:bg-purple-700 hover:text-yellow-300 transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-700 via-blue-500 to-yellow-300 border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'text-yellow-300 bg-purple-700 border border-yellow-300'
                    : 'text-white hover:text-yellow-300 hover:bg-blue-600'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile-only actions */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-4 text-sm text-yellow-100 mb-2">Need help? Call us:</p>
              <a
                href="tel:+12242564715"
                className="flex items-center w-full px-4 py-3 text-base font-medium text-yellow-300 hover:text-yellow-100 hover:bg-purple-700 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5 mr-3" />
                (224) 256-4715
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;