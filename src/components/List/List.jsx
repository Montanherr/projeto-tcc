import React, { useEffect, useState } from 'react';

// Usando uma fake API. No caso da JSONPlaceholder, você pode substituir pelo endpoint da sua escolha.
const API_URL = 'https://fakestoreapi.com/products';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fazendo a chamada à fake API para obter os produtos
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar os produtos', error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Exibição enquanto os dados estão sendo carregados
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <img
              src={product.image} // Supondo que a API tenha a chave `image`
              alt={product.title} // Supondo que a API tenha a chave `title`
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <p className="text-lg text-gray-700 mb-4">Preço: R${product.price}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
