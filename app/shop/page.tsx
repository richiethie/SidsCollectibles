'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Loader2, Search, X, Package, MessageSquare } from 'lucide-react';
import { ShopifyProduct } from '@/types/shopify';
import Link from 'next/link';
import { FaPaypal } from 'react-icons/fa';
import { SiWise, SiCashapp, SiVenmo } from 'react-icons/si';

export default function ShopPage() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid');
  const [showTradeModal, setShowTradeModal] = useState(false);

  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get('search');

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'title-az', label: 'Name: A to Z' },
    { value: 'title-za', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest First' },
  ];

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          setError(data.message || 'Failed to load products');
        }
      } catch (err) {
        setError('Failed to load products');
        console.error('Failed to load products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle search query from URL or local state
  useEffect(() => {
    const query = urlSearchQuery || searchQuery;
    if (query) {
      filterProducts(query);
    } else {
      setFilteredProducts(products);
    }
  }, [urlSearchQuery, searchQuery, products]);

  // Sort products when sortBy changes
  useEffect(() => {
    const sortedProducts = [...filteredProducts];

    switch (sortBy) {
      case 'price-low':
        sortedProducts.sort((a, b) => {
          const priceA = a.priceRange?.minVariantPrice?.amount ? parseFloat(a.priceRange.minVariantPrice.amount) : 0;
          const priceB = b.priceRange?.minVariantPrice?.amount ? parseFloat(b.priceRange.minVariantPrice.amount) : 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => {
          const priceA = a.priceRange?.minVariantPrice?.amount ? parseFloat(a.priceRange.minVariantPrice.amount) : 0;
          const priceB = b.priceRange?.minVariantPrice?.amount ? parseFloat(b.priceRange.minVariantPrice.amount) : 0;
          return priceB - priceA;
        });
        break;
      case 'title-az':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-za':
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
        sortedProducts.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredProducts(sortedProducts);
  }, [sortBy]);

  const filterProducts = (query: string) => {
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      product.productType.toLowerCase().includes(lowerQuery)
    );

    setFilteredProducts(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products);
    // Clear URL search param
    if (urlSearchQuery) {
      window.history.replaceState({}, '', '/shop');
    }
  };

  // Categorize products
  const featuredCards = filteredProducts.filter(
    (p) =>
      p.productType.toLowerCase().includes('card') ||
      p.tags.some((tag) => tag.toLowerCase().includes('custom'))
  );
  const repairProducts = filteredProducts.filter(
    (p) =>
      p.productType.toLowerCase().includes('repair') ||
      p.tags.some((tag) =>
        ['polish', 'spray', 'cleaner', 'repair'].some((kw) => tag.toLowerCase().includes(kw))
      )
  );
  const cardSupplies = filteredProducts.filter(
    (p) =>
      p.productType.toLowerCase().includes('sleeve') ||
      p.productType.toLowerCase().includes('toploader') ||
      p.productType.toLowerCase().includes('team bag') ||
      p.tags.some((tag) =>
        ['sleeve', 'toploader', 'team bag', 'case', 'protector'].some((kw) =>
          tag.toLowerCase().includes(kw)
        )
      )
  );

  if (error) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Products</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Sorry, we couldn't load the products right now. Please check your connection and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-blue-600 to-yellow-300 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-yellow-200 mb-4">
            <Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Shop</span>
          </div>

          {/* Title and Description */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow">Shop</h1>
              <p className="text-yellow-100 text-base md:text-lg mt-1">
                Luke 6:31 "Do to others as you would have them do to you"
              </p>
            </div>
            {!isLoading && (
              <div className="mt-4 sm:mt-0 text-sm text-yellow-200">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results Banner */}
      {(urlSearchQuery || searchQuery) && (
        <div className="bg-white border-b border-yellow-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Search results for</p>
                  <p className="font-semibold text-gray-900">"{urlSearchQuery || searchQuery}"</p>
                </div>
                <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-500">Found</p>
                  <p className="font-semibold text-gray-900">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
              </div>
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 text-gray-500 hover:text-red-600 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Clear search</span>
              </button>
            </div>
            <div className="sm:hidden mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Controls */}
      {!isLoading && products.length > 0 && (
        <div className="bg-gradient-to-r from-purple-100 via-blue-50 to-yellow-50 border-b border-yellow-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1">
                <label className="text-sm font-medium text-purple-700 sm:inline">Sort by:</label>
                <div className="relative flex-1 sm:flex-initial">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-purple-200 rounded-lg px-3 sm:px-4 py-2 pr-8 text-sm font-medium text-purple-700 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {/* Trades/Buy/Bulk Rates Tab */}
                <button
                  onClick={() => setShowTradeModal(true)}
                  className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-300 via-blue-600 to-purple-700 text-white font-semibold shadow hover:from-purple-700 hover:to-yellow-300 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Trades/Buy/Bulk Rates
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-purple-700 hidden sm:inline">View:</span>
                <div className="flex bg-white rounded-lg p-1 border border-yellow-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-purple-700 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    title="Grid view"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={2} />
                      <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={2} />
                      <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={2} />
                      <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={2} />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('large')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'large'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-purple-700 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    title="Large view"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="7" rx="1" strokeWidth={2} />
                      <rect x="3" y="14" width="18" height="7" rx="1" strokeWidth={2} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trades/Buy/Bulk Rates Modal */}
      {showTradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative border-4 border-blue-600">
            <button
              onClick={() => setShowTradeModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold text-purple-700 mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Trades / Buy / Bulk Rates
            </h2>
            <p className="text-blue-900 mb-4">
              Interested in trading, buying in bulk, or getting special rates? Send us a message below!
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={e => {
                e.preventDefault();
                // You can add your own message handler here
                alert('Message sent! We will get back to you soon.');
                setShowTradeModal(false);
              }}
            >
              <input
                type="text"
                required
                placeholder="Your Name"
                className="border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                className="border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                required
                placeholder="Your Message"
                className="border border-purple-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[80px]"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-300 via-blue-600 to-purple-700 text-white font-semibold px-5 py-2 rounded-lg shadow hover:from-purple-700 hover:to-yellow-300 transition-colors"
              >
                Send Message
              </button>
            </form>
            {/* Image placeholder for you to add in later */}
            <div className="mt-6 flex justify-center">
              {/* 
              <img
                src="/images/trade-bulk-buy.jpg"
                alt="Trades/Buy/Bulk Rates"
                className="rounded-lg shadow-lg max-h-32"
              />
              */}
              <div className="w-40 h-24 bg-blue-100 rounded-lg flex items-center justify-center text-blue-400 font-bold">
                Image Placeholder
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-blue-900">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Featured Cards Section */}
            <section className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-700 border-l-4 border-purple-400 pl-3 bg-purple-50 py-2 rounded">
                Featured Cards (Official & Custom)
              </h2>
              {featuredCards.length === 0 ? (
                <div className="text-blue-900 text-center py-8">No cards available at this time.</div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'large'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}>
                  {featuredCards.map((product: ShopifyProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>

            {/* Repair Products Section */}
            <section className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700 border-l-4 border-blue-400 pl-3 bg-blue-50 py-2 rounded">
                Repair Products (Polishes & Sprays)
              </h2>
              {repairProducts.length === 0 ? (
                <div className="text-blue-900 text-center py-8">No repair products available at this time.</div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'large'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}>
                  {repairProducts.map((product: ShopifyProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>

            {/* Card Supplies Section */}
            <section className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-yellow-600 border-l-4 border-yellow-400 pl-3 bg-yellow-50 py-2 rounded">
                Card Products (Sleeves, Toploaders, Team Bags, etc)
              </h2>
              {cardSupplies.length === 0 ? (
                <div className="text-blue-900 text-center py-8">No card supplies available at this time.</div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'large'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}>
                  {cardSupplies.map((product: ShopifyProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </section>

            {/* Results Info */}
            <div className="mt-12 text-center">
              <p className="text-blue-900">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
          </>
        )}
      </div>

      {/* Payment Options Footer */}
      <footer className="bg-gradient-to-r from-purple-700 via-blue-600 to-yellow-300 py-8 mt-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4 drop-shadow">
            Payment Options Available
          </h3>
          <div className="flex flex-wrap gap-6 items-center justify-center mb-2">
            <span className="flex items-center gap-2 text-white text-base font-semibold">
              <FaPaypal className="w-7 h-7 text-blue-200" /> PayPal
            </span>
            <span className="flex items-center gap-2 text-white text-base font-semibold">
              <SiWise className="w-7 h-7 text-blue-100" /> Wise
            </span>
            <span className="flex items-center gap-2 text-white text-base font-semibold">
              <SiVenmo className="w-7 h-7 text-blue-300" /> Venmo
            </span>
            <span className="flex items-center gap-2 text-white text-base font-semibold">
              <SiCashapp className="w-7 h-7 text-green-300" /> CashApp
            </span>
          </div>
          <p className="text-yellow-100 text-sm mt-2">
            Please contact us if you have questions about payment methods!
          </p>
        </div>
      </footer>
    </div>
  );
}