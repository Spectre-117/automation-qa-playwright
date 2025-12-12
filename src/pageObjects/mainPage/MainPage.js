import BasePage from '../BasePage.js';
import {expect} from '@playwright/test';
import SignInForm from '../components/SignInForm.js';

export default class MainPage extends BasePage{
    constructor(page) {
        super(page,'/');
        this.page = page;
        this.signUpButton =  page.locator('.btn-primary');
    }

    async openSignInForm(){
        await this.signUpButton.click();
        await expect(this.page.locator('.modal-content')).toBeVisible();
        return new SignInForm(this.page);
    }


}