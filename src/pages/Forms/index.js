import React from 'react';
import { Route } from 'react-router-dom';
import RegularForms from './RegularForms';
// import ExtendedForms from './ExtendedForms';
import IncidentForm from './IncidentForm';

const Forms = ({match}) => (
  <div className="content">
    <div className="container-fluid">
      <Route path={`${match.url}/regular-forms`} component={RegularForms} />
      <Route path={`${match.url}/incident-form`} render={props => {
        return <IncidentForm {...props} onSubmit={values => alert(JSON.stringify(values, null, 2))}/>
      }} />
    </div>
  </div>
);

export default Forms;