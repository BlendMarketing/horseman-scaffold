import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BlogPost from './BlogPost';

class BlogList extends Component {
  render() {
    const { posts } = this.props;
    const mapPosts = (post,i) => {
      return (
        <div key={i}>
          <BlogPost post={post} />
          <Link to={`/blog/${post.id}`}>Read More</Link>
        </div>);
    };
    return (
      <div>{posts.map(mapPosts)}</div>
    );
  }
}

BlogList.propTypes = {
  /**
   * The blog post resource
   */
  posts: PropTypes.array.isRequired,
}
export default BlogList;
