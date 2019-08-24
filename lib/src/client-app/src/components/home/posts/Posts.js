import React from 'react';
import { getPosts } from '@/services/posts/postsServices';
import Loader from 'react-simple-loading';
import PostForm from './PostForm';
import PostsList from '@/components/helpers/posts-list/PostsList';
import authContext from '@/context/authContext';

class Posts extends React.Component {

  static contextType = authContext;

  state = {
    loading: true,
    posts: []
  }

  componentDidMount () {
    this.getPosts();
  }

  getPosts = async () => {
    this.setState({ loading: true })
    const response = await getPosts();
    if (response.data) {
      this.setState({ posts: response.data.data.posts, loading: false });
    } else {
      this.setState({ loading: false })
    }
  }

  render () {
    const { loading, posts } = this.state;
    return loading ? <Loader /> : (
      <article>
        {!loading && posts.length === 0 && (
          <p className="mt-0 text-center black-light">
            Nothing's posted yet.
            {this.context.token && ' Be first to'}
          </p>
        )}
        {this.context.token && (
          <div className="mb-2">
            <PostForm
              noPosts={!loading && posts.length === 0}
              getPosts={this.getPosts}
            />
          </div>
        )}
        {posts.length > 0 && (
          <div className="flex">
            <main className="pr-3 flex-1">
              <PostsList posts={posts} />
            </main>
            <aside className="pl-2 border-left border-grey">Quick Filters</aside>
          </div>
        )}
      </article>
    );
  }
}

export default Posts;