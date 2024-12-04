describe('Fluir de Navegação de Compras', () => {
    beforeEach(() => {
      // Visita a página inicial da loja de produtos
      cy.visit('http://localhost:3000'); // Altere para o endereço correto se necessário
    });
  
    it('Deve navegar para a página de produtos, adicionar produto ao carrinho e acessar o carrinho', () => {
      // Verifica se o botão "Produtos" está visível e clica nele
      cy.get('a').contains('Produtos').click();
  
      // Verifica se a URL foi alterada para a página de produtos
      cy.url().should('include', '/'); // Ajuste conforme a URL correta da página de produtos
  
      // Suponha que cada produto tenha um botão "Comprar" - clica no primeiro botão "Comprar"
      cy.get('button').contains('Comprar').first().click();
  
      // Verifica se o carrinho foi atualizado corretamente
      // Aqui verificamos que o link do carrinho agora mostra 1 item
      cy.get('a').contains('Carrinho').should('contain', '(1 item)');

  
      // Clica no link do carrinho para acessar a página de carrinho
      cy.get('a').contains('Carrinho').click();
  
      // Verifica se a URL foi alterada para a página do carrinho
      cy.url().should('include', 'cart'); // Ajuste conforme a URL correta da página do carrinho
  
      // Verifica se a página do carrinho foi carregada (verifica a presença de um título, por exemplo)
      cy.get('h1').should('contain', 'Carrinho'); // Substitua com o título ou elemento adequado para a página de carrinho
    });
  });
  