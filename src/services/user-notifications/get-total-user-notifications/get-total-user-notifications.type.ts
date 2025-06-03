export interface IGetTotalUserNotificationsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalUserNotificationsParams {
  id?: string;
  from?: string;
  to?: string;
  title?: string;
  message?: string;
  user_id?: string;
  user_email?: string;
  type?: string;
  is_read?: string;
}
