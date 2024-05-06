import {test, expect} from '@playwright/test'
import { using } from 'rxjs'

test.beforeEach( async ({page}) => {
    await page.goto('/')
})

test.describe('Form Layouts page', () => {
    test.describe.configure({retries: 2})
    test.beforeEach( async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })
    test('input fields', async ({page}, testInfo) => {
        if(testInfo.retry){
            //do something
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com')

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('Radio Buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        //await usingTheGridEmailInput.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})
        const radioSTatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect(radioSTatus).toBe(true)
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })
})
test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
    for(const box of await allBoxes.all()){
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()
    }

})

test('Datepicker', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        let date = new Date()
        date.setDate(date.getDate() + 7)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }
        await page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).
        click()
        await expect(calendarInputField).toHaveValue(dateToAssert)
})

test('Lists and dropdowns', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') // when the list has UL tag
    page.getByRole('listitem') // when list has LI tag

    //const optionList = page.getByRole('list').locator('nb-option')

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light","Dark","Cosmic","Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }
    await dropDownMenu.click()

    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")
            await dropDownMenu.click()
        
    }
})

test('dialog box', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    await page.getByRole('table').locator('tr', {hasText: "@mdo"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText("@mdo")
})
 test('Web Tables', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    const targetRow = page.getByRole('row', {name: "jack@yandex.ru"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').fill('1')
    await page.locator('.nb-checkmark').click()

    await page.locator('.ng2-smart-pagination-nav').getByText("2").click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.pl')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.pl')
})