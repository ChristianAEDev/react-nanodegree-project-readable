import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import shortid from 'shortid';
import { Button, Comment, Dropdown, Form, Header, Icon, Menu } from 'semantic-ui-react';
import { addComment, deleteComment, getComments, updateComment } from '../actions';
import { setCommentButtonMode, sortPostsBy } from '../actions/ViewStateActions';


class Comments extends Component {


  componentDidMount() {
    const { postID } = this.props;
    this.props.getComments(postID);
  }

  onSubmit(values) {
    const { postID } = this.props;
    // If we have an ID it is an existing comment that needs to be updated
    if (values.id) {
      this.props.updateComment(values);
    } else {
      // Assign an ID to the new comment
      values.id = shortid.generate();
      // Set the parentID. It is the id of the post it belongs to
      values.parentId = postID;
      // Otherwise it is a new comment to save
      this.props.addComment(values);
    }
  }

  onEdit(comment) {
    // This will not be displayed but we need it later to know which comment to update
    this.props.change('id', comment.id);
    this.props.change('body', comment.body);

    this.props.setCommentButtonMode('edit');
  }

  render() {
    // "handleSubmit" comes from redux-form
    const { handleSubmit } = this.props;
    const { comments } = this.props.post;
    const { sortPostsBy, commentsButtonMode } = this.props.viewState;

    return (
      <Comment.Group>
        <Header dividing>
          <Header.Content as="h3">
            Comments
            </Header.Content>
          <Menu.Menu position="right">
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
          </Menu.Menu>
        </Header>
        {comments && _.reverse(_.sortBy(comments, [sortPostsBy])).map((comment) => {
          return (
            <Comment key={shortid.generate()}>
              <Comment.Content>
                <Comment.Author as="a">{comment.author}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment(comment.timestamp).format('MMMM Do YYYY, hh:mm:ss')}</div>
                  Score: <div>{comment.voteScore}</div><Icon color="yellow" name="star" />
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
              </Comment.Content>
              <Comment.Actions>
                <Comment.Action onClick={() => { this.onEdit(comment); }} >
                  Edit
                </Comment.Action>
                <Comment.Action onClick={() => { this.props.deleteComment(comment.id); }} >
                  Delete
                </Comment.Action>
              </Comment.Actions>
            </Comment>
          );
        })
        }
        {/* redux-form just handles state and validation. It is not responsible for the actually
            submit(saving the data(POST))"handleSubmit" is the function in redux-form that calls
            our function "this.onSubmit" when the validation is positive and the data from the form
            can be saved/submitted. (".bind(this)" ensures that we have the correct context (this
            component) inside of "onSubmit" available.) */}
        <Form reply onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Form.Field >
            <Field
              name="body"
              component="input"
              type="text"
              placeholder="Comment"
            />
          </Form.Field>
          {commentsButtonMode === 'add' &&
            <Button
              content="Add"
              labelPosition="left"
              icon="add"
              color="green"
            />}
          {commentsButtonMode === 'edit' &&
            <Button
              content="Save"
              labelPosition="left"
              icon="edit"
              color="yellow"
            />}
        </Form>
      </Comment.Group>
    );
  }
}

function validate(values) {
  const errors = {};

  // Returning an empty errors objects means, that the validation was successful
  // If errors is not empty (has ANY properties) the form will not be submitted
  return errors;
}

function mapStateToProps(state) {
  return ({
    post: state.post,
    viewState: state.viewState,
  });
}


export default connect(mapStateToProps,
  {
    addComment,
    deleteComment,
    getComments,
    setCommentButtonMode,
    sortPostsBy,
    updateComment,
  },
)(reduxForm({
  validate,
  form: 'CommentForm', // a unique identifier for this form
})(Comments));
