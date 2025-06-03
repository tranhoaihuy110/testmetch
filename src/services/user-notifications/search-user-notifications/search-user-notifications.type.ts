import { IUserNotificationsGetApi } from "../../../models";

export interface ISearchUserNotificationsResponse {
  data: IUserNotificationsGetApi[];
}

export interface ISearchUserNotificationsError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchUserNotificationsParams {
  to?: string;
  from?: string;
  page?: number;
  size?: number;
  id?: string;
  title?: string;
  message?: string;
  user_id?: string;
  user_email?: string;
  type?: string;
  is_read?: string;
}
