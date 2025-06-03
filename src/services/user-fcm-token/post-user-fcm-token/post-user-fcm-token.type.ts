import { IUserFcmTokenPostApi } from "../../../models";

export interface IPostUserFcmTokenResponse {
  data: IUserFcmTokenPostApi[];
}

export interface IPostUserFcmTokenError {
  message: string;
  statusCode: number;
  error: string;
}
