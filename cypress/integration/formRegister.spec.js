describe('Cadastro Formulário', () => {
    beforeEach(() => {
      // Vamos abrir o formulário no navegador
      cy.visit('http://localhost:3000/register'); // Altere para o endereço correto se não for o localhost:3000
    });
  
    it('Deve carregar o formulário de cadastro', () => {
      // Verifica se os campos estão visíveis
      cy.get('h2').contains('Formulário de Cadastro');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="nome"]').should('be.visible');
      cy.get('input[name="senha"]').should('be.visible');
      cy.get('input[name="confirmacaoSenha"]').should('be.visible');
      cy.get('input[name="sexo"]').should('be.visible');
    });
  
    it('Deve mostrar erro ao enviar o formulário vazio', () => {
      cy.get('button[type="submit"]').click(); // Envia o formulário vazio
      
      // Verifica se as mensagens de erro são exibidas
      cy.get('.text-red-500').should('have.length', 5); // Deve haver 5 erros (um para cada campo)
    });
  
    it('Deve preencher o formulário corretamente', () => {
      // Preenche os campos do formulário
      cy.get('input[name="email"]').type('teste@dominio.com');
      cy.get('input[name="nome"]').type('João da Silva');
      cy.get('input[name="senha"]').type('123456');
      cy.get('input[name="confirmacaoSenha"]').type('123456');
      cy.get('input[name="sexo"][value="masculino"]').check();
  
      // Envia o formulário
      cy.get('button[type="submit"]').click();
  
      // Verifica se a mensagem de sucesso é exibida
      cy.get('.bg-green-500').should('contain', 'Cadastro realizado com sucesso!');
    });
  
    it('Deve mostrar erro se as senhas não coincidirem', () => {
      // Preenche os campos com senhas diferentes
      cy.get('input[name="email"]').type('teste@dominio.com');
      cy.get('input[name="nome"]').type('João da Silva');
      cy.get('input[name="senha"]').type('123456');
      cy.get('input[name="confirmacaoSenha"]').type('654321');
      cy.get('input[name="sexo"][value="masculino"]').check();
  
      // Envia o formulário
      cy.get('button[type="submit"]').click();
  
      // Verifica se o erro das senhas diferentes é exibido
      cy.get('.text-red-500').should('contain', 'Senhas não correspondem');
    });
  });
  