import signUpInvalidLastNamesList from '../../fixtures/signUpData/LastNameData/signUpInvalidLastNamesList.json' with { type: 'json' };
import signUpValidLastNamesList from '../../fixtures/signUpData/LastNameData/signUpValidLastNamesList.json' with { type: 'json' };
import {expect, test} from '@playwright/test';
import MainPage from '../../../src/pageObjects/mainPage/MainPage.js';

test.describe.skip('Last Name field validation', () => {

    let mainPage;

    test.beforeEach(async ({page}) => {
        mainPage = new MainPage(page);
        await mainPage.navigate();
    });


    for (const {title, input, expected} of signUpValidLastNamesList) {
        test(title, async () => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.fillLastName(input.name);
            await expect(signUpForm.lastName).toHaveCSS('border-color', expected.borderColor);
        });
    }

    test('Last name is required', async () => {
        const signUpForm = await mainPage.openSignInForm();
        await signUpForm.fillEmptyLastName();

        await expect(signUpForm.lastName).toHaveCSS('border-color', signUpInvalidLastNamesList[0].expected.borderColor);
        await expect(signUpForm.invalidFeedback).toHaveText('Last name required');
    });


    for (const {title, input, expected} of signUpInvalidLastNamesList) {
        test(title, async () => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.fillLastName(input.name);

            await expect(signUpForm.invalidFeedback).toHaveText(expected.message);
            await expect(signUpForm.lastName).toHaveCSS('border-color', expected.borderColor);
        });
    }


});