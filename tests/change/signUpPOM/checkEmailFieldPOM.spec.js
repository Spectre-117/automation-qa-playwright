import signUpInvalidEmail from '../../fixtures/signUpData/EmailData/signUpInvalidEmail.json' with { type: 'json' };
import signUpValidEmail from '../../fixtures/signUpData/EmailData/signUpValidEmail.json' with {type: 'json'};
import {expect, test} from '@playwright/test';
import MainPage from '../../../src/pageObjects/mainPage/MainPage.js';

test.describe.skip('Email field validation POM', () => {

    let mainPage;
    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        await mainPage.navigate();

    });

    test(signUpValidEmail.title, async () => {
        const signUpForm = await mainPage.openSignInForm();
        await signUpForm.fillEmail(signUpValidEmail.input.email);
        await expect(signUpForm.uEmail).toHaveCSS('border-color', signUpValidEmail.expected.borderColor);
    });


    test('Email is required', async () => {
        const signUpForm = await mainPage.openSignInForm();
        await signUpForm.fillEmptyEmail();
        await expect(signUpForm.uEmail).toHaveCSS('border-color', signUpInvalidEmail.expected.borderColor);
        await expect(signUpForm.invalidFeedback).toHaveText('Email required');

    });

    test(signUpInvalidEmail.title, async () => {
        const signUpForm = await mainPage.openSignInForm();
        await signUpForm.fillEmail(signUpInvalidEmail.input.email);
        await expect(signUpForm.uEmail).toHaveCSS('border-color', signUpInvalidEmail.expected.borderColor);
        await expect(signUpForm.invalidFeedback).toHaveText(signUpInvalidEmail.expected.message);
    });


});