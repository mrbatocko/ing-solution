import http from '@/utils/http';
import forResponse from '../../utils/forResponse';

export const getPosts = params => {
  return forResponse(
    http.get('/posts', { params })
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

export const answerOnPost = (id, data) => {
  return forResponse(
    http.post(`/posts/${id}/answer`, data)
  );
}

export const voteForAnswer = (postId, answerId, data) => {
  return forResponse(
    http.put(`/posts/${postId}/answer/${answerId}`, data)
  );
}

export const resolve = id => {
  return forResponse(
    http.post(`/posts/${id}/resolve`)
  );
}

export const reopen = id => {
  return forResponse(
    http.post(`/posts/${id}/reopen`)
  );
}

export const deletePost = id => {
  return forResponse(
    http.delete(`/posts/${id}`)
  );
}