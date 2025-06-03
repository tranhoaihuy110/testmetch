import { IUserProfileUrlMapResponseApi } from "../../../models";

export interface IDeleteUserProfileUrlMapResponse {
  data: IUserProfileUrlMapResponseApi[];
}

export interface IDeleteUserProfileUrlMapError {
  message: string;
  statusCode: number;
  error: string;
}
