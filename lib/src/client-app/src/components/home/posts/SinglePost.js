import React from 'react';
import Post from '@/components/helpers/posts-list/SinglePost';
import { withRouter } from 'react-router-dom';
import { getPost } from '@/services/posts/postsServices';
import Loader from 'react-simple-loading';

class SinglePost extends React.Component {

  state = {
    post: null,
    loading: true
  }

  componentDidMount () {
    this.getPost();
  }

  getPost = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true })
    const { data } = await getPost(id);
    if (data) {
      this.setState({ post: data.data.post, loading: false });
    }
  }
  render () {
    const { loading, post } = this.state;
    return loading ? (
      <Loader />
    ) : (
      <Post post={post} full={true} />
    );
  }
}

export default withRouter(SinglePost);