const expect = require('chai').expect
const { before, after, it, describe } = require('mocha')
const puppeteer = require('puppeteer')

describe ('Desafio 3 - Simular una compra evaluando que el precio en el carrito sea igual al precio del producto', () => {
    let browser, page

    before(async () => {
        browser = await puppeteer.launch({ headless: false })
        page = await browser.newPage()
    })
    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        await page.goto('https://www.mercadolibre.com.mx/')
    })

    afterEach(async () => {
        await waitForTimeout(5000) 
    })

    it('Debe abrir el navegador y evaluar click validando que aparezca un elemento usando el texto del botón', async () => {
        await page.waitForSelector('.dynamic-carousel__item-container');
        const price = await page.$eval("div > a > div > div > div.dynamic-carousel__price-block > span > span", element => element.textContent);
        console.log('Price: ', price.replace('$', '').replace(' ', ''));

        await page.click('div > a > div > div > div.dynamic-carousel__price-block > span > span');
        await page.waitForSelector('#price > div > div.ui-pdp-price__main-container > div.ui-pdp-price__second-line > span:nth-child(1) > span > span.andes-money-amount__fraction');
        const priceProduct = await page.$eval('#price > div > div.ui-pdp-price__main-container > div.ui-pdp-price__second-line > span:nth-child(1) > span > span.andes-money-amount__fraction', element => element.textContent);
        console.log('Price Product: ', priceProduct.replace('$', '').replace(' ', ''));
        expect(price.replace('$', '').replace(' ', '')).to.be.equals(priceProduct.replace('$', '').replace(' ', ''));
    })
});

function waitForTimeout(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}