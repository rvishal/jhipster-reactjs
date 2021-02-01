import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomerAccount from './customer-account';
import CustomerAccountDetail from './customer-account-detail';
import CustomerAccountUpdate from './customer-account-update';
import CustomerAccountDeleteDialog from './customer-account-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomerAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomerAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomerAccountDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomerAccount} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CustomerAccountDeleteDialog} />
  </>
);

export default Routes;
