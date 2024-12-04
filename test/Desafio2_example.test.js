const expect = require('chai').expect
const { before, after, it, describe } = require('mocha')
const puppeteer = require('puppeteer')

describe ('Desafio 2 - Evaluar la función click con el  nombre, XPath y CSS', () => {
    let browser, page

    before(async () => {
        browser = await puppeteer.launch({ headless: false })  
        page = await browser.newPage()
        await page.setViewport({ width: 1920, height: 1080 })
    })
    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        await page.goto('https://www.costco.com.mx/')
    })

    afterEach(async () => {
        await waitForTimeout(3000)
    })

    it('Buscar en el navegador el elemento HTML "a" y compararlo  el texto LLantas', async () => {
        await page.waitForSelector('#siteLogoContainer')  
      
        await page.$$eval('body > main > sip-header > header > div.container-fluid > div:nth-child(2) > nav > div > div.navigation-wrapper.v-align-container > div > div.NavigationBar.has-components > ul:nth-child(3) > li > a', buttons => {
            for (const button of buttons) {
              if (button.textContent === 'Llantas') {  
                button.click();
                break; 
              }
            }
        });
        await page.waitForSelector('body > main > div.container.bottom-header.BottomHeader.has-components > sip-cms-breadcrumb > div > ol > li:nth-child(2) > span');
    })

    it('abrir el navegador y evaluar click con el xPath del botón', async () => {
        await page.waitForSelector('#siteLogoContainer')
        await page.click('xpath///html/body/main/sip-header/header/div[2]/div[2]/nav/div/div[1]/div/div[2]/ul[3]/li/a');
        await page.waitForSelector('body > main > div.container.bottom-header.BottomHeader.has-components > sip-cms-breadcrumb > div > ol > li:nth-child(2) > span');
    })

    it('Abrir el navegador y evaluar click mediante CSS', async () => {
        await page.waitForSelector('#siteLogoContainer')
        await page.click("body > main > sip-header > header > div.container-fluid > div:nth-child(2) > nav > div > div.navigation-wrapper.v-align-container > div > div.NavigationBar.has-components > ul:nth-child(3) > li > a");
        await page.waitForSelector('body > main > div.container.bottom-header.BottomHeader.has-components > sip-cms-breadcrumb > div > ol > li:nth-child(2) > span');
    })
});

function waitForTimeout(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}