import axios, { AxiosError } from 'axios';
import { ILoginPayload, ILoginResponse, ILoginError, IInfoAccount } from './index';

export const login = async (data: ILoginPayload): Promise<{ token: string; account: IInfoAccount; refreshToken: string }> => {
  try {
    
    const res = await axios.post(`/auth/v1/login`, data);
    const loginResponse = res.data as ILoginResponse;
    const token = loginResponse.data.access_token;
    const refreshToken = loginResponse.data.refresh_token;

    
    const profileRes = await axios.get(`/auth/v1/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const account = profileRes.data as IInfoAccount;

    return { token, account,refreshToken };
  } catch (error) {
    const err = error as AxiosError<ILoginError>;
    if (err.response?.data) {
      console.error("Đăng nhập thất bại", err.response.data);
      throw err.response.data;
    } else {
      const networkError: ILoginError = {
        message: "Network error or server not responding",
        statusCode: 0,
        error: err.message || "Network Error",
      };
      console.error("Network error or server not responding", err.message);
      throw networkError;
    }
  }
};
