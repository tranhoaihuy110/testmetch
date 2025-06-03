import { MS_API } from '../api';

type IProfileParams = {
  access_token: string;
};

export const profileApi = (data: IProfileParams): Promise<Record<string, any>> => {
  const { access_token } = data;
  return MS_API.get<Record<string, any>>('/api/v1/auth/profile', {
    params: { access_token },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
  });
};
