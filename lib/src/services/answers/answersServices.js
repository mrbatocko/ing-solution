import PostModel from '../../models/post/postModel';
import promisifyObjectMethods from '../../utils/promisifyObjectMethods';

const services = {
  answerOnPost: async (_id, answer, cb) => {
    try {
      const postDoc = await PostModel.findById(_id);
      postDoc.answers.push(answer);
      try {
        await postDoc.save()
        cb(null);
      } catch (error) {
        cb(error);
      }
    } catch (error) {
      cb(error);
    }
  },
  vodeForPostAnswer: async (id, answerId, userWhoVotesId, vote, cb) => {
    try {
      const postDoc = await PostModel.findById(id);
      const answer = postDoc.answers.id(answerId);
      if (userWhoVotesId === answer._id) {
        cb({ _message: 'Cannot vote for comment you posted' });
      } else {
        if (answer) {
          if (vote) {
            if (answer.upvotes.includes(userWhoVotesId)) {
              cb({ _message: 'Already upvoted' });
            } else {
              answer.upvotes.push(userWhoVotesId);
              const downvoteIndex = answer.downvotes.findIndex(d => d.toString() === userWhoVotesId);
              console.log('Downvote index found', downvoteIndex);
              if (downvoteIndex > -1) {
                answer.downvotes.splice(downvoteIndex, 1);
              }
              await postDoc.save()
              cb();
            }
          } else {
            if (answer.downvotes.includes(userWhoVotesId)) {
              cb({ _message: 'Already downvoted' });
            } else {
              answer.downvotes.push(userWhoVotesId);
              const upvoteIndex = answer.upvotes.findIndex(u => u.toString() === userWhoVotesId);
              console.log('Upvote index found', upvoteIndex);
              if (upvoteIndex > -1) {
                answer.upvotes.splice(upvoteIndex, 1);
              }
              await postDoc.save()
              cb();
            }
          }
        } else {
          cb({ _message: 'Answer does not exist' });
        }
      }
    } catch (error) {
      cb(error);
    }
  }
}

export default promisifyObjectMethods(services);