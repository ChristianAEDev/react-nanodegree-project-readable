import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { Button, Dropdown, Grid, Header, Icon, Item, List, Menu } from 'semantic-ui-react';
import Post from './Post';
import { getCategories, getComments, getPosts, voteOnPost } from '../actions';
import { sortPostsBy } from '../actions/ViewStateActions';

class PostsOverview extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  render() {
    const { sortPostsBy } = this.props.viewState;
    const { posts } = this.props;

    // Check if the URL contains a param for the categoryName. If so, we'll use it to filter the
    // list of posts displayed in this component. (The params are provided by react-router.)
    const { categoryName } = this.props.match.params;

    // This variable holds the list of posts to filter. Depending on if we only want to show posts
    // in a certain category, it will be filtered.
    const postsToDisplay = posts.filter((post) => {
      if (post.deleted === true) {
        return null;
      }

      if (!categoryName) {
        return post;
      }
      if (post.category === categoryName) {
        return post;
      }
      return null;
    });

    return (
      // Categories
      <Grid>
        <Grid.Column width={4}>
          <Header as="h5">
            <Icon name="bookmark" />
            <Header.Content>Categories
              <Header.Subheader>
                Choose a category
              </Header.Subheader>
            </Header.Content>
          </Header>
          <List>
            <List.Item>
              <Link to="/" >
              <b>All</b>
              </Link>
            </List.Item>
            {this.props.categories.map((category) => {
              return (
                <List.Item key={shortid.generate()} >
                  <Link to={`/category/${category.name}`} >
                    {category.name}
                  </Link>
                </List.Item>
              );
            })}
          </List>
        </Grid.Column>
        {/* Posts  */}
        <Grid.Column width={10}>
          <Menu secondary>
            <Menu.Item >
              <Link to="/post">
                <Button icon="add" primary content="New Post" />
              </Link>
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item>
                <Dropdown text="Sort by" icon="sort" >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      value="voteScore"
                      text="Score"
                      active={sortPostsBy === 'voteScore'}
                      onClick={(event, data) => { this.props.sortPostsBy(data.value); }}
                    />
                    <Dropdown.Item
                      value="timestamp"
                      text="Date"
                      active={sortPostsBy === 'timestamp'}
                      onClick={(event, data) => { this.props.sortPostsBy(data.value); }}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Item.Group divided>
            {
              _.reverse(_.sortBy(postsToDisplay, [sortPostsBy])).map((post) => {
                return (
                  <Post postID={post.id} key={post.id} />
                );
              })
            }
          </Item.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

/**
 * Function necessary for react-redux to have the props from the state available in the component.
 * @param {*} state
 */
function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories,
    viewState: state.viewState,
  };
}

export default connect(mapStateToProps, {
  getCategories,
  getComments,
  getPosts,
  sortPostsBy,
  voteOnPost
})(PostsOverview);
