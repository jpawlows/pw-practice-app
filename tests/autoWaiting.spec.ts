import { state } from '@angular/animations'
import {test , expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://www.uitestingplayground.com/ajax')
    await page.locator('#ajaxButton').click()
})

test.skip('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    //await successButton.click()
    //const text = await successButton.textContent()
    //await successButton.waitFor({state: 'attached'})
    //const text = await successButton.allTextContents()
    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})

test.skip( 'ALternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')
    // __wait for element
    //await page.waitForSelector('.bg-success')

    //__wait for particular response
    //await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

    //__wait for network calls to be completed ('Not recommended')
    await page.waitForLoadState('networkidle')

    const text = await successButton.textContent()
    expect(text).toContain('Data loaded with AJAX get request.')


})

