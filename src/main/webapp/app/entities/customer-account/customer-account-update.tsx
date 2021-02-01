import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './customer-account.reducer';
import { ICustomerAccount } from 'app/shared/model/customer-account.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerAccountUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerAccountUpdate = (props: ICustomerAccountUpdateProps) => {
  const [customerIDId, setCustomerIdId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerAccountEntity, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer-account');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerAccountEntity,
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
          <h2 id="ncsInterviewApp.customerAccount.home.createOrEditLabel">
            <Translate contentKey="ncsInterviewApp.customerAccount.home.createOrEditLabel">Create or edit a CustomerAccount</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerAccountEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-account-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-account-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountNumberLabel" for="customer-account-accountNumber">
                  <Translate contentKey="ncsInterviewApp.customerAccount.accountNumber">Account Number</Translate>
                </Label>
                <AvField id="customer-account-accountNumber" type="string" className="form-control" name="accountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="accountTypeLabel" for="customer-account-accountType">
                  <Translate contentKey="ncsInterviewApp.customerAccount.accountType">Account Type</Translate>
                </Label>
                <AvInput
                  id="customer-account-accountType"
                  type="select"
                  className="form-control"
                  name="accountType"
                  value={(!isNew && customerAccountEntity.accountType) || 'SAVING'}
                >
                  <option value="SAVING">{translate('ncsInterviewApp.AccountType.SAVING')}</option>
                  <option value="CURRENT">{translate('ncsInterviewApp.AccountType.CURRENT')}</option>
                  <option value="CHECKING">{translate('ncsInterviewApp.AccountType.CHECKING')}</option>
                  <option value="CREDITCARD">{translate('ncsInterviewApp.AccountType.CREDITCARD')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="fullDayBalanceLabel" for="customer-account-fullDayBalance">
                  <Translate contentKey="ncsInterviewApp.customerAccount.fullDayBalance">Full Day Balance</Translate>
                </Label>
                <AvField id="customer-account-fullDayBalance" type="string" className="form-control" name="fullDayBalance" />
              </AvGroup>
              <AvGroup>
                <Label id="halfDayBalanceLabel" for="customer-account-halfDayBalance">
                  <Translate contentKey="ncsInterviewApp.customerAccount.halfDayBalance">Half Day Balance</Translate>
                </Label>
                <AvField id="customer-account-halfDayBalance" type="string" className="form-control" name="halfDayBalance" />
              </AvGroup>
              <AvGroup>
                <Label id="finalBalanceLabel" for="customer-account-finalBalance">
                  <Translate contentKey="ncsInterviewApp.customerAccount.finalBalance">Final Balance</Translate>
                </Label>
                <AvField id="customer-account-finalBalance" type="string" className="form-control" name="finalBalance" />
              </AvGroup>
              <AvGroup>
                <Label for="customer-account-customerID">
                  <Translate contentKey="ncsInterviewApp.customerAccount.customerID">Customer ID</Translate>
                </Label>
                <AvInput id="customer-account-customerID" type="select" className="form-control" name="customerID.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer-account" replace color="info">
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
  customers: storeState.customer.entities,
  customerAccountEntity: storeState.customerAccount.entity,
  loading: storeState.customerAccount.loading,
  updating: storeState.customerAccount.updating,
  updateSuccess: storeState.customerAccount.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccountUpdate);
