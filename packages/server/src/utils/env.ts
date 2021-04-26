/* eslint-disable no-process-env */
import dotenv from 'dotenv';

dotenv.config();
export const env = process.env;
const {NODE_ENV} = env;
export const is = {
  development: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
};


