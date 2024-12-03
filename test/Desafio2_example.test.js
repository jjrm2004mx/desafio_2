const expect = require('chai').expect
const { before, after, it, describe } = require('mocha')
const puppeteer = require('puppeteer')

describe ('Desafio 2 - Evaluar la función click en un elemento de una página web mediante nombre, XPath y CSS', () => {
    let browser, page

    before(async () => {
        browser = await puppeteer.launch({ headless: false })  
        page = await browser.newPage()
    })
    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        await page.goto('http://zero.webappsecurity.com/index.html')
    })

    afterEach(async () => {
        await waitForTimeout(3000)
    })

    it('Debe abrir el navegador y evaluar click validando que aparezca un elemento usando el texto del botón', async () => {
        await page.waitForSelector('#searchTerm')
        //await page.click('#onlineBankingMenu > div > strong');
        await page.$$eval('div > strong', buttons => {
            for (const button of buttons) {
              if (button.textContent === 'Online Banking') {
                button.click();
                break; // Clicking the first matching button and exiting the loop
              }
            }
        });
        await page.waitForSelector('body > div.wrapper > div.container > div > div:nth-child(2) > div > div > div > div > div > h1');
    })

    it('abrir el navegador y evaluar click con el xPath del botón', async () => {
        await page.waitForSelector('#searchTerm')
        await page.click('xpath///*[@id="onlineBankingMenu"]/div/strong');
        await page.waitForSelector('body > div.wrapper > div.container > div > div:nth-child(2) > div > div > div > div > div > h1');
    })

    it('Debe abrir el navegador y evaluar click con  id del botón', async () => {
        await page.waitForSelector('#searchTerm')
        await page.click("#onlineBankingMenu");
        await page.waitForSelector('body > div.wrapper > div.container > div > div:nth-child(2) > div > div > div > div > div > h1');
    })
});

function waitForTimeout(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}