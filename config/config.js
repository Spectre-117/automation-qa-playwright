import dotenv from 'dotenv';
dotenv.config();

export default {
    baseUrl : process.env.BASE_URL,
    credentials : {
        userName: process.env.HTTP_CREDENTIALS_USERNAME,
        userPassword: process.env.HTTP_CREDENTIALS_PASSWORD
    },
};
