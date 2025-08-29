import { GraphQLClient } from 'graphql-request';
import { env } from '@/lib/env';
import { StorefrontResponse } from '@/types/shopify';

// Initialize GraphQL client for Shopify Storefront API
const shopifyClient = new GraphQLClient(
  `https://${env.SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
    },
  }
);

// GraphQL query fragments for reusability
export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
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
    images(first: 10) {
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
    variants(first: 250) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          quantityAvailable
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            id
            url
            altText
            width
            height
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
`;

export const COLLECTION_FRAGMENT = `
  fragment CollectionFragment on Collection {
    id
    title
    handle
    description
    descriptionHtml
    updatedAt
    products(first: $first, after: $after) {
      edges {
        node {
          ...ProductFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// Query to get all products
export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          ...ProductFragment
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// Query to get a single product by handle
export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// Query to get a collection by handle
export const GET_COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      ...CollectionFragment
    }
  }
  ${COLLECTION_FRAGMENT}
`;

// Query to get all collections
export const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          updatedAt
        }
      }
    }
  }
`;

// Function to fetch products with pagination
export async function getProducts(first: number = 20, after?: string) {
  try {
    const variables = { first, after };
    console.log('Fetching products with variables:', variables);
    
    const response = await shopifyClient.request(GET_PRODUCTS_QUERY, variables) as any;
    console.log('Raw Shopify response:', JSON.stringify(response, null, 2));
    
    // Handle both possible response structures
    if (response.data && response.data.products) {
      console.log('Using response.data.products structure');
      return response.data.products;
    } else if (response.products) {
      console.log('Using response.products structure');
      return response.products;
    } else {
      console.error('Unexpected response structure:', response);
      return { edges: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } };
    }
  } catch (error: any) {
    console.error('Error fetching products:', error);
    
    // Check if the error contains a response with data (partial success)
    if (error.response && error.response.data && error.response.data.products) {
      console.log('Using error.response.data.products structure (partial success)');
      return error.response.data.products;
    }
    
    console.error('Full error details:', JSON.stringify(error, null, 2));
    throw new Error('Failed to fetch products');
  }
}

// Function to fetch a single product by handle
export async function getProductByHandle(handle: string) {
  try {
    const variables = { handle };
    const response = await shopifyClient.request(GET_PRODUCT_BY_HANDLE_QUERY, variables) as any;
    
    console.log('Product response:', JSON.stringify(response, null, 2));
    
    // Handle both possible response structures
    if (response.data && response.data.product) {
      return response.data.product;
    } else if (response.product) {
      return response.product;
    } else {
      console.error('Unexpected product response structure:', response);
      return null;
    }
  } catch (error: any) {
    console.error('Error fetching product:', error);
    
    // Check if the error contains a response with data (partial success)
    if (error.response && error.response.data && error.response.data.product) {
      return error.response.data.product;
    }
    
    throw new Error('Failed to fetch product');
  }
}

// Function to fetch a collection by handle
export async function getCollectionByHandle(handle: string, first: number = 20, after?: string) {
  try {
    const variables = { handle, first, after };
    const response = await shopifyClient.request<StorefrontResponse<{
      collection: any;
    }>>(GET_COLLECTION_BY_HANDLE_QUERY, variables);
    
    return response.data.collection;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw new Error('Failed to fetch collection');
  }
}

// Function to fetch all collections
export async function getCollections(first: number = 50) {
  try {
    const variables = { first };
    const response = await shopifyClient.request<StorefrontResponse<{
      collections: {
        edges: Array<{
          node: any;
        }>;
      };
    }>>(GET_COLLECTIONS_QUERY, variables);
    
    return response.data.collections.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw new Error('Failed to fetch collections');
  }
}

// Export the client for custom queries
export { shopifyClient };
