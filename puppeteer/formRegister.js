const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Altere conforme necessário
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/register'); // Altere para o URL correto

  // Envia o formulário vazio
  await page.click('button[type="submit"]');

  // Espera um pouco para garantir que o erro apareça
  await page.waitForTimeout(500);

  // Verifica as mensagens de erro
  const erros = await page.$$eval('.text-red-500', elements => elements.map(el => el.textContent));

  if (erros.includes('Email é obrigatório')) {
    console.log('Erro de email detectado');
  } else {
    console.log('Erro de email não detectado');
  }

  if (erros.includes('Nome completo é obrigatório')) {
    console.log('Erro de nome completo detectado');
  } else {
    console.log('Erro de nome completo não detectado');
  }

  if (erros.includes('Senha é obrigatória')) {
    console.log('Erro de senha detectado');
  } else {
    console.log('Erro de senha não detectado');
  }

  if (erros.includes('Sexo é obrigatório')) {
    console.log('Erro de sexo detectado');
  } else {
    console.log('Erro de sexo não detectado');
  }

  // Pausa entre as asserções
  await page.waitForTimeout(300); // 300ms

  // Fecha o navegador
  await browser.close();
})();
