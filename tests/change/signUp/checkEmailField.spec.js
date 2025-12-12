import signUpInvalidEmail from '../../fixtures/signUpData/EmailData/signUpInvalidEmail.json' with { type: 'json' };
import signUpValidEmail from '../../fixtures/signUpData/EmailData/signUpValidEmail.json' with { type: 'json' };
import {expect, test} from '@playwright/test';

test.describe.skip('Email field validation', () => {


    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    test(signUpValidEmail.title, async ({page}) => {
        const signUpButton = page.locator('.btn-primary');
        await signUpButton.click();

        const signUpPopup = page.locator('.modal-content');
        await signUpPopup.locator('#signupEmail').fill(signUpValidEmail.input.email);
        await signUpPopup.locator('#signupEmail').blur();

        await expect(signUpPopup.locator('#signupEmail')).toHaveCSS('border-color', signUpValidEmail.expected.borderColor);

    });


    test('Email is required', async ({page}) => {
        const signUpButton = page.locator('.btn-primary');
        await signUpButton.click();

        const signUpPopup = page.locator('.modal-content');
        await signUpPopup.locator('#signupEmail').focus();
        await signUpPopup.locator('#signupEmail').blur();

        await expect(signUpPopup.locator('#signupEmail')).toHaveCSS('border-color', signUpInvalidEmail.expected.borderColor);
        await expect(signUpPopup.locator('.invalid-feedback')).toHaveText('Email required');
        
    });

    test(signUpInvalidEmail.title, async ({page}) => {
        const signUpButton = page.locator('.btn-primary');
        await signUpButton.click();

        const signUpPopup = page.locator('.modal-content');
        await signUpPopup.locator('#signupEmail').fill(signUpInvalidEmail.input.email);
        await signUpPopup.locator('#signupEmail').blur();

        await expect(signUpPopup.locator('#signupEmail')).toHaveCSS('border-color', signUpInvalidEmail.expected.borderColor);
        await expect(signUpPopup.locator('.invalid-feedback')).toHaveText(signUpInvalidEmail.expected.message);

    });


});