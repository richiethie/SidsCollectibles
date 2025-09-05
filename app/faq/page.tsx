'use client';

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-8">
        <div>
          <h2 className="font-semibold text-lg mb-2">How do I buy cards from Sids Collectibles?</h2>
          <p className="text-gray-700">
            You can browse our inventory on Facebook, Etsy, or WhatNot. For specific requests, use the contact form or call/text us directly.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Do you offer card repair or restoration?</h2>
          <p className="text-gray-700">
            Yes! We provide professional card repair and restoration services. Please describe your needs in the contact form or reach out by phone.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">How long does it take to get a response?</h2>
          <p className="text-gray-700">
            We typically respond within 24 hours. For urgent inquiries, please call or text for the fastest response.
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Where are you located and do you ship?</h2>
          <p className="text-gray-700">
            We are based in Illinois, USA, and offer nationwide shipping for all orders.
          </p>
        </div>
      </div>
    </div>
  );
}