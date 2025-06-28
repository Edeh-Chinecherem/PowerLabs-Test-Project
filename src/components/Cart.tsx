"use client"; // Only for Next.js

import React, { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { CartItem } from '@/types/types';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button 
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const Cart = () => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    discount,
    clearCart 
  } = useContext(CartContext)!;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Remove />
                      </IconButton>
                      {item.quantity}
                      <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Add />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeFromCart(item.id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h6">Subtotal: ${subtotal.toFixed(2)}</Typography>
            {discount > 0 && (
              <Typography variant="h6">
                Discount (13.2%): -${discountAmount.toFixed(2)}
              </Typography>
            )}
            <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
            
            <Button 
              variant="contained" 
              color="primary" 
              style={{ marginTop: '10px' }}
              onClick={clearCart}
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;