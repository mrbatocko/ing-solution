import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../header/Header';
import Routes from '../routes/Routes';
import Login from './Login';
import Register from './Register';
import AuthContext from '@/context/authContext';
import jwtDecode from 'jwt-decode';

import '@/styles';

class App extends React.Component {

  componentDidMount () {
    const token = localStorage['ing-solution-token'];
    if (token) {
      const user = jwtDecode(token);
      this.setState({ auth: { token, user }, ready: true });
    } else {
      this.setState({ ready: true });
    }
  }

  state = {
    ready: false,
    auth: {
      token: '',
      user: null
    },
    loginModal: false,
    registerModal: false,
  }

  authenticateFromLogin = token => {
    this.setState({ auth: { token, user: jwtDecode(token) }, loginModal: false }, () => {
      localStorage['ing-solution-token'] = token;
    });
  }

  logout = () => {
    this.setState({ auth: { token: '', user: null } }, () => {
      localStorage['ing-solution-token'] = '';
    });
  }

  toggleLoginModal = () => {
    this.setState({ loginModal: !this.state.loginModal });
  }

  toggleRegisterModal = () => {
    this.setState({ registerModal: !this.state.registerModal });
  }

  goToRegisterFromLogin = () => {
    this.setState({ loginModal: false, registerModal: true });
  }
  
  goToLoginFromRegister = () => {
    this.setState({ loginModal: true, registerModal: false });
  }

  render () {
    const { loginModal, registerModal, ready } = this.state;
    return (
      <div className="font-base">
        {ready && (
          <Router>
            <AuthContext.Provider value={this.state.auth}>
              <Header
                onLogout={this.logout}
                onLoginAttempt={this.toggleLoginModal}
                onRegisterAttempt={this.toggleRegisterModal}
              />
              <Routes />
              {loginModal && (
                <Login
                  authenticate={this.authenticateFromLogin}
                  onClose={this.toggleLoginModal}
                  goToRegisterFromLogin={this.goToRegisterFromLogin}
                />
              )}
              {registerModal && (
                <Register
                  onClose={this.toggleRegisterModal}
                  goToLoginFromRegister={this.goToLoginFromRegister}
                />
              )}
            </AuthContext.Provider>
          </Router>
        )}
      </div>
    );
  }
}

export default App;
