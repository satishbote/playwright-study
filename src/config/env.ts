import * as dotenv from 'dotenv';

dotenv.config();

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://katalon-demo-cura.herokuapp.com',
  username: process.env.USERNAME ?? '',
  password: process.env.PASSWORD ?? '',
  invalidUsername: process.env.INVALID_USERNAME ?? '',
  invalidPassword: process.env.INVALID_PASSWORD ?? '',
};
