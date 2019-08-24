import http from '@/utils/http';
import forResponse from '../../utils/forResponse';

export const login = data => {
  return forResponse(
    http.post('/auth/login', data)
  );
}

export const register = data => {
  return forResponse(
    http.post('/users', data)
  );
}