import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, Image, Menu } from 'semantic-ui-react';

import PostsCategoryView from './components/PostsCategoryView';
import PostsView from './components/PostsView';

/**
 * Class representing the entry point of the application. It is responsible to display elements
 * that are displayed on all pages (i.e. Menubar) and for routing to the correct page.
 */
class App extends Component {
  render() {
    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              <Image
                size="mini"
                src="/logo.svg"
                style={{ marginRight: '1.5em' }}
              />
              Readable
        </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>
          </Container>
        </Menu>
        <Container text style={{ marginTop: '7em' }}>
          <Switch>
            <Route path="/category/:categoryName" component={PostsView} />
            <Route path="/" component={PostsView} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
