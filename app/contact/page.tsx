'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaEtsy } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Contact</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-base md:text-lg text-gray-600 mt-2">Get in touch with us</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Get In Touch</h2>
            <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              We&apos;re here to help with all your Pokémon card needs! Whether you&apos;re looking to buy, sell, 
              or need professional repair services, feel free to reach out. We respond quickly and are 
              always happy to answer questions about our collection or services.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Phone</h3>
                  <a href="tel:+12242564715" className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
                    (224) 256-4715
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500">Call or text for fastest response</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Email</h3>
                  <a href="mailto:contact@sidscollectibles.com" className="text-green-600 hover:text-green-700 font-medium text-sm sm:text-base">
                    contact@sidscollectibles.com
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Location</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Illinois, United States</p>
                  <p className="text-xs sm:text-sm text-gray-500">Shipping available nationwide</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Availability</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Monday - Sunday</p>
                  <p className="text-xs sm:text-sm text-gray-500">We work around your schedule - reach out anytime</p>
                </div>
              </div>
            </div>



            {/* Social Media & Platforms */}
            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Shop & Follow Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="https://www.facebook.com/SidsCollectiblesShop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">Facebook</p>
                    <p className="text-gray-500 text-xs">Main Store</p>
                  </div>
                </a>

                <a
                  href="https://www.etsy.com/shop/SidsCollectiblesShop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEtsy className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">Etsy</p>
                    <p className="text-gray-500 text-xs">Curated Cards</p>
                  </div>
                </a>

                <a
                  href="https://www.whatnot.com/user/sidscollectibles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">WhatNot</p>
                    <p className="text-gray-500 text-xs">Live Auctions</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Send Us a Message</h2>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
              <style jsx>{`
                .contact-form input,
                .contact-form select,
                .contact-form textarea {
                  width: 100% !important;
                  padding: 14px 16px !important;
                  border: 1px solid #d1d5db !important;
                  border-radius: 8px !important;
                  font-size: 16px !important;
                  line-height: 1.5 !important;
                  color: #111827 !important;
                  background-color: #ffffff !important;
                  transition: all 0.2s ease-in-out !important;
                  -webkit-appearance: none !important;
                  appearance: none !important;
                  box-sizing: border-box !important;
                }

                @media (min-width: 640px) {
                  .contact-form input,
                  .contact-form select,
                  .contact-form textarea {
                    padding: 16px 20px !important;
                    font-size: 18px !important;
                  }
                }

                .contact-form input::placeholder,
                .contact-form textarea::placeholder {
                  color: #6b7280 !important;
                  opacity: 1 !important;
                  font-size: 16px !important;
                  -webkit-text-fill-color: #6b7280 !important;
                  -webkit-opacity: 1 !important;
                }

                @media (min-width: 640px) {
                  .contact-form input::placeholder,
                  .contact-form textarea::placeholder {
                    font-size: 18px !important;
                  }
                }

                .contact-form input:focus,
                .contact-form select:focus,
                .contact-form textarea:focus {
                  outline: none !important;
                  border-color: #3b82f6 !important;
                  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
                }

                .contact-form textarea {
                  min-height: 120px !important;
                  resize: vertical !important;
                }

                @media (min-width: 640px) {
                  .contact-form textarea {
                    min-height: 140px !important;
                  }
                }

                .contact-form select {
                  background-image: url(&quot;data:image/svg+xml,%3csvg xmlns=&apos;http://www.w3.org/2000/svg&apos; fill=&apos;none&apos; viewBox=&apos;0 0 20 20&apos;%3e%3cpath stroke=&apos;%236b7280&apos; stroke-linecap=&apos;round&apos; stroke-linejoin=&apos;round&apos; stroke-width=&apos;1.5&apos; d=&apos;m6 8 4 4 4-4&apos;/%3e%3c/svg%3e&quot;) !important;
                  background-position: right 12px center !important;
                  background-repeat: no-repeat !important;
                  background-size: 20px 20px !important;
                  padding-right: 40px !important;
                }

                .contact-form label {
                  display: block !important;
                  font-weight: 600 !important;
                  color: #374151 !important;
                  margin-bottom: 8px !important;
                  font-size: 14px !important;
                }

                @media (min-width: 640px) {
                  .contact-form label {
                    font-size: 16px !important;
                    margin-bottom: 10px !important;
                  }
                }

                .contact-form button[type="submit"] {
                  width: 100% !important;
                  padding: 16px 24px !important;
                  background-color: #3b82f6 !important;
                  color: white !important;
                  border: none !important;
                  border-radius: 8px !important;
                  font-size: 16px !important;
                  font-weight: 600 !important;
                  cursor: pointer !important;
                  transition: background-color 0.2s ease-in-out !important;
                  min-height: 50px !important;
                }

                .contact-form button[type="submit"]:hover:not(:disabled) {
                  background-color: #2563eb !important;
                }

                @media (min-width: 640px) {
                  .contact-form button[type="submit"] {
                    padding: 18px 28px !important;
                    font-size: 18px !important;
                    min-height: 56px !important;
                  }
                }
              `}</style>
              <form className="contact-form space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="(224) 256-4715"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    What can we help you with? *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select a topic</option>
                    <option value="purchase">Looking to Buy Cards</option>
                    <option value="repair">Card Repair Services</option>
                    <option value="evaluation">Card Evaluation/Grading Prep</option>
                    <option value="selling">Selling Cards to You</option>
                    <option value="appraisal">Card Appraisal</option>
                    <option value="general">General Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-vertical"
                    placeholder=&quot;Tell us about what you&apos;re looking for or how we can help...&quot;
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Send Message
                </button>
              </form>

              <p className="text-xs sm:text-sm text-gray-500 mt-4 text-center leading-relaxed">
                * Required fields. We typically respond within 24 hours. For urgent inquiries, 
                please call or text (224) 256-4715.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-8 sm:mt-12 bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            How We Can Help You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Buying Cards</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2">
                Browse our complete inventory on Facebook or ask about specific cards you're looking for.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Card Repair</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2">
                Professional restoration services to improve your card's condition and value.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Evaluation</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2">
                Expert card evaluation with detailed reports starting at $1 per card through 2025.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Selling Cards</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-2">
                Looking to sell your collection? We're always interested in quality Pokémon cards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}