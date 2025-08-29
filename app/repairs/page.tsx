import React from 'react';
import Link from 'next/link';
import Form from '@/components/Form';
import { RepairRequest } from '@/types/shopify';

export default function RepairsPage() {
  const handleSubmit = async (data: RepairRequest) => {
    'use server';
    
    try {
      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit repair request');
      }

      // Redirect to success page
      window.location.href = '/repairs/success';
    } catch (error) {
      console.error('Error submitting repair request:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Repairs</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Card Repair Services</h1>
          <p className="text-lg text-gray-600 mt-2">Professional trading card restoration and repair services</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Services Overview */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl lg:text-3xl text-center font-bold text-gray-900 mb-8">Our Expert Services</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Card Evaluation</h3>
              <div className="space-y-3 text-gray-600 text-sm sm:text-base">
                <p className="leading-relaxed">
                  All cards under evaluation are subjected to a minimum of 12x magnification 
                  with up to 2000x magnification imaging available after October 2025.
                </p>
                <p className="leading-relaxed">
                  Centering and flaws will be documented and a full custom report will be 
                  available for $5 starting in 2026.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mt-4">
                  <p className="text-blue-800 font-semibold text-sm sm:text-base">
                    Current Rate: $1 per card evaluation (through 2025)
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Card Repair Pricing</h3>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  All cards are priced on a case-by-case basis using a 72-hour labor framework.
                </p>
                
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                    <p className="text-green-800 font-semibold text-sm sm:text-base">Cards under $100 value</p>
                    <p className="text-green-700 text-xs sm:text-sm">$5 per 72 hours of labor</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                    <p className="text-yellow-800 font-semibold text-sm sm:text-base">Cards $100-$500 value</p>
                    <p className="text-yellow-700 text-xs sm:text-sm">$10 per 72 hours of labor</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                    <p className="text-red-800 font-semibold text-sm sm:text-base">Cards over $500 value</p>
                    <p className="text-red-700 text-xs sm:text-sm">$15 per 72 hours of labor or 10% of value gain (whichever is higher)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Our Repair Process
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-blue-600 font-bold text-lg sm:text-xl">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Submit Request</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                Fill out our repair request form with detailed photos and card information
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-blue-600 font-bold text-lg sm:text-xl">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Professional Evaluation</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                Our experts examine your card with high-magnification equipment and provide a detailed quote
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-blue-600 font-bold text-lg sm:text-xl">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Expert Repair</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                Skilled restoration work using proven techniques to improve card condition
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-blue-600 font-bold text-lg sm:text-xl">4</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Quality Inspection</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                Final inspection and documentation of the restoration work completed
              </p>
            </div>
          </div>
        </div>

        {/* Common Repairs Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Common Card Repairs</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Corner Damage</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">Repair of bent, creased, or damaged corners</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Edge Wear</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">Restoration of worn or damaged card edges</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Surface Scratches</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">Removal of surface scratches and scuffs</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Centering Issues</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">Correction of off-center printing when possible</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Stains & Marks</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">Removal of stains, pen marks, and discoloration</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Creasing</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">Repair of creases and fold lines</p>
            </div>
          </div>
        </div>

        {/* Repair Request Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Request a Repair Quote</h2>
          <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
            Please provide detailed information about your card and the damage that needs repair. 
            Include clear photos from multiple angles to help us provide the most accurate quote and timeline.
          </p>
          
          <Form onSubmit={handleSubmit} />
        </div>

        {/* Contact Information */}
        <div className="text-center bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Questions About Card Repair Services?
          </h3>
          <p className="text-base sm:text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-4">
            Our team is here to help! Contact us for more information about our card repair and evaluation services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <a
              href="tel:+15551234567"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (555) 123-4567
            </a>
            <a
              href="mailto:repairs@sidscollectibles.com"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
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
              <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.16 1.2c-.63 0-1.14.51-1.14 1.14v.78c0 .63.51 1.14 1.14 1.14.63 0 1.14-.51 1.14-1.14v-.78c0-.63-.51-1.14-1.14-1.14z"/>
              </svg>
              <span>Etsy: SidsCollectiblesShop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}