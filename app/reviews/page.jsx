'use client';

import React from "react";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-yellow-50">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-8 drop-shadow">
          Customer Reviews
        </h1>
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg border border-yellow-100 p-6">
            <p className="text-lg sm:text-xl text-blue-900 font-medium">
              "Amazing service and great selection! Highly recommend Sids Collectibles."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★★★★★</span>
              <span className="text-xs text-purple-700 font-semibold">- Alex P.</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-yellow-100 p-6">
            <p className="text-lg sm:text-xl text-blue-900 font-medium">
              "Fast shipping and cards arrived in perfect condition."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★★★★★</span>
              <span className="text-xs text-purple-700 font-semibold">- Jamie L.</span>
            </div>
          </div>
          {/* Add more reviews as needed */}
        </div>
      </div>
    </div>
  );
}