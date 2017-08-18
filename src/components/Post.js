import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Icon, Item, Label } from 'semantic-ui-react';
import { getComments, getPost } from '../actions'


class Post extends Component {

  componentDidMount() {
    const { postID } = this.props;
    this.props.getComments(postID);
  }

  render() {
    const index = _.findIndex(this.props.posts, { 'id': this.props.postID })
    const post = this.props.posts[index];
    const { comments } = post;

    let numberOfComments = 0;
    if (comments && comments.length > 0) {
      numberOfComments = comments.length;
    }

    return (
      <Item>
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
            <Icon
              name="like outline"
              color="green"
              style={{ cursor: 'pointer' }}
              onClick={() => { this.props.voteOnPost('upVote', post.id) }}
            />
            <Icon
              name="dislike outline"
              color="red"
              style={{ cursor: 'pointer' }}
              onClick={() => { this.props.voteOnPost('downVote', post.id) }}
            />
            {numberOfComments} Comments
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

/**
 * Function necessary for react-redux to have the props from the state available in the component.
 * @param {*} state
 */
function mapStateToProps(state, props) {
  return {
    posts: state.posts,
    categories: state.categories,
    viewState: state.viewState,
  };
}

export default connect(mapStateToProps, { getComments, getPost })(Post);