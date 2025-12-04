import signUpInvalidPassword from '../../fixtures/signUpData/PasswordData/signUpInvalidPasswordsList.json' with { type: 'json' };
import signUpValidPassword from '../../fixtures/signUpData/PasswordData/signUpValidPasswordsList.json' with { type: 'json' };
import {expect, test} from '@playwright/test';

test.describe('Password field validation', () => {


    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    for (const {title, input, expected} of signUpValidPassword) {
        test(title, async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupPassword').fill(input.password);
            await signUpPopup.locator('#signupPassword').blur();

            await expect(signUpPopup.locator('#signupPassword')).toHaveCSS('border-color', expected.borderColor);
        });
    }

    test('Name is required', async ({page}) => {
        const signUpButton = page.locator('.btn-primary');
        await signUpButton.click();

        const signUpPopup = page.locator('.modal-content');
        await signUpPopup.locator('#signupPassword').focus();
        await signUpPopup.locator('#signupPassword').blur();

        await expect(signUpPopup.locator('#signupPassword')).toHaveCSS('border-color', signUpInvalidPassword[0].expected.borderColor);
        await expect(signUpPopup.locator('.invalid-feedback')).toHaveText('Password required');
    });


    for (const {title, input, expected} of signUpInvalidPassword) {
        test(title, async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupPassword').fill(input.password);
            await signUpPopup.locator('#signupPassword').blur();

            await expect(signUpPopup.locator('.invalid-feedback')).toHaveText(expected.message);
            await expect(signUpPopup.locator('#signupPassword')).toHaveCSS('border-color', expected.borderColor);
        });
    }


});