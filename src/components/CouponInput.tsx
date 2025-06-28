import React, { useState, useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { 
  TextField, 
  Button, 
  Box, 
  Typography,
  Alert,
  AlertTitle,
  Collapse,
  IconButton 
} from '@mui/material';
import { Close } from '@mui/icons-material';

const CouponInput = () => {
  const [couponCode, setCouponCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { applyCoupon, discount } = useContext(CartContext)!;

  const handleApplyCoupon = () => {
    // Basic validation
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      setSuccess(false);
      return;
    }

    // Apply coupon through context
    const isValid = applyCoupon(couponCode);
    
    if (isValid) {
      setSuccess(true);
      setError('');
    } else {
      setError('Invalid coupon code. Try "POWERLABSx" for 13.2% off');
      setSuccess(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  return (
    <Box sx={{ mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Apply Coupon Code
      </Typography>
      
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Enter coupon code"
          variant="outlined"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          onKeyPress={handleKeyPress}
          error={!!error}
          helperText={error}
          size="small"
        />
        <Button 
          variant="contained" 
          onClick={handleApplyCoupon}
          sx={{ height: '40px' }}
        >
          Apply
        </Button>
      </Box>

      {/* Success Message */}
      <Collapse in={success}>
        <Alert 
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccess(false);
              }}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <AlertTitle>Success</AlertTitle>
          Coupon applied! You've received a 13.2% discount.
        </Alert>
      </Collapse>

      {/* Current Discount Indicator */}
      {discount > 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Active Discount</AlertTitle>
          Your {discount * 100}% discount will be applied at checkout.
        </Alert>
      )}

      <Typography variant="body2" color="text.secondary">
        Try using <strong>POWERLABSx</strong> for 13.2% off your order
      </Typography>
    </Box>
  );
};

export default CouponInput;