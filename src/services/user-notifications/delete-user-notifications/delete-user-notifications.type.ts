import { IUserNotificationsResponseApi } from "../../../models";

export interface IDeleteUserNotificationsResponse {
  data: IUserNotificationsResponseApi[];
}

export interface IDeleteUserNotificationsError {
  message: string;
  statusCode: number;
  error: string;
}
