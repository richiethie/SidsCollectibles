'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback, useRef } from 'react';

// Cart item interface
interface CartItem {
  id: string;
  variantId: string;
  title: string;
  quantity: number;
  price: {
    amount: string;
    currencyCode: string;
  };
  image?: {
    url: string;
    altText?: string;
  };
  handle: string;
  quantityAvailable?: number;
}

// Cart state interface
interface CartState {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

// Cart action types
type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART'; payload: { cartId: string; checkoutUrl: string; items: CartItem[] } }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_ITEMS'; payload: CartItem[] };

// Cart context interface
interface CartContextType {
  state: CartState;
  addToCart: (variantId: string, quantity: number, product: any) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCart: () => Promise<void>;
  goToCheckout: () => void;
}

// Initial cart state
const initialState: CartState = {
  items: [],
  cartId: null,
  checkoutUrl: null,
  isLoading: false,
  error: null,
};

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CART':
      return {
        ...state,
        cartId: action.payload.cartId,
        checkoutUrl: action.payload.checkoutUrl,
        items: action.payload.items,
        error: null,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        error: null,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        error: null,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        error: null,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        cartId: null,
        checkoutUrl: null,
        error: null,
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
        error: null,
      };
    default:
      return state;
  }
}

// Create cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const isRequesting = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    // Set loading state while hydrating cart from localStorage
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Load cart data synchronously
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.cartId && parsedCart.items) {
          dispatch({
            type: 'SET_CART',
            payload: {
              cartId: parsedCart.cartId,
              checkoutUrl: parsedCart.checkoutUrl || null,
              items: parsedCart.items,
            },
          });
        }
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
    
    // Set loading to false after hydration is complete
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (state.cartId || state.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify({
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
        items: state.items,
      }));
    } else {
      localStorage.removeItem('cart');
    }
  }, [state.cartId, state.checkoutUrl, state.items]);

  // Add item to cart
  const addToCart = useCallback(async (variantId: string, quantity: number, product: any) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          items: [{ variantId, quantity }],
          cartId: state.cartId, // Pass existing cart ID if available
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to add item to cart');
      }

                   // Update cart state with the new cart data from Shopify
      const mappedItems = result.cart.lines.edges.map((edge: any) => {
        const item = {
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          price: edge.node.merchandise.price,
          image: edge.node.merchandise.product.images.edges[0]?.node,
          handle: edge.node.merchandise.product.handle,
          quantityAvailable: edge.node.merchandise.quantityAvailable,
        };
        
        return item;
      });
      
      dispatch({
        type: 'SET_CART',
        payload: {
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: mappedItems,
        },
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.cartId]);

  // Update item quantity
  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (!state.cartId) {
        throw new Error('No cart found');
      }

      const item = state.items.find(item => item.id === itemId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          cartId: state.cartId,
          items: [{ variantId: item.id, quantity }], // Use cart line ID
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to update cart');
      }

             // Update cart state with fresh data from Shopify
      const mappedItems = result.cart.lines.edges.map((edge: any) => {
        const item = {
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          price: edge.node.merchandise.price,
          image: edge.node.merchandise.product.images.edges[0]?.node,
          handle: edge.node.merchandise.product.handle,
          quantityAvailable: edge.node.merchandise.quantityAvailable,
        };
        
                 return item;
      });
      
      dispatch({
        type: 'SET_CART',
        payload: {
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: mappedItems,
        },
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update quantity';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.cartId]);

  // Remove item from cart
  const removeFromCart = useCallback(async (itemId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (!state.cartId) {
        throw new Error('No cart found');
      }

      const item = state.items.find(item => item.id === itemId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update',
          cartId: state.cartId,
          items: [{ variantId: item.id, quantity: 0 }], // Use cart line ID and set quantity to 0 to remove
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to remove item');
      }

      // Update cart state with fresh data from Shopify
      const mappedItems = result.cart.lines.edges.map((edge: any) => {
        const item = {
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          price: edge.node.merchandise.price,
          image: edge.node.merchandise.product.images.edges[0]?.node,
          handle: edge.node.merchandise.product.handle,
          quantityAvailable: edge.node.merchandise.quantityAvailable,
        };
        
                 return item;
      });
      
      dispatch({
        type: 'SET_CART',
        payload: {
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: mappedItems,
        },
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.cartId]);

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (state.cartId) {
        // Clear cart in Shopify by setting all quantities to 0
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'update',
            cartId: state.cartId,
            items: state.items.map(item => ({ variantId: item.id, quantity: 0 })),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to clear cart in Shopify');
        }
      }

      // Clear local state
      dispatch({ type: 'CLEAR_CART' });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.cartId]);

  // Get cart from Shopify
  const getCart = useCallback(async () => {
    if (!state.cartId || isRequesting.current) {
      return;
    }

    try {
      isRequesting.current = true;
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await fetch(`/api/cart?cartId=${state.cartId}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to get cart');
      }

             // Update cart state with fresh data
      const mappedItems = result.cart.lines.edges.map((edge: any) => {
        const item = {
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          title: edge.node.merchandise.product.title,
          quantity: edge.node.quantity,
          price: edge.node.merchandise.price,
          image: edge.node.merchandise.product.images.edges[0]?.node,
          handle: edge.node.merchandise.product.handle,
          quantityAvailable: edge.node.merchandise.quantityAvailable,
        };
        
                 return item;
      });
      
      dispatch({
        type: 'SET_CART',
        payload: {
          cartId: result.cartId,
          checkoutUrl: result.checkoutUrl,
          items: mappedItems,
        },
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get cart';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      isRequesting.current = false;
    }
  }, [state.cartId]);

  // Go to checkout
  const goToCheckout = useCallback(() => {
    if (state.checkoutUrl) {
      window.location.href = state.checkoutUrl;
    }
  }, [state.checkoutUrl]);

  const value: CartContextType = {
    state,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCart,
    goToCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
