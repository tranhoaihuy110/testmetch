import { useContext, createContext, useEffect, useState } from 'react';
import { loginApi, MS_API, refreshAccessTokenApi,profileApi } from '../../../services';

const authContext = createContext({});
export const ProvideAuth = ({ children }: any) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext) as ReturnType<typeof useProvideAuth>;


function useProvideAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [username, setusername] = useState<string | null>(null);
  const [email, setemail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [staff, setStaff] = useState<Record<string, any> | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const signin = async (username: string, password: string, captcha: string, otp: string): Promise<void> => {
    const loginRes = await loginApi({ username, password, captcha, otp });
    if (loginRes?.data?.access_token && loginRes?.data?.refresh_token) {
      const newAccess = loginRes.data.access_token;
      const newRefresh = loginRes.data.refresh_token;
      const newUserRole = loginRes.data.user_role;

      window.localStorage.setItem('access_token', newAccess);
      window.localStorage.setItem('refresh_token', newRefresh);
      window.localStorage.setItem('user_role', newUserRole);

      MS_API.authorization(newAccess);

      setAccessToken(newAccess);
      setRefreshToken(newRefresh);
      setUserRole(newUserRole);
    }
  };
  const profile = async (access_token: string): Promise<void> => {
  try {
    const profileRes = await profileApi({access_token});
    if (profileRes?.data?.data?.email && profileRes?.data?.data?.username) {
      const newUsername = profileRes.data.data.username;
      const newEmail = profileRes.data.data.email;

      window.localStorage.setItem('username', newUsername);
      window.localStorage.setItem('email', newEmail);
      window.localStorage.setItem('access_token', access_token); 

      MS_API.authorization(access_token);

      setAccessToken(access_token);
      setusername(newUsername);
      setemail(newEmail);
    } else {
      throw new Error('Missing email or username in API response');
    }
  } catch (error) {
    throw error;
  }
};


  const refreshAccessToken = async () => {
    if (!refreshToken) return;
    try {
      const data = await refreshAccessTokenApi(refreshToken);
      if (data?.access_token) {
        window.localStorage.setItem('access_token', data.access_token);
        window.localStorage.setItem('refresh_token', data.refresh_token);
        window.localStorage.setItem('user_role', data.user_role);

        MS_API.authorization(data.access_token);

        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        setUserRole(data.user_role);

        return data.access_token;
      }
    } catch {
      signOut();
    }
  };

  const signOut = () => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('user_role');
    setAccessToken(null);
    setRefreshToken(null);
    setStaff(null);
    setUserRole(null);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('access_token');
    const rToken = window.localStorage.getItem('refresh_token');
    const rUserRole = window.localStorage.getItem('user_role');
    const rUsername = window.localStorage.getItem('username');
    const rEmail = window.localStorage.getItem('email');

    if (rUserRole) setUserRole(rUserRole);
    if (token) {
      MS_API.authorization(token);
      setAccessToken(token);
    }
    if (rToken) setRefreshToken(rToken);
    if (rUsername) setusername(rUsername);
    if (rEmail) setemail(rEmail);

    setAuthChecked(true);
  }, []);

  useEffect(() => {
    if (accessToken) {
      MS_API.me()
        .then((res) => setStaff(res?.data))
        .catch(() => setStaff(null));
    } else {
      setStaff(null);
    }
  }, [accessToken]);

  return {
    accessToken,
    staff,
    email,
    username,
    userRole,
    signin,
    profile,
    signOut,
    refreshAccessToken,
    authChecked,
  };
}

