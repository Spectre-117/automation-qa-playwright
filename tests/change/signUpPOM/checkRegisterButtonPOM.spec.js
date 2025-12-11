import {faker} from '@faker-js/faker';
import {expect, test} from '@playwright/test';
import MainPage from '../../../src/pageObjects/mainPage/MainPage.js';
import UserMainPage from '../../../src/pageObjects/mainPage/UserMainPage.js';

test.describe('Register button validation', () => {

        const userData = {
            'userFirstName': faker.person.firstName(),
            'userLastName': faker.person.lastName(),
            'userPassword': `Password*${faker.number.int({min: 10, max: 1000})}`,
            'userEmail': faker.internet.email()
        };

        let mainPage;
        let userMainPage;

        test.beforeEach(async ({page}) => {
            mainPage = new MainPage(page);

            await mainPage.navigate();
        });

        test('Register button is enabled if input data is correct', async () => {

            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm(userData.userFirstName,
                userData.userLastName,
                userData.userEmail,
                userData.userPassword);

            await expect(signUpForm.signInButton).toBeEnabled();
        });

        test('User can be registered with valid data', async ({page}) => {
            userMainPage = new UserMainPage(page);

            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm(userData.userFirstName,
                userData.userLastName,
                userData.userEmail,
                userData.userPassword);

            await signUpForm.signInButton.click();

            await expect(userMainPage.addCarButton).toBeVisible();
            await expect(userMainPage.addCarButton).toBeEnabled();
        });

        test('Register button is disabled if input data is incorrect', async ({page}) => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm('Name4',
                userData.userLastName,
                userData.userEmail,
                userData.userPassword);

            await expect(signUpForm.signInButton).toBeDisabled();
        });

        test('Register button is disabled if input data is missed', async ({page}) => {

            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.fillEmptyFirstName();
            await signUpForm.fillLastName(userData.userLastName);
            await signUpForm.fillEmail(userData.userEmail);
            await signUpForm.fillPassword(userData.userPassword);
            await signUpForm.fillRepeatPassword(userData.userPassword);

            await expect(signUpForm.signInButton).toBeDisabled();
        });

        test('Register button is disabled if input data in Name field is out of bounds (lees than 2 characters)', async ({page}) => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm('N',
                userData.userLastName,
                userData.userEmail,
                userData.userPassword);

            await expect(signUpForm.signInButton).toBeDisabled();
        });

        test('Register button is disabled if input data in Name field is out of bounds (more than 20 characters)', async ({page}) => {

            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm('NameNameNameNameNameN',
                userData.userLastName,
                userData.userEmail,
                userData.userPassword);

            await expect(signUpForm.signInButton).toBeDisabled();
        });
        // Negative checking for other fields combined with Register button checking in registration form can be added further

    }
);