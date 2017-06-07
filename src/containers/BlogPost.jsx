import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BlogPost extends Component {
  render() {
    const { post } = this.props;
    console.log("post",post);
    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
    );
  }
}

BlogPost.propTypes = {
  /**
   * The blog post resource
   */
  post: PropTypes.object.isRequired,
}
export default BlogPost;
