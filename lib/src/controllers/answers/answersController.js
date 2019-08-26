import answersServices from '../../services/answers/answersServices';

export const answerOnPost = async (req, res) => {
  console.log(req.params);
  const user = { userId: req.decodedJwt._id, username: req.decodedJwt.username };
  const {
    content,
    timestamp
  } = req.body;
  try {
    await answersServices.answerOnPost(req.params.id, { content, timestamp, user, downvotes: [], upvotes: [] });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
}

export const vodeForPostAnswer = async (req, res) => {
  const { id, answerId } = req.params;
  const { vote } = req.body;
  try {
    await answersServices.vodeForPostAnswer(id, answerId, req.decodedJwt._id, vote);
    res.status(204).send();
  } catch (error) {
    if (error._message === 'Already upvoted' || error._message === 'Already downvoted') {
      res.status(409).send(error);
    }
    if (error._message === 'Cannot vote for comment you posted') {
      res.status(403).send(error);
    }
  }
}

export const deletePostAnswer = async (req, res) => {
  res.send({ message: 'OK' });
}