/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NavigationBar from 'components/NavigationBar';
import PostDetailPage from 'containers/PostDetailPage/Loadable';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div``;

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/post-detail/:id',
    component: PostDetailPage,
  },
  {
    path: '',
    component: NotFoundPage,
  },
];

export default function App() {
  return (
    <AppWrapper>
      <NavigationBar />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
