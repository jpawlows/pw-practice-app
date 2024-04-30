import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker} from '@faker-js/faker'



test.beforeEach( async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form Page', async ({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo.formLayoutPage()
    await pm.navigateTo.smartTabPage()
    await pm.navigateTo.toastrPage()
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName({firstName: "Jakub"})
    const randomEmail = `${randomFullName.replace(' ','')}${faker.number.int(100)}@${faker.company.name()}.com`

    await pm.navigateTo.formLayoutPage()
    await pm.onFormLayoutsPage.submitUsingThisGridFormWithCredentialsANdSelectOption('test@test.pl', 'Welcome', 'Option 1')
    await pm.onFormLayoutsPage.submitInLIneFormWIthNameEmailAndCheckBox(randomFullName, randomEmail, true)
    // await pm.navigateTo.datepickerPage()
    // await pm.onDatepickerPage.selectCommonDatePickerDateFromToday(5)
    // await pm.onDatepickerPage.selectDatepickerWithRangeFromToday(5 , 10)
})

