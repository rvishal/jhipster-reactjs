import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Transactions from './transactions';
import TransactionsDetail from './transactions-detail';
import TransactionsUpdate from './transactions-update';
import TransactionsDeleteDialog from './transactions-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransactionsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransactionsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransactionsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Transactions} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TransactionsDeleteDialog} />
  </>
);

export default Routes;
