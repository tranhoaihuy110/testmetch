import { IUserNotificationsGetApi } from "../../../models";

export interface ISortUserNotificationsResponse {
  data: IUserNotificationsGetApi[];
}

export interface ISortUserNotificationsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortUserNotificationsParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
