import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BlogPost from './BlogPost';

class BlogList extends Component {
  render() {
    const mapPosts = (resource,i) => {
      return (<BlogPost key={i} resource={resource} />);
    };
    const { resources } = this.props;
    return (
      <div>{resources.map(mapPosts)}</div>
    );
  }
}

BlogList.propTypes = {
  /**
   * The blog post resource
   */
  resources: PropTypes.array.isRequired,
}
export default BlogList;
