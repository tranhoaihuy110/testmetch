export interface IGetTotalAppUserPendingError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalAppUserPendingParams {
  user_id?: string;
  from?: string;
  to?: string;
  username?: string;
  user_email?: string;
  phone_number?: string;
  user_type?: string;
  verify_status?: string;
}
