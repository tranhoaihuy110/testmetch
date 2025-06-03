import { IAppUserPendingGetApi } from "../../../models";

export interface ISearchAppUserPendingResponse {
  data: IAppUserPendingGetApi[];
}

export interface ISearchAppUserPendingError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchAppUserPendingParams {
  to?: string;
  from?: string;
  page?: number;
  size?: number;
  user_id?: string;
  username?: string;
  user_email?: string;
  phone_number?: string;
  user_type?: string;
  verify_status?: string;
  verify_code?: string;
  verify_code_expired?: string;
  otp?: string;
  otp_expired_at?: string;
}   
