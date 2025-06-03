import { IUserFcmTokenPatchApi } from "../../../models";

export interface IPatchUserFcmTokenResponse {
  data: IUserFcmTokenPatchApi[];
}

export interface IPatchUserFcmTokenError {
  message: string;
  statusCode: number;
  error: string;
}
