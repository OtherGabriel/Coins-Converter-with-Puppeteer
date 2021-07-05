const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

async function robot () {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const baseCoin = readlineSync.question('Moeda base: ') || 'dolar';
  const finalCoin = readlineSync.question('Moeda final: ') || 'real';  

  const myUrl = `https://www.google.com/search?channel=fs&client=ubuntu&q=${ baseCoin }+para+${ finalCoin }`;
  await page.goto(myUrl);

  const finalValue = await page.evaluate(() => {
    return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
  });

  console.log(`O valor de 1 ${ baseCoin } em ${ finalCoin } é de: ${ finalValue }`);

  await browser.close();
}

robot();
