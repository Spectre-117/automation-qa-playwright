import BaseComponent from '../BaseComponent.js';

export default class SignUpForm extends BaseComponent {
    constructor(page) {
        super(page);
        this.signUpPopup = page.locator('.modal-content');
        this.firstName = this.signUpPopup.locator('#signupName');
        this.lastName = this.signUpPopup.locator('#signupLastName');
        this.uEmail = this.signUpPopup.locator('#signupEmail');
        this.uPassword = this.signUpPopup.locator('#signupPassword');
        this.uRepeatPassword = this.signUpPopup.locator('#signupRepeatPassword');
        this.invalidFeedback = this.signUpPopup.locator('.invalid-feedback');
        this.signInButton = this.signUpPopup.locator('.btn-primary');
    }

    async signUpFillForm({name, lastName, email, password, repeatPassword} = {}) {
        if (name) {
            await this.firstName.fill(name);
            await this.firstName.blur();
        }
        if (lastName) {
            await this.lastName.fill(lastName);
            await this.lastName.blur();
        }
        if (email) {
            await this.uEmail.fill(email);
            await this.uEmail.blur();
        }
        if (password) {
            await this.uPassword.fill(password);
            await this.uPassword.blur();
        }
        if (repeatPassword) {
            await this.uRepeatPassword.fill(repeatPassword);
            await this.uRepeatPassword.blur();
        }
    }

}