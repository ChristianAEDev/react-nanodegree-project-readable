import React, { Component } from 'react';

class PostsCategoryView extends Component {
  componentDidMount() {
    // react-router allows that we can read a parameter from the URL
    const { categoryName } = this.props.match.params;
  }

  render() {
    return (
      <div>PostsCategoryView</div>
    );
  }
}

export default PostsCategoryView;
