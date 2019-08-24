import React from 'react';
import SinglePost from './posts/SinglePost';
import Posts from './posts/Posts';

class Home extends React.Component {
  render () {
    const { id } = this.props.match.params;
    return (
      <div className="container pt-2">
        {id || id === 0 ? <SinglePost /> : <Posts />}
      </div>
    );
  }
}

export default Home;