import { PartialType } from '@nestjs/mapped-types';
import { AccountCreationDTO } from './account-creation.dto';
export class AccountUpdationDTO extends PartialType(AccountCreationDTO) {}
