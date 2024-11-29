import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductList from './components/List/List';
import FormRegister from './components/Forms/FormRegister';
import CartPage from './page/CartPage';  // Nova tela de carrinho
import Checkout from './page/Checkout';



function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <Header cartItems={cart.length} />
      <Routes>
        <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
        <Route path="/register" element={<FormRegister />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<CartPage cart={cart} onRemoveFromCart={handleRemoveFromCart} />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
}

export default App;