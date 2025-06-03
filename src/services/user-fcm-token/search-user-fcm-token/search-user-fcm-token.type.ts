import { IUserFcmTokenGetApi } from "../../../models";

export interface ISearchUserFcmTokenResponse {
  data: IUserFcmTokenGetApi[];
}

export interface ISearchUserFcmTokenError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchUserFcmTokenParams {
  to?: string;
  from?: string;
  page?: number;
  size?: number;
  id?: string;
  user_id?: string;
  user_email?: string;
  token?: string;
  device_id?: string;
}
