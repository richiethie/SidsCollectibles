'use client';

import React from "react";

export default function RepairsExplanationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-yellow-50">
      <div className="max-w-7xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-10">
        {/* Main Content - Left Side */}
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4 flex items-center gap-3">
            <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m6-9H6" />
            </svg>
            Repair & Conditioning Services Explained
          </h1>
          <section className="bg-white rounded-xl shadow-lg border border-purple-100 p-6 text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m5-5H7" />
              </svg>
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-blue-900 space-y-2 pl-4">
              <li>Card cleaning and surface restoration</li>
              <li>Edge and corner repair</li>
              <li>Crease and bend reduction</li>
              <li>Grading preparation and advice</li>
              <li>Protective sleeve and case replacement</li>
            </ul>
          </section>
          <section className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m6-9H6" />
              </svg>
              Our Process
            </h2>
            <ol className="list-decimal list-inside text-blue-900 space-y-2 pl-4">
              <li>Initial assessment and consultation</li>
              <li>Detailed cleaning and restoration</li>
              <li>Quality check and grading recommendations</li>
              <li>Secure packaging and return shipping</li>
            </ol>
          </section>
          <section className="bg-white rounded-xl shadow-lg border border-yellow-100 p-6 text-left">
            <h2 className="text-xl sm:text-2xl font-semibold text-yellow-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10m5-5H7" />
              </svg>
              Why Choose Us?
            </h2>
            <p className="text-blue-900 mb-2">
              We use professional tools and techniques to restore your cards while preserving authenticity and value. Our team has years of experience with Pokémon and trading cards.
            </p>
            <p className="text-yellow-600 font-semibold">
              Questions? <a href="/contact" className="underline text-blue-700">Contact us</a> for a free consultation!
            </p>
          </section>
        </div>
        {/* Before & After Highlights - Right Side */}
        <aside className="w-full lg:w-[40%]">
          <section className="bg-white rounded-xl shadow-lg border border-green-100 p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Before & After Highlights
            </h2>
            <div className="flex flex-col gap-6 items-center">
              {/* Placeholder for images */}
              <div className="w-full h-64 bg-blue-100 rounded-lg flex items-center justify-center text-blue-400 font-bold text-2xl mb-4">
                Before
              </div>
              <div className="w-full h-64 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-500 font-bold text-2xl">
                After
              </div>
            </div>
            <p className="text-green-700 text-center mt-4 text-base">
              See the difference our professional repair and conditioning services can make!
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}