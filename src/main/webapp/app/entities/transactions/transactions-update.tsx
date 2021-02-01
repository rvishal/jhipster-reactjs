import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomerAccount } from 'app/shared/model/customer-account.model';
import { getEntities as getCustomerAccounts } from 'app/entities/customer-account/customer-account.reducer';
import { getEntity, updateEntity, createEntity, reset } from './transactions.reducer';
import { ITransactions } from 'app/shared/model/transactions.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransactionsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionsUpdate = (props: ITransactionsUpdateProps) => {
  const [accountNumberId, setAccountNumberId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transactionsEntity, customerAccounts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transactions' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomerAccounts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...transactionsEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ncsInterviewApp.transactions.home.createOrEditLabel">
            <Translate contentKey="ncsInterviewApp.transactions.home.createOrEditLabel">Create or edit a Transactions</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transactionsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transactions-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="transactions-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="transactionIDLabel" for="transactions-transactionID">
                  <Translate contentKey="ncsInterviewApp.transactions.transactionID">Transaction ID</Translate>
                </Label>
                <AvField id="transactions-transactionID" type="string" className="form-control" name="transactionID" />
              </AvGroup>
              <AvGroup>
                <Label id="debitCreditLabel" for="transactions-debitCredit">
                  <Translate contentKey="ncsInterviewApp.transactions.debitCredit">Debit Credit</Translate>
                </Label>
                <AvInput
                  id="transactions-debitCredit"
                  type="select"
                  className="form-control"
                  name="debitCredit"
                  value={(!isNew && transactionsEntity.debitCredit) || 'DEBIT'}
                >
                  <option value="DEBIT">{translate('ncsInterviewApp.DebitCredit.DEBIT')}</option>
                  <option value="CREDIT">{translate('ncsInterviewApp.DebitCredit.CREDIT')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="transactionAmountLabel" for="transactions-transactionAmount">
                  <Translate contentKey="ncsInterviewApp.transactions.transactionAmount">Transaction Amount</Translate>
                </Label>
                <AvField id="transactions-transactionAmount" type="string" className="form-control" name="transactionAmount" />
              </AvGroup>
              <AvGroup>
                <Label id="transactionTypeLabel" for="transactions-transactionType">
                  <Translate contentKey="ncsInterviewApp.transactions.transactionType">Transaction Type</Translate>
                </Label>
                <AvInput
                  id="transactions-transactionType"
                  type="select"
                  className="form-control"
                  name="transactionType"
                  value={(!isNew && transactionsEntity.transactionType) || 'FAST_TRANSFER'}
                >
                  <option value="FAST_TRANSFER">{translate('ncsInterviewApp.TransactionType.FAST_TRANSFER')}</option>
                  <option value="INTERNAL">{translate('ncsInterviewApp.TransactionType.INTERNAL')}</option>
                  <option value="INTREST">{translate('ncsInterviewApp.TransactionType.INTREST')}</option>
                  <option value="SPEND">{translate('ncsInterviewApp.TransactionType.SPEND')}</option>
                  <option value="CHECK">{translate('ncsInterviewApp.TransactionType.CHECK')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="valueDateLabel" for="transactions-valueDate">
                  <Translate contentKey="ncsInterviewApp.transactions.valueDate">Value Date</Translate>
                </Label>
                <AvField id="transactions-valueDate" type="date" className="form-control" name="valueDate" />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="transactions-remarks">
                  <Translate contentKey="ncsInterviewApp.transactions.remarks">Remarks</Translate>
                </Label>
                <AvField id="transactions-remarks" type="text" name="remarks" />
              </AvGroup>
              <AvGroup>
                <Label for="transactions-accountNumber">
                  <Translate contentKey="ncsInterviewApp.transactions.accountNumber">Account Number</Translate>
                </Label>
                <AvInput id="transactions-accountNumber" type="select" className="form-control" name="accountNumber.id">
                  <option value="" key="0" />
                  {customerAccounts
                    ? customerAccounts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/transactions" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  customerAccounts: storeState.customerAccount.entities,
  transactionsEntity: storeState.transactions.entity,
  loading: storeState.transactions.loading,
  updating: storeState.transactions.updating,
  updateSuccess: storeState.transactions.updateSuccess,
});

const mapDispatchToProps = {
  getCustomerAccounts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsUpdate);
