import {expect, test} from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe.skip('Sign up functionality',async ()=>{


    const userData = {
        'userFirstName': faker.person.firstName(),
        'userLastName': faker.person.lastName(),
        'userPassword' : `Password*${faker.number.int({min: 10, max: 1000})}`,
        'userEmail' : faker.internet.email()
    };

    test.beforeEach(async ({page})=>{
        await page.goto('/');

        const signUpButton = page.locator('.btn-primary');
        await signUpButton.click();

        // const signUpPopup = page.locator('.modal-content');
        // const signupName = signUpPopup.locator('#signupName');
        // const signUpLastName = signUpPopup.locator('#signupLastName');
        // const signupEmail = signUpPopup.locator('#signupEmail');
        // const signupPassword = signUpPopup.locator('#signupPassword');
        // const signupRepeatPassword = signUpPopup.locator('#signupRepeatPassword');
        // const submitButton = signUpButton.locator('.btn-primary');
        //
        // await signupName.fill(userData.userFirstName);
        // await signUpLastName.fill(userData.userLastName);
        // await signupEmail.fill(userData.userEmail);
        // await signupPassword.fill(userData.userPassword);
        // await signupRepeatPassword.fill(userData.userPassword);
        // await submitButton.click();

        const signUpPopup = page.locator('.modal-content');
        await signUpPopup.locator('#signupName').fill(userData.userFirstName);
        await signUpPopup.locator('#signupLastName').fill(userData.userLastName);
        await signUpPopup.locator('#signupEmail').fill(userData.userEmail);
        await signUpPopup.locator('#signupPassword').fill(userData.userPassword);
        await signUpPopup.locator('#signupRepeatPassword').fill(userData.userPassword);
        await signUpPopup.locator('.btn-primary').click();

        const logOutBtn = page.locator('.sidebar_btn', {hasText: 'Log Out' });
        await logOutBtn.click();
    });

// cy.get('.sidebar_btn').contains(' Log out ').click();

    test('Signup with valid credentials',async ({page})=>{

        const signInButton = page.getByRole('button',{name:'Sign In'});
        await signInButton.click();
        const signInPopup = page.locator('.modal-content');
        await signInPopup.locator('#signinEmail').fill(userData.userEmail);
        await signInPopup.locator('#signinPassword').fill(userData.userPassword);
        await signInPopup.locator('.btn-primary').click();

        await expect(page).toHaveURL(/.*\/panel\/garage/);

        const pageHeading = page.locator('.panel-page_heading');
        const adCarButton =  pageHeading.locator('.btn-primary', {hasText:'Add car'});
        await expect(adCarButton).toBeVisible();
        await expect(adCarButton).toBeEnabled();
    });

});