import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CouponInput from './components/CouponInput';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={
            <>
              <Cart />
              <CouponInput />
            </>
          } />
        </Routes>
      </Container>
    </>
  );
}

export default App;