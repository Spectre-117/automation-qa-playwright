import signUpInvalidNamesList from '../../fixtures/signUpData/NameData/signUpInvalidNamesList.json' with { type: 'json' };
import signUpValidNamesList from '../../fixtures/signUpData/NameData/signUpValidNamesList.json' with {type: 'json'};

import {expect, test} from '@playwright/test';


test.describe('Name field validation', () => {


    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    for (const {title, input, expected} of signUpValidNamesList) {
        test(title, async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupName').fill(input.name);
            await signUpPopup.locator('#signupName').blur();

            await expect(signUpPopup.locator('#signupName')).toHaveCSS('border-color', expected.borderColor);
        });
    }

    test('Name is required', async ({page}) => {
        const signUpButton = page.locator('.btn-primary');
        await signUpButton.click();

        const signUpPopup = page.locator('.modal-content');
        await signUpPopup.locator('#signupName').focus();
        await signUpPopup.locator('#signupName').blur();

        await expect(signUpPopup.locator('#signupName')).toHaveCSS('border-color', signUpInvalidNamesList[0].expected.borderColor);
        await expect(signUpPopup.locator('.invalid-feedback')).toHaveText('Name required');
    });


    for (const {title, input, expected} of signUpInvalidNamesList) {
        test(title, async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupName').fill(input.name);
            await signUpPopup.locator('#signupName').blur();

            await expect(signUpPopup.locator('.invalid-feedback')).toHaveText(expected.message);
            await expect(signUpPopup.locator('#signupName')).toHaveCSS('border-color', expected.borderColor);
        });
    }
});