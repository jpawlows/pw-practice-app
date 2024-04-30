import {Page} from '@playwright/test'

export class FormLayoutPage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async submitUsingThisGridFormWithCredentialsANdSelectOption(email: string, password: string, optionText: string){
        const usingTheGridEmailInput = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridEmailInput.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridEmailInput.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridEmailInput.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridEmailInput.getByRole('button').click()
    }

    /**
     * This method will fill out the inline form with user details
     * @param name 
     * @param email 
     * @param rememberMe 
     */

    async submitInLIneFormWIthNameEmailAndCheckBox(name: string, email:string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline Form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await inlineForm.getByRole('checkbox').check({force: true})
        await inlineForm.getByRole('button').click()

    }
}