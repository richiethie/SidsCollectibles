'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">About</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">About SidsCollectibles</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mt-2">Learn more about our story and mission</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
          {/* Tagline */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 text-xs sm:text-sm md:text-base font-medium rounded-full mb-4 sm:mb-6 border border-blue-200 max-w-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
              <span className="text-center leading-tight">
                A follower of Jesus cleverly disguised as a Pokémon Store
              </span>
            </div>
          </div>

          {/* Our Story */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-left">Our Story</h2>
            <div className="space-y-4 sm:space-y-6 text-gray-600">
              <p className="leading-relaxed text-sm sm:text-base text-left">
                I started selling Pokémon Cards back in 2017 but with very little success. Fast forward to 2023 
                and Pokémon card sales were just something I did on the side to fund my love for the hobby. 
                I was working a part time factory job at the time and struggling to make ends meet, while also 
                watching my kids grow up and noticing concerning changes in their behavior and emotional stability.
              </p>

              <p className="leading-relaxed text-sm sm:text-base text-left">
                During this challenging time, I was dealing with serious health issues including liver and kidney 
                failure, heart conditions, and lung problems that caused me to cough blood. Most of these issues 
                arose from my time in the Marine Corps as a combat veteran. As I reflected on what to do, 
                the Bible came to mind - I figured if I was going to teach my kids good morals, the values 
                our country was founded on would be a good place to start.
              </p>

              <p className="leading-relaxed text-sm sm:text-base text-left">
                After about 4 months of reading the Bible for the first time (listening while I worked), 
                I had a profound spiritual experience that completely changed my life. From that moment, 
                I started to follow Jesus, and He transformed my life completely. Picture an abusive, 
                mentally unstable combat veteran - that was me. I am now a completely different person 
                in just the span of two years, and I give all credit to God for this transformation.
              </p>

              <p className="leading-relaxed text-sm sm:text-base text-left">
                The connection to Pokémon cards came as my faith journey continued. I was working nights 
                at the factory because daycare was $3,000 a month (which we couldn't afford), homeschooling 
                my kids during the day, while my wife worked as well. I was selling cards on the side and 
                getting into card repair work. As I reached a physical breaking point from the factory labor, 
                I prayed: "Ok God, if you want me to leave this job and do the Pokémon cards store, 
                let it make at least $2,000 a month." At that time, I was only making around $1,600 monthly 
                at the factory job.
              </p>

              <p className="leading-relaxed text-sm sm:text-base font-semibold text-gray-700 text-left">
                The very next month, I made $4,000 with the Pokémon Card store. I was shocked and thankful 
                at the same time, put in my two weeks, and have been going full-time on the Pokémon Card 
                store ever since. I thank the Lord in heaven above for each and every one of you and the 
                transformation He has done in me. Praise God and God bless you!
              </p>
            </div>
          </section>

          {/* Mission & Values */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-left">Our Mission & Values</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 text-left">Our Mission</h3>
                <p className="text-blue-800 leading-relaxed text-sm sm:text-base text-left">
                  To serve the collecting community with integrity, authenticity, and excellence while 
                  demonstrating the love of Christ through honest business practices and genuine care 
                  for every customer.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-green-900 mb-3 sm:mb-4 text-left">Our Vision</h3>
                <p className="text-green-800 leading-relaxed text-sm sm:text-base text-left">
                  To be a trusted leader in the Pokémon card community, known for professional restoration 
                  services, authentic products, and a business that honors God in all we do.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-left">Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-left sm:text-center">
                <div className="flex items-start space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 sm:text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-left sm:text-center">Authenticity</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:px-2 text-left sm:text-center">
                      Every card is carefully verified and guaranteed authentic. We stand behind our products completely.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-center">
                <div className="flex items-start space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 sm:text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-left sm:text-center">Faith-Based</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:px-2 text-left sm:text-center">
                      Our business is built on Christian values of honesty, integrity, and genuine care for others.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-center">
                <div className="flex items-start space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 sm:text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-left sm:text-center">Excellence</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:px-2 text-left sm:text-center">
                      We strive for excellence in every aspect of our service, from card condition to customer care.
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-center">
                <div className="flex items-start space-x-3 sm:flex-col sm:space-x-0 sm:space-y-3 sm:items-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-yellow-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 sm:text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-left sm:text-center">Community</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:px-2 text-left sm:text-center">
                      We're passionate about building and supporting the Pokémon collecting community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience & Expertise */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-left">Our Expertise</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-left">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">7+</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Years of Experience</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Selling and collecting Pokémon cards since 2017, with deep knowledge of market trends 
                      and card conditions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-left">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Professional Restoration</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Specialized skills in card repair and restoration, helping collectors preserve and 
                      enhance their valuable cards.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-left">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Expert Authentication</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Thorough knowledge of card authentication, grading preparation, and market evaluation 
                      from years of hands-on experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-left">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Personal Dedication</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      As a collector myself and a father, I understand the passion and investment that 
                      goes into building a meaningful collection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Personal Note */}
          <section>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 sm:p-6 md:p-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 text-left">A Personal Thank You</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4 text-left">
                I want to personally thank each and every customer who has supported SidsCollectibles. 
                Your trust in our business has allowed us to grow from a side hustle to a full-time 
                mission of serving the Pokémon collecting community.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-medium text-left">
                Whether you're looking to buy your first card or need professional restoration services 
                for a treasured collection, we're here to serve you with integrity, expertise, and 
                genuine care. God bless you and happy collecting!
              </p>
              <div className="mt-4 sm:mt-6 text-left">
                <p className="text-blue-600 font-semibold text-sm sm:text-base">- Sid, Founder of SidsCollectibles</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}