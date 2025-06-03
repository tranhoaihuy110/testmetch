export interface IGetTotalUserFcmTokenError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalUserFcmTokenParams {
  id?: string;
  from?: string;
  to?: string;
  user_id?: string;
  user_email?: string;
  token?: string;
  device_id?: string;
  create_at?: string;
  update_at?: string;
}
