import BaseComponent from '../BaseComponent.js';

export default class SignInForm extends BaseComponent {
    constructor(page) {
        super(page);
        this.signUpPopup = page.locator('.modal-content');
        this.uEmail = this.signUpPopup.locator('#signinEmail');
        this.uPassword = this.signUpPopup.locator('#signinPassword');
        this.signInButton = this.signUpPopup.locator('.btn-primary');
    }

    async signInFillForm({email, password} = {}) {
        if (email) {
            await this.uEmail.fill(email);
            await this.uEmail.blur();
        }
        if (password) {
            await this.uPassword.fill(password);
            await this.uPassword.blur();
        }
    }

    async loginAsUser({email, password}){
        await this.signInFillForm({email, password});
        await this.signInButton.click();
    }

}