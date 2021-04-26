/* eslint-disable no-process-env */
import dotenv from 'dotenv';

dotenv.config();
const {NODE_ENV} = process.env;
const is = {
  development: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
};

export default is;
