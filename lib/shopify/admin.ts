import { env } from '@/lib/env';
import { AdminResponse, AdminProduct } from '@/types/shopify';

// Base URL for Shopify Admin API
const SHOPIFY_ADMIN_BASE_URL = `https://${env.SHOPIFY_STORE_DOMAIN}/admin/api/${env.SHOPIFY_API_VERSION}`;

// Headers for Admin API requests
const getAdminHeaders = () => ({
  'Content-Type': 'application/json',
      'X-Shopify-Access-Token': env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
});

// Generic function to make Admin API requests
async function makeAdminRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${SHOPIFY_ADMIN_BASE_URL}${endpoint}`;
  const headers = getAdminHeaders();

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify Admin API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Shopify Admin API request failed:', error);
    throw new Error('Failed to make Shopify Admin API request');
  }
}

// Get all products from Admin API
export async function getAdminProducts(limit: number = 50, page_info?: string): Promise<AdminResponse<AdminProduct[]>> {
  const endpoint = `/products.json?limit=${limit}${page_info ? `&page_info=${page_info}` : ''}`;
  return makeAdminRequest<AdminResponse<AdminProduct[]>>(endpoint);
}

// Get a single product by ID from Admin API
export async function getAdminProduct(productId: number): Promise<AdminResponse<AdminProduct>> {
  const endpoint = `/products/${productId}.json`;
  return makeAdminRequest<AdminResponse<AdminProduct>>(endpoint);
}

// Get products by collection ID
export async function getAdminProductsByCollection(collectionId: number, limit: number = 50): Promise<AdminResponse<AdminProduct[]>> {
  const endpoint = `/collections/${collectionId}/products.json?limit=${limit}`;
  return makeAdminRequest<AdminResponse<AdminProduct[]>>(endpoint);
}

// Search products by query
export async function searchAdminProducts(query: string, limit: number = 50): Promise<AdminResponse<AdminProduct[]>> {
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `/products/search.json?query=${encodedQuery}&limit=${limit}`;
  return makeAdminRequest<AdminResponse<AdminProduct[]>>(endpoint);
}

// Get inventory levels for a product
export async function getProductInventory(productId: number): Promise<any> {
  const endpoint = `/products/${productId}/inventory_levels.json`;
  return makeAdminRequest<any>(endpoint);
}

// Update inventory level for a product variant
export async function updateInventoryLevel(
  inventoryItemId: number,
  locationId: number,
  available: number
): Promise<any> {
  const endpoint = `/inventory_levels/set.json`;
  const body = {
    location_id: locationId,
    inventory_item_id: inventoryItemId,
    available: available,
  };

  return makeAdminRequest<any>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// Get all locations
export async function getLocations(): Promise<any> {
  const endpoint = `/locations.json`;
  return makeAdminRequest<any>(endpoint);
}

// Get orders (with optional filters)
export async function getOrders(
  limit: number = 50,
  status?: string,
  financial_status?: string
): Promise<any> {
  let endpoint = `/orders.json?limit=${limit}`;
  if (status) endpoint += `&status=${status}`;
  if (financial_status) endpoint += `&financial_status=${financial_status}`;
  
  return makeAdminRequest<any>(endpoint);
}

// Get a single order by ID
export async function getOrder(orderId: number): Promise<any> {
  const endpoint = `/orders/${orderId}.json`;
  return makeAdminRequest<any>(endpoint);
}

// Get customers
export async function getCustomers(limit: number = 50): Promise<any> {
  const endpoint = `/customers.json?limit=${limit}`;
  return makeAdminRequest<any>(endpoint);
}

// Get a single customer by ID
export async function getCustomer(customerId: number): Promise<any> {
  const endpoint = `/customers/${customerId}.json`;
  return makeAdminRequest<any>(endpoint);
}

// Helper function to check if a product is in stock
export async function isProductInStock(productId: number): Promise<boolean> {
  try {
    const inventory = await getProductInventory(productId);
    return inventory.inventory_levels.some((level: any) => level.available > 0);
  } catch (error) {
    console.error('Error checking product stock:', error);
    return false;
  }
}

// Helper function to get total inventory count for a product
export async function getProductTotalInventory(productId: number): Promise<number> {
  try {
    const inventory = await getProductInventory(productId);
    return inventory.inventory_levels.reduce((total: number, level: any) => total + level.available, 0);
  } catch (error) {
    console.error('Error getting product total inventory:', error);
    return 0;
  }
}
