import React from 'react';
import { getPosts } from '@/services/posts/postsServices';
import Loader from 'react-simple-loading';
import PostForm from '@/components/helpers/post-form/PostForm';
import PostsList from '@/components/helpers/posts-list/PostsList';
import authContext from '@/context/authContext';

import classes from './MyPosts.css';

class Posts extends React.Component {

  static contextType = authContext;

  state = {
    loading: true,
    posts: [],
  }

  componentDidMount () {
    this.getPosts();
  }

  getPosts = async () => {
    const { user } = this.context;
    this.setState({ loading: true })
    const response = await getPosts({ username: user.username });
    if (response.data) {
      this.setState({ posts: response.data.data.posts, loading: false });
    } else {
      this.setState({ loading: false })
    }
  }

  render () {
    const { loading, posts } = this.state;
    return (
      <div className={[ 'container pt-2' ].join(' ')}>
        {loading && <Loader />}
        <article>
          {this.context.token && (
            <div className="mb-2">
              <PostForm getPosts={this.getPosts} />
            </div>
          )}
          <main className={[ 'pr-3 flex-1', classes.postsLayout ].join(' ')}>
            <PostsList posts={posts} />
          </main>
        </article>
      </div>
    );
  }
}

export default Posts;