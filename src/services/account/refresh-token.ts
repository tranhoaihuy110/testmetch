import axios from 'axios';
import { API_ENDPOINT } from '../../constants';

export const refreshAccessTokenApi = (refreshToken: string) => {
  const formData = new URLSearchParams();
  formData.append('refresh_token', refreshToken);

  return axios
    .post(`${API_ENDPOINT}/api/v1/users/refresh_token`, formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    })
    .then((res) => res.data.data);
};
