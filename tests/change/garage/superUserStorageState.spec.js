import {userGaragePage} from '../../../src/customFixtures/UserGaragePage.js';

userGaragePage.describe('User garage', () => {
    userGaragePage('Create car - simple test', async ({garagePage}) => {

        const car = {
            brand: 'Audi',
            model: 'R8',
            mileage: '446'
        };

        await userGaragePage.step('Create a new car', async () => {
            await garagePage.createCar(car);
            const carCard = await garagePage.getCarCard({brand:car.brand, model:car.model},0);
            await carCard.assertBrand(car.brand);
            await carCard.assertModel(car.model);
            await carCard.assertMileage(car.mileage);
        });
    });
});