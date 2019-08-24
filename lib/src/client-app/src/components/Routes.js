import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home/Home';
import Sections from './sections/Sections';

export default () => (
  <Switch>
    <Route exact path="/sections/:id?" component={Sections} />
    <Route exact path="/:id?" component={Home} />
    <Route path="*" render={() => <Redirect to="/" />} />
  </Switch>
)