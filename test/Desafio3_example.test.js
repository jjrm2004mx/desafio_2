const expect = require('chai').expect
const { before, after, it, describe } = require('mocha')
const puppeteer = require('puppeteer')

describe ('Desafio 3 - Verificar que el precio de un producto en la pagina principal sea igual que en el carrito', () => {
    let browser, page

    before(async () => {
        browser = await puppeteer.launch({ headless: false })
        page = await browser.newPage()
    })
    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        await page.goto('https://www.costco.com.mx/')
    })

    afterEach(async () => {
        await waitForTimeout(5000) 
    })
/*
    it('Seleccionar el producto Bluey Inflable Decorativo 2.4m ', async () => {
        await page.waitForSelector('#siteLogoContainer');
        const priceOriginal = await page.$eval("body > main > div.page-content.container.main-wrapper > sip-home-page > div > div.no-space > sip-page-slot.Section5.has-components > sip-product-carousel:nth-child(1) > sip-product-carousel-base > div > div.carousel > sip-carousel > owl-carousel-o > div > div.owl-stage-outer.ng-star-inserted > owl-stage > div > div > div:nth-child(1) > div > sip-product-carousel-item > div > div.item-price.ng-star-inserted > sip-product-price-panel > div > div.original-price.ng-star-inserted > span > sip-format-price > span", element => element.textContent);
        console.log('Precio inical  del Bluey Inflable Decorativo: ', priceOriginal.replace('$', '').replace(' ', ''));

        await page.click('body > main > div.page-content.container.main-wrapper > sip-home-page > div > div.no-space > sip-page-slot.Section5.has-components > sip-product-carousel:nth-child(1) > sip-product-carousel-base > div > div.carousel > sip-carousel > owl-carousel-o > div > div.owl-stage-outer.ng-star-inserted > owl-stage > div > div > div:nth-child(1) > div > sip-product-carousel-item > div > span > div > a');
        await page.waitForSelector('body > main > div.page-content.container.main-wrapper > sip-product-details-page > sip-product-details > div > sip-product-title > div > h1');
        const precioFinal = await page.$eval('body > main > div.page-content.container.main-wrapper > sip-product-details-page > sip-product-details > div > div.header-content-container.col-xs-12.col-sm-12.col-md-6.col-tab-6.ng-star-inserted > div > div:nth-child(1) > div > div > div.product-price.ng-star-inserted > div > sip-product-price-panel > div > div.price-original.ng-star-inserted > span > sip-format-price > span', element => element.textContent);
        console.log('Precio final del Bluey Inflable Decorativo: ', precioFinal.replace('$', '').replace(' ', ''));
        expect(priceOriginal.replace('$', '').replace(' ', '')).to.be.equals(precioFinal.replace('$', '').replace(' ', ''));
    })
});
*/
it('Seleccionar el producto ', async () => {
    await page.waitForSelector('#siteLogoContainer');
    const priceOriginal = await page.$eval("body > main > div.page-content.container.main-wrapper > sip-home-page > div > div.no-space > sip-page-slot.Section5.has-components > sip-product-carousel:nth-child(1) > sip-product-carousel-base > div > div.carousel > sip-carousel > owl-carousel-o > div > div.owl-stage-outer.ng-star-inserted > owl-stage > div > div > div:nth-child(1) > div > sip-product-carousel-item > div > div.item-price.ng-star-inserted > sip-product-price-panel > div > div.original-price.ng-star-inserted > span > sip-format-price > span", element => element.textContent);
    console.log('Precio inical producto: ', priceOriginal.replace('$', '').replace(' ', ''));
    await page.click('body > main > div.page-content.container.main-wrapper > sip-home-page > div > div.no-space > sip-page-slot.Section5.has-components > sip-product-carousel:nth-child(1) > sip-product-carousel-base > div > div.carousel > sip-carousel > owl-carousel-o > div > div.owl-stage-outer.ng-star-inserted > owl-stage > div > div > div:nth-child(1) > div > sip-product-carousel-item > div > span > div > a');
    await page.waitForSelector('#add-to-cart-button', element => element.textContent);
    console.log('Producto seleccionado');
  
       await page.click('#add-to-cart-button'); 

       console.log('Esperar el producto en el carrito');
       await page.waitForSelector('#addToCartModal > div.modal-header > span', element => element.textContent);
       console.log('Producto mostrado en el carrito');
    // const precioFinal = await page.$eval('document.querySelector("#addToCartModal > div.modal-body-wrapper > div.modal-body.main-product-body.js-main-product-body > div > sip-add-to-cart-entry > div > div > div.details > div:nth-child(4) > sip-cart-item-price > div > sip-format-price > span")', element => element.textContent);
     //const precioFinal = await page.$eval('#addToCartModal > div.modal-body-wrapper > div.modal-body.main-product-body.js-main-product-body > div > sip-add-to-cart-entry > div > div > div.details > div:nth-child(4) > sip-cart-item-price > div > sip-format-price > span', element => element.textContent);
     const precioFinal = await page.$eval('body > main > div.page-content.container.main-wrapper > sip-product-details-page > sip-product-details > div > div.header-content-container.col-xs-12.col-sm-12.col-md-6.col-tab-6.ng-star-inserted > div > div:nth-child(1) > div > div > div.product-price.ng-star-inserted > div > sip-product-price-panel > div > div.price-original.ng-star-inserted > span > sip-format-price > span', element => element.textContent);
    console.log('Precio final del producto: ', precioFinal.replace('$', '').replace(' ', ''));
    expect(priceOriginal.replace('$', '').replace(' ', '')).to.be.equals(precioFinal.replace('$', '').replace(' ', ''));
})
});

function waitForTimeout(time) {
	return new Promise(function (resolve) { 
		setTimeout(resolve, time)
	})
}