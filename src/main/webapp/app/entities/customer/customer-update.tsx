import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import Logger from 'console-log-level';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerEntity,
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
          <h2 id="ncsInterviewApp.customer.home.createOrEditLabel">
            <Translate contentKey="ncsInterviewApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="customerIdLabel" for="customer-customerId">
                  <Translate contentKey="ncsInterviewApp.customer.customerId">Customer Id</Translate>
                </Label>
                <AvField id="customer-customerId" type="string" className="form-control" name="customerId" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="customer-firstName">
                  <Translate contentKey="ncsInterviewApp.customer.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="customer-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: { value: '^[A-Za-z]+$', errorMessage: translate('entity.validation.pattern', { pattern: '^[A-Za-z]+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="customer-middleName">
                  <Translate contentKey="ncsInterviewApp.customer.middleName">Middle Name</Translate>
                </Label>
                <AvField
                  id="customer-middleName"
                  type="text"
                  name="middleName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: { value: '^[A-Za-z]+$', errorMessage: translate('entity.validation.pattern', { pattern: '^[A-Za-z]+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="customer-lastName">
                  <Translate contentKey="ncsInterviewApp.customer.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="customer-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: { value: '^^[A-Za-z]+$', errorMessage: translate('entity.validation.pattern', { pattern: '^^[A-Za-z]+$' }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="customer-dateOfBirth">
                  <Translate contentKey="ncsInterviewApp.customer.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvField id="customer-dateOfBirth" type="date" className="form-control" name="dateOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="emailIdLabel" for="customer-emailId">
                  <Translate contentKey="ncsInterviewApp.customer.emailId">Email Id</Translate>
                </Label>
                <AvField
                  id="customer-emailId"
                  type="text"
                  name="emailId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: {
                      value: '^[^@\\s]+@[^@\\s\\.]+\\.[^@\\.\\s]+$',
                      errorMessage: translate('entity.validation.pattern', { pattern: '^[^@\\s]+@[^@\\s\\.]+\\.[^@\\.\\s]+$' }),
                    },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="customer-phoneNumber">
                  <Translate contentKey="ncsInterviewApp.customer.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField
                  id="customer-phoneNumber"
                  type="text"
                  name="phoneNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    pattern: {
                      value: '^(\\+\\d{1,3}[- ]?)?\\d{8,10}$',
                      errorMessage: translate('entity.validation.pattern', { pattern: '^(\\+\\d{1,3}[- ]?)?\\d{8,10}$' }),
                    },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
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
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
