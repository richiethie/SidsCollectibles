'use client';


import React from "react";

export default function ReviewsPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Customer Reviews</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <p className="text-lg text-gray-700">
          "Amazing service and great selection! Highly recommend Sids Collectibles."
        </p>
        <div className="mt-2 text-sm text-yellow-500">★★★★★</div>
        <div className="mt-1 text-xs text-gray-400">- Alex P.</div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <p className="text-lg text-gray-700">
          "Fast shipping and cards arrived in perfect condition."
        </p>
        <div className="mt-2 text-sm text-yellow-500">★★★★★</div>
        <div className="mt-1 text-xs text-gray-400">- Jamie L.</div>
      </div>
      {/* Add more reviews as needed */}
    </div>
  );
}