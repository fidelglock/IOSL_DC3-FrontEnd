import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';
import LandingPage from './../../pages/Login'

class UserInfo extends Component {

  state = {
    isShowingUserMenu: false
  };

  render() {
    let { user } = this.props;
    let UserType = null;
    let { isShowingUserMenu } = this.state;
    var userObj = JSON.parse(sessionStorage.getItem('userAuth'));
    var googleAuthObj = JSON.parse(sessionStorage.getItem('googleAuth'));
    user.image = googleAuthObj.profileObj.imageUrl;
    
    if (userObj.PersonType == 2) 
    {
      UserType = "Company User"
    }
    else if (userObj.PersonType == 3)
    {
      UserType = "Postman"
    }
    else 
    {
      UserType = "Customer"
    }
    return (
      <div className="user-wrapper">
        <div className="user">
          <img src={user.image} alt={user.name} className="photo" />
          <div className="userinfo">
            <div className="username">
              {userObj.FullName}
            </div>
                <div className="title">{UserType}</div>
          </div>
        </div>
    
      </div>
     );
  }
}
const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(mapStateToProps)(UserInfo);
