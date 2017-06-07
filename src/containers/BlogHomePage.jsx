import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BlogList from './BlogList';

class BlogHomePage extends Component {
  render() {
    const { posts } = this.props;
    return (
        <BlogList posts={posts} />
    );
  }
}

BlogHomePage.propTypes = {
  /**
   * The blog post resource
   */
  posts: PropTypes.array.isRequired,
}
export default BlogHomePage;
