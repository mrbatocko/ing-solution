import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

class SinglePost extends React.Component {
  render () {
    const { post, full } = this.props;
    return (
      <div>
        {full && (
          <Link to="/">
            &larr;
            Back to posts
          </Link>
        )}
        <div className="mb-1 pb-1 border-bottom border-grey">
          <h2 className="black text-normal mb-1">
            {!full ? (
              <Link to={`/${post._id}`}>
                {post.title}
              </Link>
            ) : post.title}
          </h2>
          <div className="grey-dark text-thin flex">
            <div className="flex flex-1">
              <div className="mr-2">
                <span>
                  Posted
                </span>
                <span className="black-light"> {moment(new Date(post.timestamp)).fromNow()}</span>
              </div>
              <div className="mr-2">&bull;</div>
              <div>
                <span>
                  Status
                </span>
                {post.resolved ? (
                  <span className="green-dark"> [Resolved]</span>
                ) : (
                  <span className="blue"> [Active]</span>
                )}
              </div>
            </div>
            <div>
              <span>Posted in </span>
              <Link to={`/sections/${post.section.name}`}>
                <span className="blue">{post.section.name}</span>
              </Link>
            </div>
          </div>
        </div>
        {full && (
          <div className="pt-2">
            <p>{post.content}</p>
          </div>
        )}
      </div>
    );
  }
}

export default SinglePost;