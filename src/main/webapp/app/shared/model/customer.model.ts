import { Moment } from 'moment';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';

export interface ICustomer {
  id?: number;
  customerId?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  emailId?: string;
  phoneNumber?: string;
  customerAccounts?: ICustomerAccount[];
}

export const defaultValue: Readonly<ICustomer> = {};
