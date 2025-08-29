import { NextRequest, NextResponse } from 'next/server';
import { shopifyClient } from '@/lib/shopify/storefront';

const GET_PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
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
          images(first: 5) {
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
          variants(first: 10) {
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
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const result = await shopifyClient.request(GET_PRODUCTS_QUERY, {
      first: Math.min(limit, 100), // Cap at 100 products
    }) as any;

    const products = result.products.edges.map((edge: any) => edge.node);

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    });

  } catch (error) {
    console.error('Products API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch products' 
    }, { status: 500 });
  }
}
