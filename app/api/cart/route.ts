import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { shopifyClient } from '@/lib/shopify/storefront';

// Validation schema for cart operations
const cartItemSchema = z.object({
  variantId: z.string().min(1, 'Cart line ID is required'),
  quantity: z.number().int().min(0, 'Quantity must be a non-negative integer'),
});

const cartOperationSchema = z.object({
  action: z.enum(['add', 'remove', 'update', 'clear', 'get']),
  items: z.array(cartItemSchema).optional(),
  cartId: z.string().optional(),
});

// Additional validation for add operations
const addToCartSchema = z.object({
  action: z.literal('add'),
  items: z.array(cartItemSchema),
  cartId: z.string().nullable().optional(),
});

// Shopify cart creation mutation
const CREATE_CART_MUTATION = `
  mutation createCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Shopify cart update mutation
const UPDATE_CART_MUTATION = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Shopify cart add lines mutation
const ADD_CART_LINES_MUTATION = `
  mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Shopify cart retrieval query
const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
                product {
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

// Query to get product variant details including inventory
const GET_PRODUCT_VARIANT_QUERY = `
  query getProductVariant($id: ID!) {
    productVariant(id: $id) {
      id
      quantityAvailable
      availableForSale
    }
  }
`;

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Parse and validate request body
    const body = await request.json();
    
    // Special handling for add operations
    if (body.action === 'add') {
      const validatedData = addToCartSchema.parse(body);
      
      logger.info('Add to cart operation requested', {
        action: validatedData.action,
        itemsCount: validatedData.items.length,
        existingCartId: validatedData.cartId,
      });
      
             const result = await addToCart(validatedData.items, validatedData.cartId || undefined);
      
      const responseTime = Date.now() - startTime;
      logger.logApiRequest('POST', '/api/cart', 200, responseTime);
      
      return NextResponse.json({
        success: true,
        ...result,
      });
    }
    
    // Validate other operations
    const validatedData = cartOperationSchema.parse(body);
    
    // Log the cart operation
    logger.info('Cart operation requested', {
      action: validatedData.action,
      itemsCount: validatedData.items?.length || 0,
    });
    
    let result: any = {};
    
    switch (validatedData.action) {
      case 'update':
        result = await updateCart(validatedData.cartId!, validatedData.items || []);
        break;
        
      case 'remove':
        result = await updateCart(validatedData.cartId!, validatedData.items || []);
        break;
        
      case 'clear':
        result = await clearCart(validatedData.cartId!);
        break;
        
      case 'get':
        result = await getCart(validatedData.cartId!);
        break;
        
      default:
        throw new Error('Invalid cart action');
    }
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Log API performance
    logger.logApiRequest('POST', '/api/cart', 200, responseTime);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
    
  } catch (error) {
    // Log the error
    logger.error('Cart operation failed', error as Error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid request data',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }, { status: 400 });
    }
    
    // Handle other errors
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Helper functions for cart operations
async function addToCart(items: Array<{ variantId: string; quantity: number }>, existingCartId?: string) {
  try {
    logger.info('Adding items to cart', { items, existingCartId });
    
    let cart;
    
    if (existingCartId) {
      // Add to existing cart
      logger.info('Adding items to existing cart', { cartId: existingCartId });
      
      // Get current cart to see existing items
      const currentCartResponse = await shopifyClient.request(GET_CART_QUERY, {
        cartId: existingCartId,
      }) as any;
      
      const currentCart = currentCartResponse.cart;
      if (!currentCart) {
        throw new Error('Existing cart not found');
      }
      
      // Check if any of the new items already exist in the cart
      const existingVariants = new Map();
      currentCart.lines.edges.forEach((edge: any) => {
        existingVariants.set(edge.node.merchandise.id, {
          id: edge.node.id,
          currentQuantity: edge.node.quantity,
        });
      });
      
             // Separate existing items to update and new items to add
       const linesToUpdate: Array<{ id: string; quantity: number }> = [];
       const linesToAdd: Array<{ merchandiseId: string; quantity: number }> = [];
       
       // Add existing items that aren't being modified
       currentCart.lines.edges.forEach((edge: any) => {
         const isBeingModified = items.some(item => item.variantId === edge.node.merchandise.id);
         if (!isBeingModified) {
           linesToUpdate.push({
             id: edge.node.id,
             quantity: edge.node.quantity,
           });
         }
       });
       
       // Separate new items and existing items
       items.forEach(item => {
         const existingVariant = existingVariants.get(item.variantId);
         if (existingVariant) {
           // Update existing variant quantity
           linesToUpdate.push({
             id: existingVariant.id,
             quantity: existingVariant.currentQuantity + item.quantity,
           });
         } else {
           // Add new variant
           linesToAdd.push({
             merchandiseId: item.variantId,
             quantity: item.quantity,
           });
         }
       });
       
       let updatedCart = currentCart;
       
       // First, update existing items
       if (linesToUpdate.length > 0) {
         const updateResponse = await shopifyClient.request(UPDATE_CART_MUTATION, {
           cartId: existingCartId,
           lines: linesToUpdate,
         }) as any;
         
         if (updateResponse.cartLinesUpdate?.userErrors?.length > 0) {
           throw new Error(updateResponse.cartLinesUpdate.userErrors[0].message);
         }
         
         updatedCart = updateResponse.cartLinesUpdate.cart;
       }
       
       // Then, add new items if any
       if (linesToAdd.length > 0) {
         const addResponse = await shopifyClient.request(ADD_CART_LINES_MUTATION, {
           cartId: existingCartId,
           lines: linesToAdd,
         }) as any;
         
         if (addResponse.cartLinesAdd?.userErrors?.length > 0) {
           throw new Error(addResponse.cartLinesAdd.userErrors[0].message);
         }
         
         updatedCart = addResponse.cartLinesAdd.cart;
       }
       
       cart = updatedCart;
    } else {
      // Create new cart
      logger.info('Creating new cart');
      
      const cartInput = {
        lines: items.map(item => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        })),
      };
      
      const response = await shopifyClient.request(CREATE_CART_MUTATION, {
        input: cartInput,
      }) as any;
      
      if (response.cartCreate?.userErrors?.length > 0) {
        throw new Error(response.cartCreate.userErrors[0].message);
      }
      
      cart = response.cartCreate.cart;
    }
    
    // Fetch inventory information for each variant
    const cartWithInventory = {
      ...cart,
      lines: {
        ...cart.lines,
        edges: await Promise.all(
          cart.lines.edges.map(async (edge: any) => {
            try {
              const variantResponse = await shopifyClient.request(GET_PRODUCT_VARIANT_QUERY, {
                id: edge.node.merchandise.id,
              }) as any;
              
              const variant = variantResponse.productVariant;
              if (variant) {
                return {
                  ...edge,
                  node: {
                    ...edge.node,
                    merchandise: {
                      ...edge.node.merchandise,
                      quantityAvailable: variant.quantityAvailable,
                      availableForSale: variant.availableForSale,
                    },
                  },
                };
              }
            } catch (variantError) {
              logger.warn('Failed to fetch variant inventory', { 
                variantId: edge.node.merchandise.id, 
                error: variantError 
              });
            }
            
            return edge;
          })
        ),
      },
    };
    
    return {
      message: 'Items added to cart',
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      cart: cartWithInventory,
    };
  } catch (error) {
    logger.error('Failed to add items to cart', error as Error);
    throw error;
  }
}

async function updateCart(cartId: string, items: Array<{ variantId: string; quantity: number }>) {
  try {
    logger.info('Updating cart', { cartId, items });
    
    // Update cart lines in Shopify
    const lines = items.map(item => ({
      id: item.variantId, // This is the cart line ID from the frontend
      quantity: item.quantity,
    }));
    
    const response = await shopifyClient.request(UPDATE_CART_MUTATION, {
      cartId,
      lines,
    }) as any;
    
    if (response.cartLinesUpdate?.userErrors?.length > 0) {
      throw new Error(response.cartLinesUpdate.userErrors[0].message);
    }
    
    const cart = response.cartLinesUpdate.cart;
    
    // Fetch inventory information for each variant
    const cartWithInventory = {
      ...cart,
      lines: {
        ...cart.lines,
        edges: await Promise.all(
          cart.lines.edges.map(async (edge: any) => {
            try {
              const variantResponse = await shopifyClient.request(GET_PRODUCT_VARIANT_QUERY, {
                id: edge.node.merchandise.id,
              }) as any;
              
              const variant = variantResponse.productVariant;
              if (variant) {
                return {
                  ...edge,
                  node: {
                    ...edge.node,
                    merchandise: {
                      ...edge.node.merchandise,
                      quantityAvailable: variant.quantityAvailable,
                      availableForSale: variant.availableForSale,
                    },
                  },
                };
              }
            } catch (variantError) {
              logger.warn('Failed to fetch variant inventory', { 
                variantId: edge.node.merchandise.id, 
                error: variantError 
              });
            }
            
            return edge;
          })
        ),
      },
    };
    
    return {
      message: 'Cart updated',
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      cart: cartWithInventory,
    };
  } catch (error) {
    logger.error('Failed to update cart', error as Error);
    throw error;
  }
}

async function getCart(cartId: string) {
  try {
    logger.info('Getting cart', { cartId });
    
    const response = await shopifyClient.request(GET_CART_QUERY, {
      cartId,
    }) as any;
    
    const cart = response.cart;
    
    if (!cart) {
      throw new Error('Cart not found');
    }
    
    // Fetch inventory information for each variant
    logger.info('Fetching inventory for cart variants', { 
      variantCount: cart.lines.edges.length 
    });
    
    const cartWithInventory = {
      ...cart,
      lines: {
        ...cart.lines,
        edges: await Promise.all(
          cart.lines.edges.map(async (edge: any) => {
            try {
              logger.info('Fetching inventory for variant', { 
                variantId: edge.node.merchandise.id 
              });
              
              const variantResponse = await shopifyClient.request(GET_PRODUCT_VARIANT_QUERY, {
                id: edge.node.merchandise.id,
              }) as any;
              
              const variant = variantResponse.productVariant;
              logger.info('Variant inventory response', { 
                variantId: edge.node.merchandise.id,
                quantityAvailable: variant?.quantityAvailable,
                availableForSale: variant?.availableForSale
              });
              
              if (variant) {
                return {
                  ...edge,
                  node: {
                    ...edge.node,
                    merchandise: {
                      ...edge.node.merchandise,
                      quantityAvailable: variant.quantityAvailable,
                      availableForSale: variant.availableForSale,
                    },
                  },
                };
              }
            } catch (variantError) {
              logger.warn('Failed to fetch variant inventory', { 
                variantId: edge.node.merchandise.id, 
                error: variantError 
              });
            }
            
            return edge;
          })
        ),
      },
    };
    
    logger.info('Cart with inventory processed', { 
      cartId: cart.id,
      lineCount: cartWithInventory.lines.edges.length
    });
    

    
    return {
      message: 'Cart retrieved',
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      cart: cartWithInventory,
    };
  } catch (error) {
    logger.error('Failed to get cart', error as Error);
    throw error;
  }
}

async function clearCart(cartId: string) {
  try {
    logger.info('Clearing cart', { cartId });
    
    // Set all cart lines to quantity 0 to clear the cart
    const response = await shopifyClient.request(UPDATE_CART_MUTATION, {
      cartId,
      lines: [], // Empty lines will clear the cart
    }) as any;
    
    if (response.cartLinesUpdate?.userErrors?.length > 0) {
      throw new Error(response.cartLinesUpdate.userErrors[0].message);
    }
    
    const cart = response.cartLinesUpdate.cart;
    
    return {
      message: 'Cart cleared',
      cartId: cart.id,
      checkoutUrl: cart.checkoutUrl,
      cart: cart,
    };
  } catch (error) {
    logger.error('Failed to clear cart', error as Error);
    throw error;
  }
}

// Handle GET requests for cart status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get('cartId');
    
    if (!cartId) {
      return NextResponse.json({
        success: false,
        message: 'Cart ID is required',
      }, { status: 400 });
    }
    
    const result = await getCart(cartId);
    
    return NextResponse.json({
      success: true,
      ...result,
    });
    
  } catch (error) {
    logger.error('Cart retrieval failed', error as Error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to retrieve cart',
    }, { status: 500 });
  }
}
