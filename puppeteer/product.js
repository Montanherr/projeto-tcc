const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Lançar o navegador em modo não-headless
  const page = await browser.newPage();
  
  // Acesse a página
  await page.goto('http://127.0.0.1:5500/web-tcc/product.html'); // Certifique-se de usar o URL correto
  
  // Aguarde até que os produtos sejam carregados e o botão esteja visível
  await page.waitForRequest('.product button', { visible: true });

  // Adiciona 10 produtos ao carrinho
  for (let i = 0; i < 10; i++) {
    // Clique no botão "Adicionar ao Carrinho"
    await page.click('.product button');
    
    // Aguarde 1 segundo entre os cliques (ajuste conforme necessário)
    await page.waitFor(1000); // Aguarda 1 segundo
  }

  
})();
