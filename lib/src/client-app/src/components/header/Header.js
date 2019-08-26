import React from 'react';
import Logo from '../helpers/logo/Logo';
import { NavLink } from 'react-router-dom';
import authContext from '@/context/authContext';

import classes from './Header.css';

class Header extends React.Component {

  static contextType = authContext;

  render () {
    const authenticated = this.context.token;
    return (
      <nav className={[ 'pt-1 pb-1 bg-grey-light border-bottom border-grey', classes.navigation ].join(' ')}>
        <div className="container flex items-center">
          <div className="mr-2">
            <Logo />
          </div>
          <ul className={[ classes.linksList, 'flex', 'm-0', 'pl-0', 'flex-1' ].join(' ')}>
            <li className="mr-2">
              <NavLink exact to="/" activeClassName="blue" className="no-decoration">Home</NavLink>
            </li>
            {authenticated && (
              <li>
                <NavLink to="/my-posts" activeClassName="blue" className="no-decoration">My Posts</NavLink>
              </li>
            )}
          </ul>
          {!authenticated ? (
            <div>
              <button
                className="mr-1 white cursor-pointer border-none bg-blue-dark"
                onClick={this.props.onRegisterAttempt}>
                Join Us
              </button>
              <span className="mr-1">or</span>
              <button
                className="pl-0 cursor-pointer underline border-none bg-transparent"
                onClick={this.props.onLoginAttempt}>
                Login
              </button>
            </div>
          ) : (
            <button
              className="pl-0 pr-0 cursor-pointer border-red-dark red-dark p-1 bg-transparent"
              onClick={this.props.onLogout}>
              Logout &rarr;
            </button>
          )}
        </div>
      </nav>
    );
  }
}

export default Header;