const puppeteer = require('puppeteer')
const fs = require('fs')

const gamesArray = []

const scrapper = async (url) => {
  console.log(`Iniciando scraping en: ${url}`)
  const browser = await puppeteer.launch({ headless: false }) // Mostrar navegador
  const page = await browser.newPage()

  try {
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' })

    // Eliminar modales si aparecen
    await removeModals(page)

    await collectData(page)
  } catch (error) {
    console.error('Error en el scraper:', error.message)
  } finally {
    await browser.close()
    console.log('Navegador cerrado.')
  }
}

const removeModals = async (page) => {
  try {
    const modalSelectors = ['.modal', '.popup', '.overlay', '.close-button'] // Posibles selectores de modales
    for (const selector of modalSelectors) {
      const modals = await page.$$(selector)
      for (const modal of modals) {
        try {
          await page.evaluate((el) => el.remove(), modal)
          console.log(`Modal eliminado: ${selector}`)
        } catch (error) {
          console.warn(`No se pudo eliminar el modal: ${selector}`)
        }
      }
    }
  } catch (error) {
    console.warn('Error al intentar cerrar modales:', error.message)
  }
}

const collectData = async (page) => {
  while (true) {
    const products = await page.$$('.game-list-item')

    for (const product of products) {
      try {
        // Extraer el precio o asignar "No disponible" si no existe
        let priceElement = await product.$('.price')
        let price = priceElement
          ? await page.evaluate((el) => el.textContent.trim(), priceElement)
          : 'No disponible'

        // Extraer el título y eliminar la fecha si está presente
        let titleRaw = await product.$eval('.name-block', (el) =>
          el.textContent.trim()
        )
        let title = titleRaw.split('Fecha de lanzamiento:')[0].trim()

        // Extraer la imagen
        let img = await product.$eval('img', (el) => el.src)

        gamesArray.push({ title, price, img })
      } catch (error) {
        console.error('Error al extraer datos:', error.message)
      }
    }

    console.log(`Datos recolectados hasta ahora: ${gamesArray.length}`)

    // Intentar encontrar el botón de siguiente página por clase
    let nextButton = await page.$('.next-page')

    // Si no lo encuentra, buscar por title="siguiente"
    if (!nextButton) {
      nextButton = await page.$('button[title="siguiente"]')
    }

    // Si no hay botón de siguiente página, terminamos
    if (!nextButton) {
      console.log('No hay más páginas disponibles.')
      break
    }

    try {
      await Promise.all([
        nextButton.click(),
        page.waitForNavigation({
          timeout: 60000,
          waitUntil: 'domcontentloaded'
        })
      ])
    } catch (error) {
      console.log(
        'Error al hacer clic en "siguiente" o no hay más páginas:',
        error.message
      )
      break
    }
  }

  saveData()
}

const saveData = () => {
  fs.writeFile('products.json', JSON.stringify(gamesArray, null, 2), (err) => {
    if (err) {
      console.error('Error al guardar datos:', err.message)
    } else {
      console.log('Datos guardados en products.json')
    }
  })
}
module.exports = { scrapper }
