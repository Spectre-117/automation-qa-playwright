import signUpInvalidReEnterPassword from '../../fixtures/signUpData/ReEnterPasswordData/signUpInvalidReEnterPasswordsList.json' with { type: 'json' };
import signUpValidReEnterPassword from '../../fixtures/signUpData/ReEnterPasswordData/signUpValidReEnterPasswordsList.json' with { type: 'json' };
import {expect, test} from '@playwright/test';

test.describe.skip('Repeat password field validation', () => {


    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    for (const {title, input, expected} of signUpValidReEnterPassword) {
        test(title, async ({page}) => {

            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupPassword').fill(input.password);
            await signUpPopup.locator('#signupPassword').blur();

            await signUpPopup.locator('#signupRepeatPassword').fill(input.repeatPassword);
            await signUpPopup.locator('#signupRepeatPassword').blur();

            await expect(signUpPopup.locator('#signupRepeatPassword')).toHaveCSS('border-color', expected.borderColor);
        });
    }

    test('Re-enter password required', async ({page}) => {
        const signUpButton = page.locator('.btn-primary');
        await signUpButton.click();

        const signUpPopup = page.locator('.modal-content');
        await signUpPopup.locator('#signupPassword').fill(signUpValidReEnterPassword[0].input.password);
        await signUpPopup.locator('#signupPassword').blur();

        await signUpPopup.locator('#signupRepeatPassword').focus();
        await signUpPopup.locator('#signupRepeatPassword').blur();

        await expect(signUpPopup.locator('#signupRepeatPassword')).toHaveCSS('border-color', signUpInvalidReEnterPassword[0].expected.borderColor);
        await expect(signUpPopup.locator('.invalid-feedback')).toHaveText('Re-enter password required');
    });


    for (const {title, input, expected} of signUpInvalidReEnterPassword) {
        test(title, async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupPassword').fill(input.password);
            await signUpPopup.locator('#signupPassword').blur();

            await signUpPopup.locator('#signupRepeatPassword').fill(input.repeatPassword);
            await signUpPopup.locator('#signupRepeatPassword').blur();

            await expect(signUpPopup.locator('.invalid-feedback')).toHaveText(expected.message);
            await expect(signUpPopup.locator('#signupRepeatPassword')).toHaveCSS('border-color', expected.borderColor);
        });
    }
});