const puppeteer = require('puppeteer');

describe('Cadastro Formulário', () => {
  let browser;
  let page;

  // Inicializa o Puppeteer e abre o navegador antes dos testes
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }); // Usando headless: false para ver a interação
    page = await browser.newPage();
  });

  // Fecha o navegador após os testes
  afterAll(async () => {
    await browser.close();
  });

  it('Deve carregar o formulário de cadastro', async () => {
    await page.goto('http://localhost:3000/register'); // Altere para o URL correto

    // Verifica se o título está correto
    const formHeader = await page.$eval('h2', el => el.textContent);
    expect(formHeader).toBe('Formulário de Cadastro');

    // Verifica se os campos estão visíveis
    const emailVisible = await page.$('input[name="email"]');
    const nomeVisible = await page.$('input[name="nome"]');
    const senhaVisible = await page.$('input[name="senha"]');
    const confirmacaoSenhaVisible = await page.$('input[name="confirmacaoSenha"]');
    const sexoVisible = await page.$('input[name="sexo"]');

    expect(emailVisible).toBeTruthy();
    expect(nomeVisible).toBeTruthy();
    expect(senhaVisible).toBeTruthy();
    expect(confirmacaoSenhaVisible).toBeTruthy();
    expect(sexoVisible).toBeTruthy();
  });

  it('Deve mostrar erro ao enviar o formulário vazio', async () => {
    await page.goto('http://localhost:3000/register'); // Altere para o URL correto

    // Envia o formulário vazio
    await page.click('button[type="submit"]');

    // Espera pela exibição dos erros
    await page.waitForSelector('.text-red-500');

    // Verifica se as mensagens de erro estão presentes
    const errorMessages = await page.$$eval('.text-red-500', elements =>
      elements.map(el => el.textContent)
    );

    expect(errorMessages).toEqual([
      'Email é obrigatório',
      'Nome completo é obrigatório',
      'Senha é obrigatória',
      'Sexo é obrigatório',
    ]);
  });

  it('Deve preencher o formulário corretamente', async () => {
    await page.goto('http://localhost:3000/register'); // Altere para o URL correto

    // Preenche os campos do formulário
    await page.type('input[name="email"]', 'teste@dominio.com');
    await page.type('input[name="nome"]', 'João da Silva');
    await page.type('input[name="senha"]', '123456');
    await page.type('input[name="confirmacaoSenha"]', '123456');
    await page.click('input[name="sexo"][value="masculino"]');

    // Envia o formulário
    await page.click('button[type="submit"]');

    // Espera pela mensagem de sucesso
    await page.waitForSelector('.bg-green-500');

    // Verifica se a mensagem de sucesso foi exibida
    const successMessage = await page.$eval('.bg-green-500', el => el.textContent);
    expect(successMessage).toContain('Cadastro realizado com sucesso!');
  });

  it('Deve mostrar erro se as senhas não coincidirem', async () => {
    await page.goto('http://localhost:3000/register'); // Altere para o URL correto

    // Preenche os campos com senhas diferentes
    await page.type('input[name="email"]', 'teste@dominio.com');
    await page.type('input[name="nome"]', 'João da Silva');
    await page.type('input[name="senha"]', '123456');
    await page.type('input[name="confirmacaoSenha"]', '654321');
    await page.click('input[name="sexo"][value="masculino"]');

    // Envia o formulário
    await page.click('button[type="submit"]');

    // Espera pela mensagem de erro de senhas diferentes
    await page.waitForSelector('.text-red-500');

    // Verifica se a mensagem de erro foi exibida
    const errorMessage = await page.$eval('.text-red-500', el => el.textContent);
    expect(errorMessage).toContain('Senhas não correspondem');
  });
});
