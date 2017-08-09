import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Dropdown, Grid, Header, Icon, Item, Label, List } from 'semantic-ui-react';
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
    
    return (
      // Categories
      <Grid>
        <Grid.Column width={4}>
          <Header as="h5">
            <Icon name="bookmark" />
            <Header.Content>Categories
              <Header.Subheader>
                Manage your categories
              </Header.Subheader>
            </Header.Content>
          </Header>
          <List>
            {this.props.categories.map((category) => {
              { /* TODO: Add better value for key  */ }
              return (
                <List.Item key={category.name} >
                  {category.name}
                </List.Item>
              );
            })}
          </List>
        </Grid.Column>
        {/* Posts  */}
        <Grid.Column width={10}>
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
          <Item.Group divided>
            {
              // TODO: Check if there is a better way to sort the array by their voteScore.
              // Ideally without the need of a third party library.
              _.reverse(_.sortBy(posts, [sortPostsBy])).map((post) => {
                return (
                  <Item key={post.id}>
                    <Item.Content>
                      <Item.Header as="a">{post.title}</Item.Header>
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
  posts: PropTypes.array.isRequired,  // eslint-disable-line react/forbid-prop-types
  getCategories: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  sortPostsBy: PropTypes.func.isRequired,
  viewState: PropTypes.object.isRequired,
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
