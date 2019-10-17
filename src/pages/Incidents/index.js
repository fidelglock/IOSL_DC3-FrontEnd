import React from "react";
import IncidentTableWithLinks from "../Tables/ExtendedTables/IncidentTableWithLinks";


class IncidentDashboard extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
  
    render() {
      return (
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <IncidentTableWithLinks />
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default IncidentDashboard;