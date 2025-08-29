import { NextRequest, NextResponse } from 'next/server';
import { shopifyClient } from '@/lib/shopify/storefront';

const GET_FEATURED_COLLECTION_QUERY = `
  query getFeaturedCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            productType
            vendor
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '6');

    const result = await shopifyClient.request(GET_FEATURED_COLLECTION_QUERY, {
      handle: 'featured',
      first: Math.min(limit, 20), // Cap at 20 products
    }) as any;

    if (!result.collection) {
      return NextResponse.json({ 
        success: false, 
        message: 'Featured collection not found' 
      }, { status: 404 });
    }

    const products = result.collection.products.edges.map((edge: any) => edge.node);

    return NextResponse.json({
      success: true,
      collection: {
        id: result.collection.id,
        title: result.collection.title,
        description: result.collection.description,
      },
      products,
      count: products.length,
    });

  } catch (error) {
    console.error('Featured collection API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch featured collection' 
    }, { status: 500 });
  }
}
