import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Comment, Form, Header, Icon } from 'semantic-ui-react';
import { addPost, getComments, getPost } from '../actions';


class PostView extends Component {

  componentDidMount() {
    // Read the id of the post to load from the URL
    const { postID } = this.props.match.params;

    if (postID) {
      // Load the post from back end
      this.props.getPost(postID);
      this.props.getComments(postID);
    }
  }

  render() {
    const { comments } = this.props;

    return (
      <Form onSubmit={() => { return console.log('onSubmit'); }}>
        <Form.Field>
          <label>Title</label>
          <div>
            <Field
              name="title"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <div>
            <Field name="body" component="textarea" />
          </div>
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <div>
            <Field
              name="author"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </Form.Field>
        <Form.Field disabled>
          <label>Timestamp</label>
          <div>
            <Field
              name="timestamp"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </Form.Field>
        <Form.Field>
          <label>Score</label>
          <div>
            <Field
              name="voteScore"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </Form.Field>
        <Form.Button primary>Save</Form.Button>
        <Comment.Group>
          <Header as="h3" dividing>Comments</Header>
          {comments && _.reverse(_.sortBy(comments, 'voteScore')).map((comment) => {
            return (
              <Comment key={comment.id}>
                <Comment.Content>
                  <Comment.Author as="a">{comment.author}</Comment.Author>
                  <Comment.Metadata>
                    <div>{comment.timestamp}</div>
                    Score: <div>{comment.voteScore}</div><Icon color="yellow" name="star" />
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })
          }
        </Comment.Group>
      </Form>

    );
  }
}

function validate(values) {
  const errors = {};

  // Validate that all fields are filled
  if (!values.title) {
    errors.title = 'Enter a post title';
  }
  if (!values.categories) {
    errors.body = 'Enter a body';
  }
  if (!values.content) {
    errors.author = 'Enter a author';
  }

  // Returning an empty errors objects means, that the validation was successful
  // If errors is not empty (has ANY properties) the form will not be submitted
  return errors;
}

function mapStateToProps(state) {
  return ({
    comments: state.post.comments,
    initialValues: state.post, // pull initial values from account reducer
  });
}

/**
 * Hook everything up. It is important to first call "connect" and only than "reduxForm". Otherwise
 * setting "initialValues" will not work!
 */
export default connect(mapStateToProps, { addPost, getComments, getPost })(reduxForm({
  validate,
  form: 'PostForm', // a unique identifier for this form
  enableReinitialize: true,
})(PostView));
