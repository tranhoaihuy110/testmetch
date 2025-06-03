import { IUserProfileUrlMapPostApi } from "../../../models";

export interface IPostUserProfileUrlMapResponse {
  data: IUserProfileUrlMapPostApi[];
}

export interface IPostUserProfileUrlMapError {
  message: string;
  statusCode: number;
  error: string;
}
