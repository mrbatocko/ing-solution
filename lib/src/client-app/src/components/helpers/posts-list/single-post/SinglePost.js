import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import authContext from '@/context/authContext';
import AnswerForm from './answer-form/AnswerForm';

import classes from './SinglePost.css';

class SinglePost extends React.Component {

  static contextType = authContext;

  render () {
    const { post, full, getPost, resolve, reopen, deletePost } = this.props;
    const { user } = this.context;
    const { answers } = post;

    const loggedInUserAnswer = user ? post.answers.filter(a => a.user.username === user.username) : [];
    const showAnswerForm = user && (user.username !== post.owner.username) && loggedInUserAnswer.length === 0;
    return (
      <div className="mb-3">
        {full && (
          <Link to="/" className="mb-2 block">
            &larr;
            Back to Home
          </Link>
        )}
        <div className="mb-1 pb-1 border-bottom border-grey">
          {full ? (
            <div className="flex items-center">
              <h1 className="flex-1 black text-normal mb-2">
                {post.title}
              </h1>
              {user && user.username === post.owner.username && (
                <div className="text-sm">
                  {post.resolved ? (
                    <span
                      className="underline mr-2 cursor-pointer black"
                      onClick={() => reopen(post._id)}>
                      Reopen
                  </span>
                  ) : (
                    <span
                      className="underline mr-2 cursor-pointer green"
                      onClick={() => resolve(post._id)}>
                      Resolve
                    </span>
                  )}
                  <span
                    className="underline cursor-pointer red"
                    onClick={() => deletePost(post._id)}>
                    Delete
                  </span>
                </div>
              )}
            </div>
          ) : (
            <h2 className="black text-normal mb-1">
              <Link to={`/${post._id}`}>
                {post.title}
              </Link>
            </h2>
          )}
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
            <div className={classes.postSection}>
              <span>Posted in </span>
              <span className="blue">{post.section.name}</span>
            </div>
          </div>
        </div>
        {full && (
          <>
            <div className="pt-1 pb-3 black-light">
              <p style={{ lineHeight: '1.6' }}>{post.content}</p>
            </div>
            {showAnswerForm && (
              <div className="mb-2">
                <AnswerForm
                  postId={post._id}
                  user={user}
                  getPost={getPost}
                />
              </div>
            )}
            <div className="bg-grey-light p-3">
              <p className="grey-dark text-center uppercase text-sm mt-0 mb-3">{answers.length} Answers</p>
              {answers.map(a => {
                let voteUpClasses = 'cursor-pointer mr-1 text-md';
                let voteDownClasses = 'cursor-pointer text-md';
                if (user && a.upvotes.includes(user._id)) {
                  voteUpClasses += ' black cursor-not-allowed';
                }
                if (user && a.downvotes.includes(user._id)) {
                  voteDownClasses += ' black cursor-not-allowed';
                }
                return (
                  <div className="mb-3" key={a._id}>
                    <div className="flex items-center pb-1 border-bottom border-grey">
                      <div className="flex flex-1">
                        <h4 className="text-semi-bold grey-dark mr-1 mb-0 mt-0">
                          {a.user.username}
                        </h4>
                        <div className="text-bold">
                          <span className="green-dark">{a.upvotes.length}</span>
                          <span className="grey"> / </span>
                          <span className="red-light">{a.downvotes.length}</span>
                        </div>
                      </div>
                      {user && (user.username !== post.owner.username) && (user.username !== a.user.username) && (
                        <div className="uppercase grey-dark">
                          <span className="grey-dark mr-1 text-semi-bold text-sm">Vote </span>
                          <span
                            onClick={() => this.props.vote(post._id, a._id, { vote: true })}
                            className={voteUpClasses}
                            title="This answer is correct.">
                            &#x25B2;
                          </span>
                          <span
                            onClick={() => this.props.vote(post._id, a._id, { vote: false })}
                            className={voteDownClasses}
                            title="This answer is not correct.">
                            &#x25BC;
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-thin" style={{ lineHeight: '1.45' }}>
                      {a.content}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SinglePost;