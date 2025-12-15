import signUpInvalidPassword from '../../fixtures/signUpData/PasswordData/signUpInvalidPasswordsList.json' with { type: 'json' };
import signUpValidPassword from '../../fixtures/signUpData/PasswordData/signUpValidPasswordsList.json' with { type: 'json' };
import {expect, test} from '@playwright/test';
import MainPage from '../../../src/pageObjects/mainPage/MainPage.js';

test.describe('Password field validation', () => {

    let mainPage;

    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        await mainPage.navigate();
    });

    for (const {title, input, expected} of signUpValidPassword) {
        test(title, async () => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm({'password': input.password});

            await expect(signUpForm.uPassword).toHaveCSS('border-color', expected.borderColor);
        });
    }

    test('Password is required', async () => {
        const signUpForm = await mainPage.openSignInForm();
        await signUpForm.uPassword.focus();
        await signUpForm.uPassword.blur();

        await expect(signUpForm.uPassword).toHaveCSS('border-color', signUpInvalidPassword[0].expected.borderColor);
        await expect(signUpForm.invalidFeedback).toHaveText('Password required');
    });


    for (const {title, input, expected} of signUpInvalidPassword) {
        test(title, async () => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm({'password': input.password});

            await expect(signUpForm.uPassword).toHaveCSS('border-color', expected.borderColor);
            await expect(signUpForm.invalidFeedback).toHaveText(expected.message);

        });
    }


});