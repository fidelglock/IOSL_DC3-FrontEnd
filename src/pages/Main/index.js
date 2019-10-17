import React from "react";
import { Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import cx from "classnames";
import { setMobileNavVisibility } from "../../reducers/Layout";
import { withRouter } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import SideBar from "../../components/SideBar";
import ThemeOptions from "../../components/ThemeOptions";
import registerPackage from "../../components/userSpace/Register";
import Active from "../../components/userSpace/Active";
import UserSpace from "../../components/userSpace/UserSpace";
import Detailed from "../../components/userSpace/Detailed";
import History from "../../components/History";
import UpgradeUser from "../Forms/RegularForms/UpgradeUser";
import viewIncident from "../Incidents/index";
import HandoverForm from "../Components/Buttons/HandoverForm";
/**
 * Pages
 */
import Dashboard from "../Dashboard";
import Components from "../Components";
import Forms from "../Forms";
import Tables from "../Tables";
import companyindex from "../Dashboard/companyindex";
import postmanindex from "../Dashboard/postmanIndex";
import RegisterUser from "../RegisterUser";

import Assign from "../Forms/RegularForms/Assign";
import PostmanHandoverTable from "../Tables/ExtendedTables/PostmanHandoverTable";
import HandoverFormFull from "../Components/Buttons/HandoverFormFull";
import DeliveryPage from "../Components/Buttons/DeliveryPage";
const Main = ({ mobileNavVisibility, hideMobileMenu, history }) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });

  // it is dose not matter company/postman/user
  // main landing page is always the history of the login user
  var userHome = History;
  const userObj = JSON.parse(sessionStorage.getItem("userAuth"));
  console.log("Main.js started  with the user:");
  console.log(userObj);
  if (userObj) {
    if (userObj.PersonType == 3) {
      userHome = History;
    } else if (userObj.PersonType == 2) {
      userHome = History;
    }
  }
  

  return (
    <div
      className={cx({
        "nav-open": mobileNavVisibility === true
      })}
    >
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu} />
        <SideBar />

        <div className="main-panel">
          <Header />
          <Route exact path="/packages" component={UserSpace} />
          <Route exact path="/" component={userHome} />
          <Route exact path="/package/:OrderID" component={Detailed} />
          <Route exact path="/packages/active" component={Active} />
          <Route path="/packages/registerPackage" component={UserSpace} />
          <Route exact path="/company" component={companyindex} />
          <Route exact path="/postman" component={postmanindex} />
          <Route path="/postman/handover/:orderid" component={HandoverForm} />
          <Route path="/postman/handoverdetails" component={HandoverFormFull} />
          <Route path="/postman/delivery/:dropaddressid" component={DeliveryPage} />
          <Route path="/forms" component={Forms} />
          <Route path="/tables" component={Tables} />
          <Route path="/registerPackage" component={registerPackage} />
          <Route path="/UpgradeUser" component={UpgradeUser} />
          <Route path="/viewIncident" component={viewIncident} />
          <Route path="/RegisterUser" component={RegisterUser} />
          <Route path="/Assign/:orderid" component={Assign} />
          <Route
            path="/PostmanHandoverTable"
            component={PostmanHandoverTable}
          />
          <Footer />
        </div>
      </div>
      }
    </div>
  );
};

 const mapStateToProp = state => ({
   mobileNavVisibility: state.Layout.mobileNavVisibility
 });

 const mapDispatchToProps = (dispatch, ownProps) => ({
   hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
 });

export default withRouter(
  connect(
    mapStateToProp,
    mapDispatchToProps
  )(Main)
);
