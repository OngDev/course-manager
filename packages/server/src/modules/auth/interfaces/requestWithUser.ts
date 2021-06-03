import { Request } from 'express';
import Account from '../../account/model';

interface RequestWithAccount extends Request {
  account: Account;
}

export default RequestWithAccount;
