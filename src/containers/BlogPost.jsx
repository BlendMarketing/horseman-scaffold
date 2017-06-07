import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BlogPost extends Component {
  render() {
    const { resource } = this.props;
    return (
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: resource.title.rendered }} />
        <div dangerouslySetInnerHTML={{ __html: resource.content.rendered }} />
        <Link to={`${resource.id}`}>Read More</Link>
      </div>
    );
  }
}

BlogPost.propTypes = {
  /**
   * The blog post resource
   */
  resource: PropTypes.object.isRequired,
}
export default BlogPost;
