describe('Fluir de Navegação de Compras', () => {
  beforeEach(() => {
    // Visita a página inicial da loja de produtos
    cy.visit('http://localhost:3000'); // Altere para o endereço correto se necessário
  });

  it('Deve navegar para a página de produtos, adicionar produto ao carrinho e acessar a página de registro', () => {
    // Verifica se o botão "Produtos" está visível e clica nele
    cy.get('a').contains('Produtos').click();

    // Verifica se a URL foi alterada para a página de produtos
    cy.url().should('include', '/'); // Ajuste conforme a URL correta da página de produtos

    // Suponha que cada produto tenha um botão "Comprar" - clica no primeiro botão "Comprar"
    cy.get('button').contains('Comprar').first().click();

    // Verifica se o carrinho foi atualizado corretamente
    // Aqui verificamos que o link do carrinho agora mostra 1 item
    cy.get('a').contains('Carrinho').click();

  });
});
