import { NextRequest, NextResponse } from 'next/server';
import { shopifyClient } from '@/lib/shopify/storefront';

// Define the response type for the search query
interface SearchProductsResponse {
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        images: {
          edges: Array<{
            node: {
              url: string;
              altText?: string;
            };
          }>;
        };
        variants: {
          edges: Array<{
            node: {
              id: string;
              title: string;
              price?: {
                amount: string;
                currencyCode: string;
              };
              availableForSale: boolean;
              quantityAvailable?: number;
            };
          }>;
        };
        tags: string[];
        productType?: string;
      };
    }>;
  };
}

const SEARCH_PRODUCTS_QUERY = `
  query searchProducts($query: String!, $first: Int!) {
    products(query: $query, first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
              }
            }
          }
          tags
          productType
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'Search query is required' 
      }, { status: 400 });
    }

    const result = await shopifyClient.request<SearchProductsResponse>(SEARCH_PRODUCTS_QUERY, {
      query: query.trim(),
      first: Math.min(limit, 50), // Cap at 50 results
    });

    const products = result.products.edges.map((edge) => {
      const product = edge.node;
      const variant = product.variants.edges[0]?.node;
      const image = product.images.edges[0]?.node;

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description,
        image: image ? {
          url: image.url,
          altText: image.altText,
        } : null,
        price: variant?.price || null,
        availableForSale: variant?.availableForSale || false,
        quantityAvailable: variant?.quantityAvailable || null,
        tags: product.tags || [],
        productType: product.productType || '',
      };
    });

    return NextResponse.json({
      success: true,
      products,
      query: query.trim(),
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to search products' 
    }, { status: 500 });
  }
}
