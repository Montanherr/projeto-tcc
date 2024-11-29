import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage({ cart, onRemoveFromCart }) {
  const navigate = useNavigate();

  // Função para calcular o total do carrinho
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  // Função para finalizar a compra e redirecionar para o checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio! Adicione produtos antes de finalizar.');
    } else {
      navigate('/checkout', { state: { cart } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Carrinho de Compras</h2>
      
      {cart.length === 0 ? (
        <p className="text-lg text-gray-500 text-center">Seu carrinho está vazio!</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between items-center p-4 border border-gray-300 rounded-md">
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="ml-4 text-lg text-gray-600">R${product.price}</p>
                </div>
                <button
                  onClick={() => onRemoveFromCart(product.id)}
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total: R${calculateTotal()}</h3>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
