import BasePage from '../BasePage.js';

export default class GaragePage extends BasePage{
    constructor(page) {
        super(page,'/panel/garage');
        this.addCarButton = page.locator('.btn-primary', {hasText: 'Add car'});
    }
}