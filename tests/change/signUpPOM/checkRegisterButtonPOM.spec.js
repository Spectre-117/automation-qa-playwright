import {faker} from '@faker-js/faker';
import {expect, test} from '@playwright/test';
import MainPage from '../../../src/pageObjects/mainPage/MainPage.js';
import GaragePage from '../../../src/pageObjects/mainPage/GaragePage.js';

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
            await signUpForm.signUpFillForm({'name':userData.userFirstName,
                'lastName':userData.userLastName,
                'email':userData.userEmail,
                'password':userData.userPassword,
                'repeatPassword':userData.userPassword
            });

            await expect(signUpForm.signInButton).toBeEnabled();
        });

        test('User can be registered with valid data', async ({page}) => {
            userMainPage = new GaragePage(page);

            const signUpForm = await mainPage.openSignInForm();

            await signUpForm.signUpFillForm({'name':userData.userFirstName,
                'lastName':userData.userLastName,
                'email':userData.userEmail,
                'password':userData.userPassword,
                'repeatPassword':userData.userPassword
            });

            await signUpForm.signInButton.click();

            await expect(userMainPage.addCarButton).toBeVisible();
            await expect(userMainPage.addCarButton).toBeEnabled();
        });

        test('Register button is disabled if input data is incorrect', async () => {
            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm({'name':'Name4',
                'lastName':userData.userLastName,
                'email':userData.userEmail,
                'password':userData.userPassword,
                'repeatPassword':userData.userPassword
            });

            await expect(signUpForm.signInButton).toBeDisabled();
        });

        test('Register button is disabled if input data is missed', async () => {

            const signUpForm = await mainPage.openSignInForm();

            await signUpForm.firstName.focus();
            await signUpForm.firstName.blur();
            await signUpForm.signUpFillForm({
                'lastName':userData.userLastName,
                'email':userData.userEmail,
                'password':userData.userPassword,
                'repeatPassword':userData.userPassword
            });

            await expect(signUpForm.signInButton).toBeDisabled();
        });

        test('Register button is disabled if input data in Name field is out of bounds (lees than 2 characters)', async () => {
            const signUpForm = await mainPage.openSignInForm();

            await signUpForm.signUpFillForm({'name':'N',
                'lastName':userData.userLastName,
                'email':userData.userEmail,
                'password':userData.userPassword,
                'repeatPassword':userData.userPassword
            });

            await expect(signUpForm.signInButton).toBeDisabled();
        });

        test('Register button is disabled if input data in Name field is out of bounds (more than 20 characters)', async () => {

            const signUpForm = await mainPage.openSignInForm();
            await signUpForm.signUpFillForm({'name':'NameNameNameNameNameN',
                'lastName':userData.userLastName,
                'email':userData.userEmail,
                'password':userData.userPassword,
                'repeatPassword':userData.userPassword
            });

            await expect(signUpForm.signInButton).toBeDisabled();
        });
        // Negative checking for other fields combined with Register button checking in registration form can be added further

    }
);