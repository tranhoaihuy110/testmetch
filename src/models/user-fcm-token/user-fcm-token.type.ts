export interface IUserFcmTokenGetApi {
  id?: string;
  user_id?: string;
  user_email?: string;
  token?: string;
  device_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IUserFcmTokenResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IUserFcmTokenPatchApi {
  id: string;
  user_id: string;
  token: string;
  device_id: string;
  created_at: string;
  updated_at: string;
  user_email?: string;
}

export interface IUserFcmTokenPostApi {
  user_id: string;
  token: string;
  device_id: string;
  user_email?: string;
  created_at?: string;
  updated_at?: string;
  id?: string;
}
