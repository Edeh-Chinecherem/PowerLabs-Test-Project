import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { cart } = useContext(CartContext)!;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          PowerLabs Shop
        </Typography>
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;