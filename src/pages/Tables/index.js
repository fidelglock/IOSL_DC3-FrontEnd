import React from 'react';
import { Route } from 'react-router-dom';
import ExtendedTables from './ExtendedTables';


const Tables = ({match}) => (
  <div className="content">
    <Route path={`${match.url}/extended-tables`} component={ExtendedTables} />
  </div>
);

export default Tables;