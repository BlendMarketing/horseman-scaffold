import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BlogPost from './BlogPost';

class PostPage extends Component {
  render() {
    const { post } = this.props;
    return (
        <div>
          <BlogPost post={post} />
          <Link to={`/blog`}>Blog Home</Link>
        </div>);
  }
}

BlogPost.propTypes = {
  /**
   * The blog post resource
   */
  post: PropTypes.object.isRequired,
}
export default PostPage;
