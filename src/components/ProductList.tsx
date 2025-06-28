import { useContext, useEffect, useState } from 'react';
import { CartContext } from "../context/CartContext";
import type { Product } from "../types/types";
import { Button, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import productsData from '../data/products.json';

const ProductList = () => {
  const { addToCart } = useContext(CartContext)!;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // For development: using direct import
        // For production: you could switch to fetch if needed
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
      {products.map((product) => (
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
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;