'use client';

import React from "react";

export default function RepairsExplanationPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Repair & Conditioning Services Explained</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Card cleaning and surface restoration</li>
          <li>Edge and corner repair</li>
          <li>Crease and bend reduction</li>
          <li>Grading preparation and advice</li>
          <li>Protective sleeve and case replacement</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Our Process</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>Initial assessment and consultation</li>
          <li>Detailed cleaning and restoration</li>
          <li>Quality check and grading recommendations</li>
          <li>Secure packaging and return shipping</li>
        </ol>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Why Choose Us?</h2>
        <p className="text-gray-700 mb-2">
          We use professional tools and techniques to restore your cards while preserving authenticity and value. Our team has years of experience with Pokémon and trading cards.
        </p>
        <p className="text-yellow-600 font-semibold">
          Questions? <a href="/contact" className="underline text-blue-700">Contact us</a> for a free consultation!
        </p>
      </section>
    </div>
  );
}