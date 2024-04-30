import {Page , expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import { FormLayoutPage } from '../page-objects/formLayoutPage'
import { DatepickerPage } from '../page-objects/datepickerPage'

export class PageManager{

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutPage
    private readonly datepickerPage: DatepickerPage

    constructor (page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }


    get navigateTo(){
        return this.navigationPage
    }
    get onFormLayoutsPage(){
        return this.formLayoutsPage
    }
    get onDatepickerPage(){
        return this.datepickerPage
    }

}