import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transactions.reducer';
import { ITransactions } from 'app/shared/model/transactions.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionsDetail = (props: ITransactionsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transactionsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ncsInterviewApp.transactions.detail.title">Transactions</Translate> [<b>{transactionsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="transactionID">
              <Translate contentKey="ncsInterviewApp.transactions.transactionID">Transaction ID</Translate>
            </span>
          </dt>
          <dd>{transactionsEntity.transactionID}</dd>
          <dt>
            <span id="debitCredit">
              <Translate contentKey="ncsInterviewApp.transactions.debitCredit">Debit Credit</Translate>
            </span>
          </dt>
          <dd>{transactionsEntity.debitCredit}</dd>
          <dt>
            <span id="transactionAmount">
              <Translate contentKey="ncsInterviewApp.transactions.transactionAmount">Transaction Amount</Translate>
            </span>
          </dt>
          <dd>{transactionsEntity.transactionAmount}</dd>
          <dt>
            <span id="transactionType">
              <Translate contentKey="ncsInterviewApp.transactions.transactionType">Transaction Type</Translate>
            </span>
          </dt>
          <dd>{transactionsEntity.transactionType}</dd>
          <dt>
            <span id="valueDate">
              <Translate contentKey="ncsInterviewApp.transactions.valueDate">Value Date</Translate>
            </span>
          </dt>
          <dd>
            {transactionsEntity.valueDate ? (
              <TextFormat value={transactionsEntity.valueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="ncsInterviewApp.transactions.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{transactionsEntity.remarks}</dd>
          <dt>
            <Translate contentKey="ncsInterviewApp.transactions.accountNumber">Account Number</Translate>
          </dt>
          <dd>{transactionsEntity.accountNumber ? transactionsEntity.accountNumber.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/transactions" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transactions/${transactionsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transactions }: IRootState) => ({
  transactionsEntity: transactions.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsDetail);
