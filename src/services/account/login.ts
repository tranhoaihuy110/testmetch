import { MS_API } from '../api';

type ILoginParams = {
  password: string;
  username: string;
  captcha?: string;
  otp?: string;
};

export const loginApi = (data: ILoginParams): Promise<Record<string, any>> => {
  const { username, password } = data;

  return new Promise((resolve, reject) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    MS_API.post<Record<string, any>>('/api/v1/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'clean-request': 'no-clean',
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
