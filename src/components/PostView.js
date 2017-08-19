import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import shortid from 'shortid';
import { Form, Icon } from 'semantic-ui-react';
import Comments from './Comments';
import { addPost, deletePost, getComments, getPost, resetState, updatePost, voteOnPost } from '../actions';
import { setPostEditMode } from '../actions/ViewStateActions';

class PostView extends Component {

  componentDidMount() {
    // Read the id of the post to load from the URL
    const { postID } = this.props.match.params;

    if (postID) {
      this.props.setPostEditMode('view')
      // Load the post from back end
      this.props.getPost(postID);
      this.props.getComments(postID);
    } else {
      // Ensure the state is clean to add a new post
      this.props.resetState();
      this.props.setPostEditMode('add')
    }
  }

  onSubmit(values) {
    // Check wether we want to update or delete a post
    if (values.isDelete) {
      deletePost(values.id);
      // Navigate to the main page after deleting the post
      this.props.history.push('/');
    } else if (this.props.viewState.commentsButtonMode === 'edit') {
      this.props.updatePost(values);
      this.props.setPostEditMode('view')
    } else {
      values.id = shortid.generate();
      this.props.addPost(values);
      this.props.setPostEditMode('view')
      this.props.history.push('/');
    }
  }

  renderTimestampField(field) {
    return (
      // "{...field.input} hooks up the element to react-redux "
      <Form.Field {...field.input}>
        <label>{field.label}</label>
        <label>{moment(field.value).format('MMMM Do YYYY, hh:mm:ss')}</label>
      </Form.Field>
    );
  }

  renderCategoryDropdown(field) {
    console.log('field', field.input.value)
    if (field.input.value.length < 1) {
      // this.props.change('category', 'redux');
    }

    return (
      <Form.Select {...field.input}
        name="category"
        label={field.label}
        value={field.input.value}
        options={[
          { key: 'react', text: 'react', value: 'react' },
          { key: 'redux', text: 'redux', value: 'redux' },
          { key: 'udacity', text: 'udacity', value: 'udacity' },
        ]}
        onChange={(event, data) => { this.props.change('category', data.value); }}
        placeholder='Category' />
    );
  }

  render() {
    // "handleSubmit" comes from redux-form
    const { handleSubmit } = this.props;
    const { postEditMode } = this.props.viewState;
    const postID = this.props.initialValues.id;
    const { post } = this.props;

    return (
      <div>
        <Form reply >
          <Form.Field disabled={!(postEditMode === 'add' || postEditMode === 'edit')} >
            <label>Title</label>
            <div>
              <Field
                name="title"
                component="input"
                type="text"
              />
            </div>
          </Form.Field>
          <Form.Field disabled={!(postEditMode === 'add' || postEditMode === 'edit')}>
            <label>Body</label>
            <div>
              <Field name="body" component="textarea" />
            </div>
          </Form.Field>
          <Form.Field disabled={!(postEditMode === 'add')}>
            <label>Author</label>
            <div>
              <Field
                name="author"
                component="input"
                type="text"
              />
            </div>
          </Form.Field>
          <Form.Field disabled>
            <label>Timestamp</label>
            <div>
              <Field
                name="timestamp"
                component={this.renderTimestampField}
              />
            </div>
          </Form.Field>
          <Form.Field disabled={!(postEditMode === 'add')}>
            <Field
              name="category"
              label="Category"
              component={this.renderCategoryDropdown.bind(this)}
            />
          </Form.Field>
          <Form.Field disabled>
            <label>Score</label>
            <div>
              {post.voteScore}<Icon color="yellow" name="star" />
            </div>
          </Form.Field>
          <Form.Group>
            {(postEditMode === 'edit' || postEditMode === 'add') &&
              <Form.Button
                primary
                icon="save"
                content="Save"
                onClick={handleSubmit((values) => {
                  return this.onSubmit({
                    ...values,
                    isDelete: false,
                  });
                })}
              />
            }
            {(postEditMode === 'view') &&
              <Form.Button
                color="green"
                icon="edit"
                content="Edit"
                onClick={() => this.props.setPostEditMode("edit")}
              />
            }
            {(postEditMode === 'edit' || postEditMode === 'view') &&
              <Form.Button
                color="red"
                icon="delete"
                content="Delete"
                onClick={handleSubmit((values) => {
                  return this.onSubmit({
                    ...values,
                    isDelete: true,
                  });
                })}
              />
            }
            {(postEditMode === 'edit' || postEditMode === 'view') &&
              <div>
                <Icon
                  name="like outline"
                  color="green"
                  size="big"
                  onClick={() => { this.props.voteOnPost('upVote', postID) }}
                />
                <Icon
                  name="dislike outline"
                  color="red"
                  size="big"
                  style={{ cursor: 'pointer' }}
                  onClick={() => { this.props.voteOnPost('downVote', postID) }}
                />
              </div>
            }
          </Form.Group>
        </Form>
        <Comments postID={postID} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ({
    post: state.post,
    initialValues: state.post, // Fill the initialValues for the form
    viewState: state.viewState,
  });
}

/**
 * Hook everything up. It is important to first call "connect" and only than "reduxForm". Otherwise
 * setting "initialValues" will not work!
 */
export default connect(mapStateToProps, {
  addPost,
  deletePost,
  getComments,
  getPost,
  resetState,
  setPostEditMode,
  updatePost,
  voteOnPost
})(reduxForm({
  form: 'PostForm', // a unique identifier for this form
  enableReinitialize: true,
})(PostView));
