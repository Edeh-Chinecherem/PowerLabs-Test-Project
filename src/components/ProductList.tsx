import { useContext, useEffect, useState } from 'react';
import { CartContext } from "../context/CartContext";
import type { Product } from "../types/types";
import { Button, Card, CardContent, Typography, CircularProgress, Alert, IconButton, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import productsData from '../data/products.json';

const ProductList = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext)!;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductQuantity = (productId: number) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleIncreaseQuantity = (product: Product) => {
    addToCart(product);
  };

  const handleDecreaseQuantity = (product: Product) => {
    removeFromCart(product.id);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <Grid container spacing={3} style={{ padding: '20px' }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {products.map((product) => {
        const quantity = getProductQuantity(product.id);
        
        return (
          <Grid key={product.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardContent>
                {quantity === 0 ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(product)}
                    sx={{ 
                      mt: 'auto',
                      '&:hover': {
                        backgroundColor: 'primary.dark'
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      border: '1px solid',
                      borderColor: 'primary.main',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleDecreaseQuantity(product)}
                      sx={{ 
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: 'primary.light'
                        }
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ px: 2 }}>
                      {quantity}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleIncreaseQuantity(product)}
                      sx={{ 
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: 'primary.light'
                        }
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductList;