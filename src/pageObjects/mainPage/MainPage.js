import BasePage from '../BasePage.js';
import {expect} from '@playwright/test';
import SignUpForm from '../components/SignUpForm.js';
import SignInForm from '../components/SignInForm.js';

export default class MainPage extends BasePage{
    constructor(page) {
        super(page,'/');
        this.page = page;
        this.signUpButton =  page.locator('.btn-primary');
        this.signInButton =  page.locator('.header_signin');
    }

    async openSignUpForm(){
        await this.signUpButton.click();
        await expect(this.page.locator('.modal-content')).toBeVisible();
        return new SignUpForm(this.page);
    }

    async openSignInForm(){
        await this.signInButton.click();
        await expect(this.page.locator('.modal-content')).toBeVisible();
        return new SignInForm(this.page);
    }

    async loginAsUser({email, password}){
        const signInForm = await this.openSignInForm();
        await signInForm.loginAsUser({email, password});
        await expect(this.page.getByText('Log out')).toBeVisible();
    }
}