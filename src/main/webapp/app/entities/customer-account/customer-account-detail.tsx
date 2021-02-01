import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer-account.reducer';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerAccountDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerAccountDetail = (props: ICustomerAccountDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerAccountEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ncsInterviewApp.customerAccount.detail.title">CustomerAccount</Translate> [
          <b>{customerAccountEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="accountNumber">
              <Translate contentKey="ncsInterviewApp.customerAccount.accountNumber">Account Number</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.accountNumber}</dd>
          <dt>
            <span id="accountType">
              <Translate contentKey="ncsInterviewApp.customerAccount.accountType">Account Type</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.accountType}</dd>
          <dt>
            <span id="fullDayBalance">
              <Translate contentKey="ncsInterviewApp.customerAccount.fullDayBalance">Full Day Balance</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.fullDayBalance}</dd>
          <dt>
            <span id="halfDayBalance">
              <Translate contentKey="ncsInterviewApp.customerAccount.halfDayBalance">Half Day Balance</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.halfDayBalance}</dd>
          <dt>
            <span id="finalBalance">
              <Translate contentKey="ncsInterviewApp.customerAccount.finalBalance">Final Balance</Translate>
            </span>
          </dt>
          <dd>{customerAccountEntity.finalBalance}</dd>
          <dt>
            <Translate contentKey="ncsInterviewApp.customerAccount.customerID">Customer ID</Translate>
          </dt>
          <dd>{customerAccountEntity.customerID ? customerAccountEntity.customerID.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer-account" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer-account/${customerAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customerAccount }: IRootState) => ({
  customerAccountEntity: customerAccount.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccountDetail);
