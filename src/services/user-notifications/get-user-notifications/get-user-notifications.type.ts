import { IUserNotificationsGetApi } from "../../../models";

export interface IGetUserNotificationsResponse {
  data: IUserNotificationsGetApi[];
}

export interface IGetUserNotificationsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetUserNotificationsParams {
  page: number;
  size: number;
  id?: string;
}
