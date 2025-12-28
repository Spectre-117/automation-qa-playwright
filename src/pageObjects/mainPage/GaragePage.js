import BasePage from '../BasePage.js';
import AddCarPopup from '../components/AddCarPopup.js';
import CarCard from '../components/CarCard.js';

export default class GaragePage extends BasePage{

    _carCardSelector = 'div.car';

    constructor(page) {
        super(page,'/panel/garage');
        this.addCarButton = page.locator('.btn-primary', {hasText: 'Add car'});
    }

    async openAddCarPopup(){
        await this.addCarButton.click();
        return new AddCarPopup(this.page);
    }

    async createCar({brand, model, mileage}) {
        const popup = await this.openAddCarPopup();
        await popup.createCar({brand, model, mileage});
    }


    getCarCard({brand, model},index) {
        const cardContainer = this.page.locator(this._carCardSelector, {hasText: brand})
            .filter({hasText: model}).nth(index);
        return new CarCard(this.page, cardContainer);
    }

    // getCarCardByIndex(index){
    //     const cardContainer = this.page.locator(this._carCardSelector).nth(index);
    //     return new CarCard(this.page, cardContainer);
    // }
}