import signUpInvalidReEnterPassword from '../../fixtures/signUpData/ReEnterPasswordData/signUpInvalidReEnterPasswordsList.json' with { type: 'json' };
import signUpValidReEnterPassword from '../../fixtures/signUpData/ReEnterPasswordData/signUpValidReEnterPasswordsList.json' with { type: 'json' };
import {expect, test} from '@playwright/test';
import MainPage from '../../../src/pageObjects/mainPage/MainPage.js';

test.describe.skip('Repeat password field validation', () => {


    let mainPage;

    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        await mainPage.navigate();
    });

    for (const {title, input, expected} of signUpValidReEnterPassword) {
        test(title, async () => {

            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.fillPassword(input.password);
            await signUpForm.fillRepeatPassword(input.repeatPassword);

            await expect(signUpForm.uRepeatPassword).toHaveCSS('border-color', expected.borderColor);
        });
    }

    test('Re-enter password required', async () => {
        const signUpForm = await mainPage.openSignInForm();
        await signUpForm.fillPassword(signUpValidReEnterPassword[0].input.password);
        await signUpForm.fillEmptyRepeatPassword();

        await expect(signUpForm.uRepeatPassword).toHaveCSS('border-color', signUpInvalidReEnterPassword[0].expected.borderColor);
        await expect(signUpForm.invalidFeedback).toHaveText('Re-enter password required');
    });


    for (const {title, input, expected} of signUpInvalidReEnterPassword) {
        test(title, async () => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.fillPassword(input.password);
            await signUpForm.fillRepeatPassword(input.repeatPassword);

            await expect(signUpForm.invalidFeedback).toHaveText(expected.message);
            await expect(signUpForm.uRepeatPassword).toHaveCSS('border-color', expected.borderColor);
        });
    }
});