import React from 'react';
import Post from '@/components/helpers/posts-list/single-post/SinglePost';
import { withRouter } from 'react-router-dom';
import {
  getPost,
  voteForAnswer,
  resolve,
  reopen,
  deletePost
} from '@/services/posts/postsServices';
import Loader from 'react-simple-loading';
import authContext from '@/context/authContext';

class SinglePost extends React.Component {

  static contextType = authContext;

  state = {
    post: null,
    loading: true
  }

  componentDidMount () {
    this.getPost();
  }

  vote = async (postId, answerId, data) => {
    const { user } = this.context;
    if (user) {
      const { error } = await voteForAnswer(postId, answerId, data);
      if (!error) {
        const post = { ...this.state.post };
        const answers = [ ...post.answers ];
        const index = answers.findIndex(a => a._id === answerId);
        answers[index][data.vote ? 'upvotes' : 'downvotes'].push(user._id);
        if (data.vote) {
          const downvoteIndex = answers[index]['downvotes'].findIndex(u => u === user._id);
          if (downvoteIndex > -1) {
            answers[index]['downvotes'].splice(downvoteIndex, 1);
          }
        } else {
          const upvoteIndex = answers[index]['upvotes'].findIndex(u => u === user._id);
          if (upvoteIndex > -1) {
            answers[index]['upvotes'].splice(upvoteIndex, 1);
          }
        }
        post.answers = answers;
        this.setState({ post });
      }
    }
  }

  resolve = async id => {
    const { error } = await resolve(id);
    if (!error) {
      const post = { ...this.state.post };
      post.resolved = true;
      this.setState({ post });
    }
  }

  reopen = async id => {
    const { error } = await reopen(id);
    if (!error) {
      const post = { ...this.state.post };
      post.resolved = false;
      this.setState({ post });
    }
  }

  deletePost = async id => {
    const { error } = await deletePost(id);
    if (!error) {
      this.props.history.push('/');
    }
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
    return (
      <>
        {loading && <Loader />}
        {!loading && !post && <p className="text-center grey-dark uppercase text-sm">Post not found.</p>}
        {post && (
          <Post
            post={post}
            full={true}
            getPost={this.getPost}
            vote={this.vote}
            resolve={this.resolve}
            reopen={this.reopen}
            deletePost={this.deletePost}
          />
        )}
      </>
    );
  }
}

export default withRouter(SinglePost);