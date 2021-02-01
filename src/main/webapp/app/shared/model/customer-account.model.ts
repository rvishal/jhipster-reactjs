import { ITransactions } from 'app/shared/model/transactions.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { AccountType } from 'app/shared/model/enumerations/account-type.model';

export interface ICustomerAccount {
  id?: number;
  accountNumber?: number;
  accountType?: AccountType;
  fullDayBalance?: number;
  halfDayBalance?: number;
  finalBalance?: number;
  transactions?: ITransactions[];
  customerID?: ICustomer;
}

export const defaultValue: Readonly<ICustomerAccount> = {};
