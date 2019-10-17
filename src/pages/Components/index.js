import React from 'react';
import { Route } from 'react-router-dom';
import Buttons from './Buttons';
import Grid from './Grid';

const Components = ({match}) => (
  <div className="content">
    <Route path={`${match.url}/buttons`} component={Buttons} />
    <Route path={`${match.url}/grid`} component={Grid} />
  </div>
);

export default Components;