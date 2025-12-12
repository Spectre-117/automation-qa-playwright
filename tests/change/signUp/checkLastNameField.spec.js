import signUpInvalidLastNamesList from '../../fixtures/signUpData/LastNameData/signUpInvalidLastNamesList.json' with { type: 'json' };
import signUpValidLastNamesList from '../../fixtures/signUpData/LastNameData/signUpValidLastNamesList.json' with { type: 'json' };
import {expect, test} from '@playwright/test';

test.describe.skip('Last Name field validation', () => {


    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    for (const {title, input, expected} of signUpValidLastNamesList) {
        test(title, async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupLastName').fill(input.name);
            await signUpPopup.locator('#signupLastName').blur();

            await expect(signUpPopup.locator('#signupLastName')).toHaveCSS('border-color', expected.borderColor);
        });
    }

    test('Last name is required', async ({page}) => {
        const signUpButton = page.locator('.btn-primary');
        await signUpButton.click();

        const signUpPopup = page.locator('.modal-content');
        await signUpPopup.locator('#signupLastName').focus();
        await signUpPopup.locator('#signupLastName').blur();

        await expect(signUpPopup.locator('#signupLastName')).toHaveCSS('border-color', signUpInvalidLastNamesList[0].expected.borderColor);
        await expect(signUpPopup.locator('.invalid-feedback')).toHaveText('Last name required');
    });


    for (const {title, input, expected} of signUpInvalidLastNamesList) {
        test(title, async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupLastName').fill(input.name);
            await signUpPopup.locator('#signupLastName').blur();

            await expect(signUpPopup.locator('.invalid-feedback')).toHaveText(expected.message);
            await expect(signUpPopup.locator('#signupLastName')).toHaveCSS('border-color', expected.borderColor);
        });
    }


});