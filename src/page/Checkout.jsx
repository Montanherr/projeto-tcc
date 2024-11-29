import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const { state } = useLocation();
  const cart = state?.cart || [];
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      alert('Compra realizada com sucesso!');
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Inserir Dados do Cartão</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-lg font-medium">Número do Cartão</label>
          <input
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="1234 5678 9876 5432"
            maxLength="16"
            required
          />
        </div>
        <div>
          <label htmlFor="cardHolder" className="block text-lg font-medium">Nome no Cartão</label>
          <input
            id="cardHolder"
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Seu Nome"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-lg font-medium">Validade</label>
            <input
              id="expiryDate"
              type="month"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block text-lg font-medium">CVV</label>
            <input
              id="cvv"
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 text-white rounded-md ${isProcessing ? 'bg-gray-400' : 'bg-green-500'}`}
          >
            {isProcessing ? 'Processando...' : 'Finalizar Pagamento'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
