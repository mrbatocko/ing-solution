import React from 'react';
import { getPosts } from '@/services/posts/postsServices';
import Loader from 'react-simple-loading';
import PostForm from '../../helpers/post-form/PostForm';
import PostsList from '@/components/helpers/posts-list/PostsList';
import Filters from './filters/Filters';
import authContext from '@/context/authContext';

import classes from './Posts.css';

class Posts extends React.Component {

  static contextType = authContext;

  state = {
    loading: true,
    posts: [],
    filters: {}
  }

  componentDidMount () {
    this.getPosts();
  }

  getPosts = async () => {
    const { filters } = this.state;
    this.setState({ loading: true })
    const response = await getPosts(filters);
    if (response.data) {
      this.setState({ posts: response.data.data.posts, loading: false });
    } else {
      this.setState({ loading: false })
    }
  }

  applyFilters = filters => {
    this.setState({ filters: { ...this.state.filters, ...filters } }, () => {
      this.getPosts();
    });
  }

  render () {
    const { loading, posts } = this.state;
    return (
      <>
        {loading && <Loader />}
        <article>
          {this.context.token && (
            <div className="mb-2">
              <PostForm getPosts={this.getPosts} />
            </div>
          )}
          <div className={classes.postsLayout}>
            <main className={[ 'flex-1', classes.postsList ].join(' ')}>
              <PostsList posts={posts} />
            </main>
            <aside className={[ 'pl-2 border-left border-grey', classes.postsFilters ].join(' ')}>
              <Filters applyFilters={this.applyFilters} />
            </aside>
          </div>
        </article>
      </>
    );
  }
}

export default Posts;