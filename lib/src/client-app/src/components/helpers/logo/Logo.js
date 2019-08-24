import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.css';

class Logo extends React.PureComponent {
  render () {
    return (
      <Link to="/">
        <div className={[ classes.appLogo, 'bg-black', 'pt-1', 'pb-1', 'pl-1', 'pr-1', 'text-center', 'inline-block' ].join(' ')}>
          <div className={[ classes.logoFirstLine, 'text-lg', 'blue-dark' ].join(' ')}>Ing</div>
          <div className={[ classes.logoSecondLine, 'white', 'text-bold' ].join(' ')}>solution</div>
        </div>
      </Link>
    );
  }
}

export default Logo;