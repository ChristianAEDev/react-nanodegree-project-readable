import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import shortid from 'shortid';
import { Button, Dropdown, Grid, Header, Icon, Item, Label, List, Menu } from 'semantic-ui-react';
import { getCategories, getPosts } from '../actions';
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
                    {/* TODO: Add an icon to indicate what sort is used and how its currently
                sorted  */}
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
              // TODO: Check if there is a better way to sort the array by their voteScore.
              // Ideally without the need of a third party library.
              _.reverse(_.sortBy(postsToDisplay, [sortPostsBy])).map((post) => {
                return (
                  <Item key={post.id}>
                    <Item.Content>
                      <Link to={`/post/${post.id}`}>
                        <Item.Header as="h3" >{post.title}</Item.Header>
                      </Link>
                      <Item.Meta>
                        <span className="cinema">{moment(post.timestamp).format('MMMM Do YYYY, hh:mm:ss')} by {post.author}</span>
                      </Item.Meta>
                      <Item.Description>{post.body}</Item.Description>
                      <Item.Extra>
                        <Label>{post.category}</Label>
                        {post.voteScore}<Icon color="yellow" name="star" />
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                );
              })
            }
          </Item.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

// TODO: eslint rules disabled
PostsOverview.propTypes = {
  categories: PropTypes.array.isRequired,  // eslint-disable-line react/forbid-prop-types
  categoryName: PropTypes.string,
  posts: PropTypes.array.isRequired,  // eslint-disable-line react/forbid-prop-types
  getCategories: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  sortPostsBy: PropTypes.func.isRequired,
  viewState: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

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

export default connect(mapStateToProps, { getCategories, getPosts, sortPostsBy })(PostsOverview);
