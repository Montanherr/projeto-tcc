import React, { useState } from 'react';

const CadastroForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    senha: '',
    confirmacaoSenha: '',
    sexo: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    nome: '',
    senha: '',
    confirmacaoSenha: '',
    sexo: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = { ...errors };

    // Validação dos campos
    if (!formData.email) formErrors.email = 'Email é obrigatório';
    if (!formData.nome) formErrors.nome = 'Nome completo é obrigatório';
    if (!formData.senha) formErrors.senha = 'Senha é obrigatória';
    if (formData.senha !== formData.confirmacaoSenha) {
      formErrors.confirmacaoSenha = 'Senhas não correspondem';
    }
    if (!formData.sexo) formErrors.sexo = 'Sexo é obrigatório';

    setErrors(formErrors);

    // Se não houver erros, podemos submeter o formulário e armazenar os dados no localStorage
    if (!Object.values(formErrors).some((error) => error !== '')) {
      // Armazenando os dados no localStorage
      localStorage.setItem('cadastro', JSON.stringify(formData));
      setMessage({ type: 'success', text: 'Cadastro realizado com sucesso!' });
    } else {
      setMessage({ type: 'error', text: 'Por favor, corrija os erros no formulário.' });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Formulário de Cadastro</h2>
      
      {message && (
        <div className={`p-4 mb-4 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded-md`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu nome completo"
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua senha"
          />
          {errors.senha && <p className="text-red-500 text-sm">{errors.senha}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmacaoSenha" className="block text-sm font-medium text-gray-700">Confirmação de Senha:</label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={formData.confirmacaoSenha}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirme sua senha"
          />
          {errors.confirmacaoSenha && <p className="text-red-500 text-sm">{errors.confirmacaoSenha}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sexo:</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="sexo"
                value="masculino"
                checked={formData.sexo === 'masculino'}
                onChange={handleChange}
                className="mr-2"
              />
              Masculino
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sexo"
                value="feminino"
                checked={formData.sexo === 'feminino'}
                onChange={handleChange}
                className="mr-2"
              />
              Feminino
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sexo"
                value="prefiroNaoDizer"
                checked={formData.sexo === 'prefiroNaoDizer'}
                onChange={handleChange}
                className="mr-2"
              />
              Prefiro não dizer
            </label>
          </div>
          {errors.sexo && <p className="text-red-500 text-sm">{errors.sexo}</p>}
        </div>

        <div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroForm;
