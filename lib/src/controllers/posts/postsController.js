import postsServices from '../../services/posts/postsServices';

export const getPosts = async (req, res) => {
  try {
    const query = {};
    if (req.query.section) {
      query['section.name'] = req.query.section;
    }
    if (req.query.title) {
      query['title'] = new RegExp(req.query.title, 'ig');
    }
    if (req.query.username) {
      query['owner.username'] = req.query.username;
    }
    const posts = await postsServices.getPosts(query);
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
  const owner = { userId: req.decodedJwt._id, username: req.decodedJwt.username };
  try {
    const post = await postsServices.createPost({ ...req.body, answers: [], owner });
    res.json({ post });
  } catch (error) {
    if (error._message === 'Post validation failed') {
      res.status(400).send(error);
    } else {
      res.status(500).send({ error });
    }
  }
}

export const resolvePost = async (req, res) => {
  try {
    await postsServices.resolvePost(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
}

export const reopenPost = async (req, res) => {
  try {
    await postsServices.reopenPost(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
}

export const deletePost = async (req, res) => {
  try {
    await postsServices.deletePost(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error });
  }
}