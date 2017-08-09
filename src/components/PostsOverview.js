import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Header, Icon, Item, Label, List } from 'semantic-ui-react';
import { getCategories, getPosts } from '../actions';

class PostsOverview extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  render() {
    console.log(this.props.categories);
    return (
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
              return (
                <List.Item>
                  {category.name}
                </List.Item>
              );
            })}
          </List>
        </Grid.Column>
        <Grid.Column width={10}>
          <Item.Group divided>
            {
              // TODO: Check if there is a better way to sort the array by their voteScore.
              // Ideally without the need of a third party library.
              _.reverse(_.sortBy(this.props.posts, ['voteScore'])).map((post) => {
                return (
                  <Item key={post.id}>
                    <Item.Content>
                      <Item.Header as="a">{post.title}</Item.Header>
                      <Item.Meta>
                        <span className="cinema">{post.author}</span>
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
};

/**
 * Function necessary for react-redux to have the props from the state available in the component.
 * @param {*} state
 */
function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories,
  };
}

export default connect(mapStateToProps, { getCategories, getPosts })(PostsOverview);
