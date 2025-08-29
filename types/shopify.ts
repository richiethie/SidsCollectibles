// Shopify Storefront API Types
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  vendor: string;
  tags: string[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  images: {
    edges: Array<{
      node: Image;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  options: ProductOption[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: SelectedOption[];
  price: Money;
  compareAtPrice?: Money;
  image?: Image;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface Image {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  updatedAt: string;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
    pageInfo: PageInfo;
  };
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  totalQuantity: number;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  merchandise: ProductVariant;
}

// Shopify Admin API Types
export interface AdminProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  template_suffix: string;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: AdminProductVariant[];
  options: AdminProductOption[];
  images: AdminImage[];
}

export interface AdminProductVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2?: string;
  option3?: string;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id?: number;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
}

export interface AdminProductOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface AdminImage {
  id: number;
  product_id: number;
  position: number;
  created_at: string;
  updated_at: string;
  alt?: string;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
  admin_graphql_api_id: string;
}

// API Response Types
export interface StorefrontResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
    path: string[];
  }>;
}

export interface AdminResponse<T> {
  [key: string]: T;
}

// Form Types
export interface RepairRequest {
  name: string;
  email: string;
  phone: string;
  itemDescription: string;
  issueDescription: string;
  preferredContactMethod: 'email' | 'phone';
  urgency: 'low' | 'medium' | 'high';
  images?: File[];
}

export interface RepairRequestResponse {
  success: boolean;
  message: string;
  requestId?: string;
}
