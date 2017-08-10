import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Header } from 'semantic-ui-react';
import { addPost } from '../actions';

class PostView extends Component {
  render() {
    return (
      <Form>
        <Form.Input label="Title" placeholder="Title" />
        <Form.Group>
          <Form.Input label="Author" placeholder="Author" width={12} />
          <Header>08.09.2017</Header>
        </Form.Group>
        <Form.TextArea label="Body" placeholder="What's on your mind..." />
        <Form.Button>Save</Form.Button>
      </Form>
    );
  }
}

function validate(values) {
  const errors = {};

  console.log('validate', values);

  return errors;
}

export default reduxForm({
  // Add the validator (Equals to "validate: validate")
  validate,
  // "FormNewPost" is the name of the form. Each form needs to have it's own unique name.
  // If the same name is used in multiple components, it will be merged. This behavior is helpful
  // for multi page (wizard) forms.
  form: 'FormNewPost',
})(connect(null, { addPost })(PostView));
