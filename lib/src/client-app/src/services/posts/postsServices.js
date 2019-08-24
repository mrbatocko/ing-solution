import http from '@/utils/http';
import forResponse from '../../utils/forResponse';

export const getPosts = () => {
  return forResponse(
    http.get('/posts')
  );
}

export const createPost = data => {
  return forResponse(
    http.post('/posts', data)
  );
}

export const getPost = id => {
  return forResponse(
    http.get(`/posts/${id}`)
  );
}