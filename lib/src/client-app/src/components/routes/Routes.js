import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../home/Home';
import MyPosts from '../my-posts/MyPosts';

import authContext from '@/context/authContext';

class Routes extends React.PureComponent {

  static contextType = authContext;
  
  render () {
    return (
      <Switch>
        <Route
          exact
          path="/my-posts"
          render={
            props => {
              return this.context.token ? <MyPosts {...props} /> : <Redirect to="/" />;
            }
          }
        />
        <Route exact path="/:id?" component={Home} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Switch>
    );
  }
}

export default Routes;