import dotenv from 'dotenv';
dotenv.config();

export default {
    baseUrl : process.env.BASE_URL,
    httpCredentials : {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD
    },
};