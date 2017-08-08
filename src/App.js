import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PostsOverview from './components/PostsOverview';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route path="/" component={PostsOverview} />
      </Switch>
    );
  }
}

export default App;
