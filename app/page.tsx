'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-yellow-50">

      {/* Hero Section - moved up and condensed */}
      <section className="relative bg-gradient-to-b from-purple-100 via-blue-50 to-yellow-50 pt-4 pb-8 sm:pt-6 sm:pb-12 lg:pt-8 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* Left Content: Title and Actions */}
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-purple-700 mb-2 sm:mb-3 leading-tight drop-shadow">
                Premium Pokémon Cards & 
                <span className="text-blue-600 drop-shadow"> Professional Services</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-blue-900 mb-4 sm:mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                Discover rare cards, get expert restoration services, and build your collection with confidence. 
                Trusted by collectors nationwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start mb-6 px-0">
                <Link
                  href="/shop"
                  className="bg-gradient-to-r from-purple-700 via-blue-600 to-yellow-300 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-yellow-400 transition-colors text-center shadow-sm"
                >
                  Browse Collection
                </Link>
                <Link
                  href="/repairs"
                  className="border-2 border-yellow-300 text-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-yellow-100 hover:border-purple-700 hover:text-blue-700 transition-colors text-center"
                >
                  Our Services
                </Link>
              </div>
            </div>

            {/* Right Content - Featured Card */}
            <div className="flex-1 flex justify-center lg:justify-end">
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
                          <>
                            <Image
                              src={featuredProducts[currentSlide].images.edges[0].node.url}
                              alt={featuredProducts[currentSlide].images.edges[0].node.altText || featuredProducts[currentSlide].title}
                              width={192}
                              height={256}
                              className="w-full h-full object-contain p-2"
                            />
                          </>
                        ) : (
                          <div className="text-4xl sm:text-6xl">⚡</div>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-1 px-2">
                        {featuredProducts[currentSlide]?.title || 'Product Title'}
                      </h3>
                      <p className="text-blue-700 text-sm mb-2">
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
                      className="w-full bg-gradient-to-r from-purple-700 via-blue-600 to-yellow-300 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-blue-700 hover:to-yellow-400 transition-colors block text-center"
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

      {/* Storefronts Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-100 via-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-3 sm:mb-4 px-4 drop-shadow">
              Shop On Other Platforms
            </h2>
            <p className="text-lg sm:text-xl text-blue-900 max-w-3xl mx-auto px-4">
              Browse our collection and connect with us across multiple trusted platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Facebook Shop */}
            <div className="group bg-white rounded-xl shadow-lg border border-blue-200 p-6 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-blue-300/30"
              style={{ boxShadow: '0 0 24px 0 rgba(59,130,246,0.15)' }}>
              {/* 
              <div className="relative w-32 h-20 mb-4 rounded-lg overflow-hidden shadow-lg border-2 border-blue-200">
                <Image
                  src="/images/facebook-storefront.jpg"
                  alt="Facebook Storefront"
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
                <div className="absolute inset-0 rounded-lg pointer-events-none group-hover:shadow-[0_0_24px_6px_rgba(59,130,246,0.4)] transition-shadow" />
              </div>
              */}
              <div className="w-32 h-20 mb-4 rounded-lg bg-blue-100 flex items-center justify-center text-blue-400 font-bold text-lg border-2 border-blue-200">
                Facebook Storefront Image
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Facebook Shop</h3>
              <p className="text-blue-900 mb-3 text-center text-sm sm:text-base">
                Browse our complete inventory and message us directly for personalized service.
              </p>
              <a
                href="https://www.facebook.com/SidsCollectiblesShop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-700 to-yellow-300 text-white font-semibold px-5 py-2 rounded-full shadow hover:from-purple-700 hover:to-yellow-300 hover:text-yellow-300 transition"

              >
                Shop Facebook
              </a>
            </div>

            {/* Etsy Store */}
            <div className="group bg-white rounded-xl shadow-lg border border-purple-200 p-6 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-purple-300/30"
              style={{ boxShadow: '0 0 24px 0 rgba(168,85,247,0.15)' }}>
              {/* 
              <div className="relative w-32 h-20 mb-4 rounded-lg overflow-hidden shadow-lg border-2 border-purple-200">
                <Image
                  src="/images/etsy-storefront.jpg"
                  alt="Etsy Storefront"
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
                <div className="absolute inset-0 rounded-lg pointer-events-none group-hover:shadow-[0_0_24px_6px_rgba(168,85,247,0.4)] transition-shadow" />
              </div>
              */}
              <div className="w-32 h-20 mb-4 rounded-lg bg-purple-100 flex items-center justify-center text-purple-400 font-bold text-lg border-2 border-purple-200">
                Etsy Storefront Image
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-2 flex items-center gap-2">
                <FaEtsy className="w-6 h-6 text-orange-500" /> Etsy Store
              </h3>
              <p className="text-purple-900 mb-2 text-center text-sm sm:text-base">
                Secure checkout with buyer protection and a curated selection of premium cards.
              </p>
              <p className="text-yellow-600 font-semibold mb-2 text-center text-xs sm:text-sm">
                Have a special request? <a href="https://www.etsy.com/conversations/new?with_id=YOUR_SHOP_ID" target="_blank" rel="noopener noreferrer" className="underline text-purple-700">Contact us on Etsy</a> for custom orders!
              </p>
              <a
                href="https://www.etsy.com/shop/SidsCollectiblesShop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-purple-700 via-blue-600 to-yellow-300 text-white font-semibold px-5 py-2 rounded-full shadow hover:from-yellow-300 hover:to-purple-700 hover:text-purple-700 transition"
              >
                Visit Etsy Store
              </a>
            </div>

            {/* Whatnot Live Auctions */}
            <div className="group bg-white rounded-xl shadow-lg border border-yellow-200 p-6 flex flex-col items-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-yellow-300/30"
              style={{ boxShadow: '0 0 24px 0 rgba(253,224,71,0.15)' }}>
              {/* 
              <div className="relative w-32 h-20 mb-4 rounded-lg overflow-hidden shadow-lg border-2 border-yellow-200">
                <Image
                  src="/images/whatnot-storefront.jpg"
                  alt="Whatnot Storefront"
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
                <div className="absolute inset-0 rounded-lg pointer-events-none group-hover:shadow-[0_0_24px_6px_rgba(253,224,71,0.4)] transition-shadow" />
              </div>
              */}
              <div className="w-32 h-20 mb-4 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-400 font-bold text-lg border-2 border-yellow-200">
                Whatnot Storefront Image
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-yellow-500 mb-2">Whatnot</h3>
              <p className="text-yellow-900 mb-2 text-center text-sm sm:text-base">
                Join our live streams for rare finds, fun, and community interaction!
              </p>
              <p className="text-purple-700 font-semibold mb-2 text-center text-xs sm:text-sm">
                Stream Times: <span className="font-bold">Tuesday & Thursday Nights</span>
              </p>
              {/* Snippet area for custom highlights */}
              <div className="bg-yellow-100 text-yellow-800 rounded px-3 py-1 mb-2 text-xs sm:text-sm font-medium shadow-inner">
                Next stream: Thursday 8pm CST – Special Vintage Auction!
              </div>
              <a
                href="https://www.whatnot.com/user/sidscollectibles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-yellow-300 via-purple-700 to-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:from-purple-700 hover:to-yellow-300 hover:text-yellow-300 transition"

              >
                Watch on Whatnot
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-50 via-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-3 sm:mb-4 px-4 drop-shadow">
              Why Collectors Trust SidsCollectibles
            </h2>
            <p className="text-lg sm:text-xl text-blue-900 max-w-3xl mx-auto px-4">
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
              <h3 className="text-lg sm:text-xl font-bold text-yellow-600 mb-2 sm:mb-3">Authenticity Guaranteed</h3>
              <p className="text-blue-900 leading-relaxed text-sm sm:text-base px-2">
                Every card is carefully inspected and verified for authenticity. We stand behind every item we sell.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-blue-600 mb-2 sm:mb-3">Fast & Secure Shipping</h3>
              <p className="text-blue-900 leading-relaxed text-sm sm:text-base px-2">
                Professional packaging with tracking and insurance. Your cards arrive safe and sound.
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-2 sm:mb-3">Expert Support</h3>
              <p className="text-blue-900 leading-relaxed text-sm sm:text-base px-2">
                Years of collecting experience and industry knowledge to help you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-purple-700 via-blue-600 to-yellow-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-4 drop-shadow-lg">
            Ready to Start Building Your Collection?
          </h2>
          <p className="text-lg sm:text-xl text-yellow-100 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Whether you're looking to buy, sell, or need professional card services, we're here to help you every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <a
              href="https://www.facebook.com/SidsCollectiblesShop"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-yellow-300 hover:text-purple-700 transition-colors shadow"
            >
              Browse Collection
            </a>
            <a
              href="tel:+12242564715"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-yellow-300 hover:text-purple-700 transition-colors shadow"
            >
              Call (224) 256-4715
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-yellow-100 text-xs sm:text-sm px-4">
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