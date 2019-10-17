//Postman dashboard file

import React from "react";
import PostmanTableWithLinks from "../Tables/ExtendedTables/PostmanTableWithLinks";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <PostmanTableWithLinks />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
