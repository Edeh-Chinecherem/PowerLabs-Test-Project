import { useContext, useEffect, useState } from 'react';
import { CartContext } from "../context/CartContext";
import type { Product } from "../types/types";
import { Button, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';

const ProductList = () => {
  const { addToCart } = useContext(CartContext)!;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/src/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
    <Grid container spacing={3} style={{ padding: '20px' }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                sx={{ mt: 'auto' }}
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