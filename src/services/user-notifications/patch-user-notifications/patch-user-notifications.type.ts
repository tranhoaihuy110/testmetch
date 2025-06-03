import { IUserNotificationsPatchApi } from "../../../models";

export interface IPatchUserNotificationsResponse {
  data: IUserNotificationsPatchApi[];
}

export interface IPatchUserNotificationsError {
  message: string;
  statusCode: number;
  error: string;
}
