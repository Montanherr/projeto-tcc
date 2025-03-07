describe('Teste de E-commerce Fake', () => {
    beforeEach(() => {
      // Visita a página principal do e-commerce
      cy.visit('http://127.0.0.1:5500/web-tcc/product.html'); // Certifique-se de que o servidor está rodando na porta 5500 ou use a URL correta
    });
  
    it('Deve carregar a lista de produtos', () => {
      // Verifica se a lista de produtos é carregada corretamente
      cy.get('.product').should('have.length.greaterThan', 0); // Verifica se há mais de um produto
      cy.get('.product h3').first().should('exist'); // Verifica se o nome do produto é exibido
      cy.get('.product p').first().should('exist'); // Verifica se o preço do produto é exibido
  
      // Adiciona um delay de 5 segundos
      cy.wait(5000);
    });
  
    it('Deve adicionar 10 produtos ao carrinho', () => {
      // Loop para adicionar 10 produtos ao carrinho
      for (let i = 0; i < 10; i++) {
        cy.get('.product button').first().click();  // Clica no botão de adicionar produto
        cy.wait(1000);  // Delay de 1 segundo após adicionar cada produto (ajuste conforme necessário)
      }
  
      // Verifica se o carrinho contém 10 produtos
      cy.get('#cart').should('contain', 'Carrinho: 10 produto(s)');
  
      // Adiciona um delay de 5 segundos após a ação
      cy.wait(5000);
    });
  
    it('Deve exibir o botão de checkout quando 10 produtos forem adicionados ao carrinho', () => {
      // Adiciona 10 produtos e verifica se o botão de checkout aparece
      for (let i = 0; i < 10; i++) {
        cy.get('.product button').first().click();  // Adiciona o produto
        cy.wait(1000);  // Delay após adicionar cada produto
      }
  
      // Verifica se o carrinho foi atualizado corretamente
      cy.get('#cart').should('contain', 'Carrinho: 10 produto(s)');
  
      // Espera o botão de checkout aparecer
      cy.get('#checkout').should('be.visible');
    });
  
    it('Deve exibir o resumo da compra na tela de checkout', () => {
      // Adiciona 10 produtos ao carrinho
      for (let i = 0; i < 10; i++) {
        cy.get('.product button').first().click();
        cy.wait(1000);  // Delay após cada adição
      }
  
      // Vai para a tela de checkout
      cy.get('#checkout').click();
      cy.wait(5000); // Delay após o clique no checkout
  
      // Verifica se o resumo da compra é exibido
      cy.get('h2').should('contain', 'Resumo do Carrinho');
      cy.get('h3').should('contain', 'Total:');
    });
  
  });
  