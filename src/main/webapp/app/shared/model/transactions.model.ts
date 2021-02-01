import { Moment } from 'moment';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';
import { DebitCredit } from 'app/shared/model/enumerations/debit-credit.model';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';

export interface ITransactions {
  id?: number;
  transactionID?: number;
  debitCredit?: DebitCredit;
  transactionAmount?: number;
  transactionType?: TransactionType;
  valueDate?: string;
  remarks?: string;
  accountNumber?: ICustomerAccount;
}

export const defaultValue: Readonly<ITransactions> = {};
