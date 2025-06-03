import { IUserFcmTokenGetApi } from "../../../models";

export interface ISortUserFcmTokenResponse {
  data: IUserFcmTokenGetApi[];
}

export interface ISortUserFcmTokenError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortUserFcmTokenParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
