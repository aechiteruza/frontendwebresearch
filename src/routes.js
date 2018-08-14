import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Loginpage = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading: Loading,
});

const Registerpage = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading: Loading,
});

const NodeRED = Loadable({
  loader: () => import('./views/Pages/NodeRED'),
  loading: Loading,
});

const Docker = Loadable({
  loader: () => import('./views/Pages/Docker'),
  loading: Loading,
});

const Main = Loadable({
  loader: () => import('./views/Pages/Main'),
  loading: Loading,
});


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/pages/login', exact: true,  name: 'Login', component: Loginpage },
  { path: '/pages/register', exact: true,  name: 'Register', component: Registerpage },
  { path: '/pages/NodeRED',  name: 'NodeRED', component: NodeRED },
  { path: '/pages/Docker', name: 'Docker', component: Docker },
  { path: '/pages/Main', name: 'Main', component: Main },
];

export default routes;
