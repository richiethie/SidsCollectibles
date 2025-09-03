'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { FaEtsy } from 'react-icons/fa';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch featured products on component mount
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/featured?limit=6');
        const data = await response.json();
        
        if (data.success) {
          setFeaturedProducts(data.products);
        } else {
          setError(data.message || 'Failed to load featured products');
        }
      } catch (err) {
        setError('Failed to load featured products');
        console.error('Failed to load featured products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Auto-rotate featured products if available
  useEffect(() => {
    if (featuredProducts.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-left order-1 lg:order-2">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium rounded-full mb-6 sm:mb-8 border border-blue-200">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></div>
                Live inventory available now
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Premium Pokémon Cards & 
                <span className="text-blue-600"> Professional Services</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                Discover rare cards, get expert restoration services, and build your collection with confidence. 
                Trusted by collectors nationwide.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 px-4 sm:px-0">
                <Link
                  href="/shop"
                  className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors text-center shadow-sm"
                >
                  Browse Collection
                </Link>
                <Link
                  href="/repairs"
                  className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors text-center"
                >
                  Our Services
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-200 max-w-md mx-auto lg:max-w-none">
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Cards Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Repairs Done</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Satisfied</div>
                </div>
              </div>
            </div>

            {/* Right Content - Featured Card */}
            <div className="flex justify-center order-2 lg:order-2 lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                {isLoading ? (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 w-full animate-pulse">
                    <div className="text-center mb-6">
                      <div className="w-full aspect-[3/4] bg-gray-200 rounded-xl mx-auto mb-4 max-w-48"></div>
                      <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3 mx-auto mb-2"></div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="h-5 sm:h-6 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 sm:h-5 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="w-full h-10 sm:h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                ) : error ? (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 w-full">
                    <div className="text-center mb-6">
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-red-100 to-red-200 rounded-xl mx-auto mb-4 flex items-center justify-center border border-red-200 max-w-48">
                        <div className="text-4xl sm:text-6xl">⚠️</div>
                      </div>
                      <p className="text-red-600 text-sm">Failed to load products</p>
                    </div>
                  </div>
                ) : featuredProducts.length > 0 ? (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 w-full">
                    <div className="text-center mb-6">
                      <div className="w-full aspect-[3/4] rounded-xl mx-auto mb-4 flex items-center justify-center overflow-hidden max-w-48">
                        {featuredProducts[currentSlide]?.images?.edges?.[0]?.node ? (
                          <Image
                            src={featuredProducts[currentSlide].images.edges[0].node.url}
                            alt={featuredProducts[currentSlide].images.edges[0].node.altText || featuredProducts[currentSlide].title}
                            width={192}
                            height={256}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <div className="text-4xl sm:text-6xl">⚡</div>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 px-2">
                        {featuredProducts[currentSlide]?.title || 'Product Title'}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {featuredProducts[currentSlide]?.productType || 'Pokémon Card'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-blue-600">
                          {featuredProducts[currentSlide]?.priceRange?.minVariantPrice ? 
                            `$${parseFloat(featuredProducts[currentSlide].priceRange.minVariantPrice.amount).toFixed(2)}` : 
                            'Price TBD'
                          }
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          featuredProducts[currentSlide]?.availableForSale ? 
                            'bg-green-100 text-green-800' : 
                            'bg-red-100 text-red-800'
                        }`}>
                          {featuredProducts[currentSlide]?.availableForSale ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                    <Link 
                      href={`/shop/${featuredProducts[currentSlide]?.handle || '#'}`}
                      className="w-full bg-gray-900 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors block text-center"
                    >
                      View Details
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 w-full">
                    <div className="text-center mb-6">
                      <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mx-auto mb-4 flex items-center justify-center border border-gray-200 max-w-48">
                        <div className="text-4xl sm:text-6xl">📦</div>
                      </div>
                      <p className="text-gray-500 text-sm">No featured products available</p>
                    </div>
                  </div>
                )}
                
                {/* Card Indicators */}
                {featuredProducts.length > 1 && (
                  <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                    {featuredProducts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Shop On Other Platforms
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Browse our collection across multiple trusted platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/SidsCollectiblesShop"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center sm:text-left">Facebook Shop</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base text-center sm:text-left">
                Browse our complete inventory and message us directly for personalized service
              </p>
              <div className="flex items-center justify-center sm:justify-start text-blue-600 font-medium group-hover:underline text-sm sm:text-base">
                Shop Facebook <span className="ml-1">→</span>
              </div>
            </a>

            {/* Etsy */}
            <a
              href="https://www.etsy.com/shop/SidsCollectiblesShop"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <FaEtsy className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center sm:text-left">Etsy Store</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base text-center sm:text-left">
                Secure checkout with buyer protection and curated selection of premium cards
              </p>
              <div className="flex items-center justify-center sm:justify-start text-orange-600 font-medium group-hover:underline text-sm sm:text-base">
                Visit Store <span className="ml-1">→</span>
              </div>
            </a>

            {/* WhatNot */}
            <a
              href="https://www.whatnot.com/user/sidscollectibles"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto sm:mx-0">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 text-center sm:text-left">Live Auctions</h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base text-center sm:text-left">
                Join live streams and auctions for rare finds and community interaction
              </p>
              <div className="flex items-center justify-center sm:justify-start text-purple-600 font-medium group-hover:underline text-sm sm:text-base">
                Watch Live <span className="ml-1">→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Professional Card Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Expert restoration, grading preparation, and appraisal services to maximize your collection's value
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Restoration */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Card Restoration</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Professional restoration for damaged cards including edge repair, surface cleaning, and crease removal while preserving authenticity.
              </p>
              <Link href="/repairs" className="text-green-600 hover:text-green-700 font-medium text-sm sm:text-base">
                Learn More →
              </Link>
            </div>

            {/* Grading Prep */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Grading Preparation</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Optimize your cards for professional grading with expert cleaning, assessment, and preparation services.
              </p>
              <Link href="/repairs" className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
                Learn More →
              </Link>
            </div>

            {/* Appraisal */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Professional Appraisal</h3>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Accurate valuations for insurance, estate planning, or sale purposes based on current market conditions.
              </p>
              <Link href="/repairs" className="text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Why Collectors Trust SidsCollectibles
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Built by collectors, for collectors, with a focus on quality, authenticity, and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Authenticity Guaranteed</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                Every card is carefully inspected and verified for authenticity. We stand behind every item we sell.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Fast & Secure Shipping</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                Professional packaging with tracking and insurance. Your cards arrive safe and sound.
              </p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                Years of collecting experience and industry knowledge to help you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
            Ready to Start Building Your Collection?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Whether you're looking to buy, sell, or need professional card services, we're here to help you every step of the way.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <a
              href="https://www.facebook.com/SidsCollectiblesShop"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-50 transition-colors"
            >
              Browse Collection
            </a>
            <a
              href="tel:+12242564715"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call (224) 256-4715
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-blue-200 text-xs sm:text-sm px-4">
            <div className="flex items-center gap-2">
              <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook: SidsCollectiblesShop</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEtsy className="w-3 sm:w-4 h-3 sm:h-4" />
              <span>Etsy: SidsCollectiblesShop</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>WhatNot: sidscollectibles</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}