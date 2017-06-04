import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app/app2';
import Dashboard from './containers/dashboard/dashboard';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
