import signUpInvalidNamesList from '../../fixtures/signUpData/NameData/signUpInvalidNamesList.json' with { type: 'json' };
import signUpValidNamesList from '../../fixtures/signUpData/NameData/signUpValidNamesList.json' with {type: 'json'};
import MainPage from '../../../src/pageObjects/mainPage/MainPage.js';
import {expect, test} from '@playwright/test';


test.describe('Name field validation', () => {

    let mainPage;
    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        await mainPage.navigate();

    });

    for (const {title, input, expected} of signUpValidNamesList) {
        test(title, async () => {

            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm({'name': input.name});
            await expect(signUpForm.firstName).toHaveCSS('border-color', expected.borderColor);
        });
    }

    test('Name is required', async () => {
        const signUpForm = await mainPage.openSignInForm();
        await signUpForm.firstName.focus();
        await signUpForm.firstName.blur();
        await expect(signUpForm.firstName).toHaveCSS('border-color', signUpInvalidNamesList[0].expected.borderColor);
        await expect(signUpForm.invalidFeedback).toHaveText('Name required');
    });


    for (const {title, input, expected} of signUpInvalidNamesList) {
        test(title, async () => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm({'name': input.name});
            await expect(signUpForm.firstName).toHaveCSS('border-color', expected.borderColor);
            await expect(signUpForm.invalidFeedback).toHaveText(expected.message);
        });
    }
});