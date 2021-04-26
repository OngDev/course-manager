import express, {Application, Request, Response} from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import logger from './utils/logger';
import is from './utils/env';

dotenv.config();

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan(is.development ? 'dev' : 'common'));
app.use(cors());

app.get(
    '/',
    (req: Request, res: Response): Response => {
      return res.status(200).send({
        message: 'Hello World!',
      });
    },
);

try {
  app.listen(port, (): void => {
    logger.info(`Connected successfully on port ${port}`);
  });
} catch (error) {
  logger.error(`Error occured: ${error.message}`);
}
