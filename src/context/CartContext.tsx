"use client"; // Only for Next.js

import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { CartContextType, CartItem, Product } from '../types/types';

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState<number>(0);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const applyCoupon = (code: string) => {
    if (code === 'POWERLABSx') {
      setDiscount(0.132); // 13.2% discount
      return true;
    }
    return false;
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
  };

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, updateQuantity, applyCoupon, discount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};