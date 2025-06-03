import { IUserNotificationsPostApi } from "../../../models";

export interface IPostUserNotificationsResponse {
  data: IUserNotificationsPostApi[];
}

export interface IPostUserNotificationsError {
  message: string;
  statusCode: number;
  error: string;
}
