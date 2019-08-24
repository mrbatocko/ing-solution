import postsServices from '../../services/posts/postsServices';

export const getPosts = async (_, res) => {
  try {
    const posts = await postsServices.getPosts();
    res.json({ posts });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export const getPost = async (req, res) => {
  try {
    const post = await postsServices.getPost(req.params.id);
    res.json({ post });
  } catch (error) {
    res.status(500).send({ error });
  }
}

export const createPost = async (req, res) => {
  const {
    content,
    timestamp,
    section
  } = req.body;
  const owner = { userId: req.decodedJwt._id, username: req.decodedJwt.username };
  try {
    const post = await postsServices.createPost({ content, owner, timestamp, section, answers: [] });
    res.json({ post });
  } catch (error) {
    if (error._message === 'Post validation failed') {
      res.status(400).send(error);
    } else {
      res.status(500).send({ error });
    }
  }
}

export const answerOnPost = async (req, res) => {
  const user = { userId: req.decodedJwt, username: req.decodedJwt.username };
  const {
    content,
    timestamp
  } = req.body;
  try {
    await postsServices.answerOnPost(req.params.id, { content, timestamp, user, downvotes: [], upvotes: [] });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
}