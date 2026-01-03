import {test as setup} from '@playwright/test';
import MainPage from '../../src/pageObjects/mainPage/MainPage.js';

setup.skip('Login as Super User', async ({page, context}) => {
    const superUserCredentials = {
        email: 'slia@test.com',
        password: 'Password1'
    };

    const mainPage = new MainPage(page);
    await mainPage.navigate();
    await mainPage.loginAsUser(superUserCredentials);

    await context.storageState({
        path: 'state/userStorageState.json'
    });
});