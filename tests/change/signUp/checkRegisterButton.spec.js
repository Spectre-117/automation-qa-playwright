import {faker} from '@faker-js/faker';
import {expect, test} from '@playwright/test';

test.describe.skip('Register button validation', () => {

        const userData = {
            'userFirstName': faker.person.firstName(),
            'userLastName': faker.person.lastName(),
            'userPassword': `Password*${faker.number.int({min: 10, max: 1000})}`,
            'userEmail': faker.internet.email()
        };

        test.beforeEach(async ({page}) => {
            await page.goto('/');


        });

        test('Register button is enabled if input data is correct', async ({page}) => {

            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupName').fill(userData.userFirstName);
            await signUpPopup.locator('#signupLastName').fill(userData.userLastName);
            await signUpPopup.locator('#signupEmail').fill(userData.userEmail);
            await signUpPopup.locator('#signupPassword').fill(userData.userPassword);
            await signUpPopup.locator('#signupRepeatPassword').fill(userData.userPassword);

            await expect(signUpPopup.locator('.btn-primary')).toBeEnabled();
        });

        test('User can be registered with valid data', async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupName').fill(userData.userFirstName);
            await signUpPopup.locator('#signupLastName').fill(userData.userLastName);
            await signUpPopup.locator('#signupEmail').fill(userData.userEmail);
            await signUpPopup.locator('#signupPassword').fill(userData.userPassword);
            await signUpPopup.locator('#signupRepeatPassword').fill(userData.userPassword);

            await signUpPopup.locator('.btn-primary').click();

            const addCarButton = page.locator('.btn-primary', {hasText: 'Add car'});
            await expect(addCarButton).toBeVisible();
            await expect(addCarButton).toBeEnabled();
        });

        test('Register button is disabled if input data is incorrect', async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupName').fill('Name4');
            await signUpPopup.locator('#signupLastName').fill(userData.userLastName);
            await signUpPopup.locator('#signupEmail').fill(userData.userEmail);
            await signUpPopup.locator('#signupPassword').fill(userData.userPassword);
            await signUpPopup.locator('#signupRepeatPassword').fill(userData.userPassword);

            await expect(signUpPopup.locator('.btn-primary')).toBeDisabled();
        });

        test('Register button is disabled if input data is missed', async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupName').focus();
            await signUpPopup.locator('#signupName').blur();
            await signUpPopup.locator('#signupLastName').fill(userData.userLastName);
            await signUpPopup.locator('#signupEmail').fill(userData.userEmail);
            await signUpPopup.locator('#signupPassword').fill(userData.userPassword);
            await signUpPopup.locator('#signupRepeatPassword').fill(userData.userPassword);

            await expect(signUpPopup.locator('.btn-primary')).toBeDisabled();
        });

        test('Register button is disabled if input data in Name field is out of bounds (lees than 2 characters)', async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupName').fill('N');
            await signUpPopup.locator('#signupLastName').fill(userData.userLastName);
            await signUpPopup.locator('#signupEmail').fill(userData.userEmail);
            await signUpPopup.locator('#signupPassword').fill(userData.userPassword);
            await signUpPopup.locator('#signupRepeatPassword').fill(userData.userPassword);

            await expect(signUpPopup.locator('.btn-primary')).toBeDisabled();
        });

        test('Register button is disabled if input data in Name field is out of bounds (more than 20 characters)', async ({page}) => {
            const signUpButton = page.locator('.btn-primary');
            await signUpButton.click();

            const signUpPopup = page.locator('.modal-content');
            await signUpPopup.locator('#signupName').fill('NameNameNameNameNameN');
            await signUpPopup.locator('#signupLastName').fill(userData.userLastName);
            await signUpPopup.locator('#signupEmail').fill(userData.userEmail);
            await signUpPopup.locator('#signupPassword').fill(userData.userPassword);
            await signUpPopup.locator('#signupRepeatPassword').fill(userData.userPassword);

            await expect(signUpPopup.locator('.btn-primary')).toBeDisabled();
        });
        // Negative checking for other fields combined with Register button checking in registration form can be added further

    }
);