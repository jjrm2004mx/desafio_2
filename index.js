const puppeteer = require('puppeteer')

async function pruebaDenavegador() {
    const browser= await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('http://example.com')
    await browser.close()

    
}  

pruebaDenavegador()