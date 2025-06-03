export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    message: string;
    access_token: string;
    refresh_token: string;
  };
  statusCode: number;
}

export interface ILoginError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IInfoAccount {
  data: {
    id: number;
    username: string;
    email: string;
    password: string;
  };
}
