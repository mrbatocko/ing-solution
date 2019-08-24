import React from 'react';
import SinglePost from './SinglePost';

class PostsList extends React.Component {
  render () {
    const { posts } = this.props; 
    return (
      <>
        <p className="uppercase text-sm grey-dark text-bold mt-0 mb-2">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</p>
        {posts.map(p => <SinglePost key={p._id} post={p} />)}
      </>
    );
  }
}

export default PostsList;