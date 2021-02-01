import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getUsersByYears } from './customer.reducer';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerShowUserByYearsProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const CustomerShowUserByYears = (props: ICustomerShowUserByYearsProps) => {
    useEffect(() => {
        
      }, []);


      const { customerEntity } = props;
      return (<div>THis is a test page</div>); 

};

const mapStateToProps = ({ customer }: IRootState) => ({
    customerEntity: customer.entity,
  });
const mapDispatchToProps = { getUsersByYears };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShowUserByYears);

