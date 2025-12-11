import BaseComponent from '../BaseComponent.js';

export default class SignInForm extends BaseComponent{
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

    async signUpButtonClick() {
        await this.signInButton.click();
    }

    async signUpFillForm(name, lastName, email, password) {
        await this.firstName.fill(name);
        await this.lastName.fill(lastName);
        await this.uEmail.fill(email);
        await this.uPassword.fill(password);
        await this.uRepeatPassword.fill(password);
    }

    async fillFirstName(name) {
        await this.firstName.fill(name);
        await this.firstName.blur();
    }

    async fillEmptyFirstName() {
        await this.firstName.focus();
        await this.firstName.blur();
    }

    async fillLastName(lastName) {
        await this.lastName.fill(lastName);
        await this.lastName.blur();
    }

    async fillEmptyLastName() {
        await this.lastName.focus();
        await this.lastName.blur();
    }

    async fillEmail(email) {
        await this.uEmail.fill(email);
        await this.uEmail.blur();
    }

    async fillEmptyEmail() {
        await this.uEmail.focus();
        await this.uEmail.blur();
    }

    async fillPassword(password) {
        await this.uPassword.fill(password);
        await this.uPassword.blur();
    }

    async fillEmptyPassword() {
        await this.uPassword.focus();
        await this.uPassword.blur();
    }

    async fillRepeatPassword(password) {
        await this.uRepeatPassword.fill(password);
        await this.uRepeatPassword.blur();
    }

    async fillEmptyRepeatPassword() {
        await this.uRepeatPassword.focus();
        await this.uRepeatPassword.blur();
    }
}