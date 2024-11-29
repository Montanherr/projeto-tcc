import React from 'react';
import { Link } from 'react-router-dom';

function Header({ cartItems }) {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Loja de Produtos</h1>
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Produtos
        </Link>
        <Link
          to="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Registrar
        </Link>
        <div className="bg-green-600 py-2 px-4 rounded-lg text-lg">
        <Link
          to="/cart"
         
        >
           <span>Carrinho: {cartItems} itens</span>
        </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
