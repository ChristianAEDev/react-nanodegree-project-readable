import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Item, Label } from 'semantic-ui-react';
import { getPosts } from '../actions';

class PostsOverview extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <Item.Group divided>
        {
          this.props.posts.map((post) => {
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
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })
        }
      </Item.Group>
    );
  }
}

// TODO: eslint rules disabled
PostsOverview.propTypes = {
  posts: PropTypes.array.isRequired,  // eslint-disable-line react/forbid-prop-types
  getPosts: PropTypes.func.isRequired,
};

/**
 * Function necessary for react-redux to have the props from the state available in the component.
 * @param {*} state
 */
function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps, { getPosts })(PostsOverview);
