import { Locator, Page } from '@playwright/test'

export class NavigationPage {

    readonly page: Page
    readonly formLayoutsMenuItem: Locator
    readonly smartTabPageMenuItem: Locator
    readonly toastrPageMenuItem: Locator
    readonly datepickerMenuItem: Locator


    constructor(page: Page){
        this.page = page
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.smartTabPageMenuItem = page.getByText('Smart Table')
        this.toastrPageMenuItem = page.getByText('Toastr')
        this.datepickerMenuItem = page.getByText('Datepicker')

    }

    async formLayoutPage(){
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.datepickerMenuItem.click()
    }

    async smartTabPage(){
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTabPageMenuItem.click()
    }

    async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrPageMenuItem.click()
    }

    async tootipPage(){

    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false") {
            await groupMenuItem.click()
        }
    }


}

