import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { Container, Image, Menu } from 'semantic-ui-react';

import PostView from './components/PostView';
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
            <Link to="/">
              <Menu.Item header>
                <Image
                  size="mini"
                  src="/logo.svg"
                  style={{ marginRight: '1.5em' }}
                />
                Readable
            </Menu.Item>
            </Link>
          </Container>
        </Menu>
        <Container text style={{ marginTop: '7em' }}>
          <Switch>
            <Route path="/category/:categoryName" component={PostsView} />
            <Route path="/post/:postID" component={PostView} />
            <Route path="/post" component={PostView} />
            <Route path="/" component={PostsView} />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
