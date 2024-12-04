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
    
    // Adiciona um pequeno delay para simular um tempo de leitura natural
    cy.wait(500); // Espera 500ms (meio segundo)
  });

  it('Deve mostrar erro ao enviar o formulário vazio', () => {
    cy.get('button[type="submit"]').click(); // Envia o formulário vazio
    
    // Espera um pouco para simular um atraso na interação do usuário
    cy.wait(500);

    cy.get('.text-red-500').should('contain', 'Email é obrigatório');
    cy.get('.text-red-500').should('contain', 'Nome completo é obrigatório');
    cy.get('.text-red-500').should('contain', 'Senha é obrigatória');
    cy.get('.text-red-500').should('contain', 'Sexo é obrigatório');
    
    // Pausa entre as asserções
    cy.wait(300); // 300ms
  });

  it('Deve preencher o formulário corretamente', () => {
    // Preenche os campos do formulário
    cy.get('input[name="email"]').type('teste@dominio.com');
    cy.wait(300); // Pausa após digitar o email
    cy.get('input[name="nome"]').type('João da Silva');
    cy.wait(300); // Pausa após digitar o nome
    cy.get('input[name="senha"]').type('123456');
    cy.wait(300); // Pausa após digitar a senha
    cy.get('input[name="confirmacaoSenha"]').type('123456');
    cy.wait(300); // Pausa após digitar a confirmação da senha
    cy.get('input[name="sexo"][value="masculino"]').check();
    cy.wait(300); // Pausa após selecionar o sexo

    // Envia o formulário
    cy.get('button[type="submit"]').click();
    
    // Espera antes de verificar a mensagem de sucesso
    cy.wait(500); // Pausa para simular um tempo de espera após o envio

    // Verifica se a mensagem de sucesso é exibida
    cy.get('.bg-green-500').should('contain', 'Cadastro realizado com sucesso!');
  });

  it('Deve mostrar erro se as senhas não coincidirem', () => {
    // Preenche os campos com senhas diferentes
    cy.get('input[name="email"]').type('teste@dominio.com');
    cy.wait(300); // Pausa após digitar o email
    cy.get('input[name="nome"]').type('João da Silva');
    cy.wait(300); // Pausa após digitar o nome
    cy.get('input[name="senha"]').type('123456');
    cy.wait(300); // Pausa após digitar a senha
    cy.get('input[name="confirmacaoSenha"]').type('654321');
    cy.wait(300); // Pausa após digitar a confirmação da senha
    cy.get('input[name="sexo"][value="masculino"]').check();
    cy.wait(300); // Pausa após selecionar o sexo

    // Envia o formulário
    cy.get('button[type="submit"]').click();

    // Espera antes de verificar a mensagem de erro
    cy.wait(500); // Pausa para simular um tempo de espera após o envio

    // Verifica se o erro das senhas diferentes é exibido
    cy.get('.text-red-500').should('contain', 'Senhas não correspondem');
  });
});
