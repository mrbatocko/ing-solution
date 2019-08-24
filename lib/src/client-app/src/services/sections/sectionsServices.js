import http from '@/utils/http';
import forResponse from '../../utils/forResponse';

export const getSections = () => {
  return forResponse(
    http.get('/sections')
  );
}