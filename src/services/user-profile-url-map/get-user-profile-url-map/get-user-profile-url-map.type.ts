import { IUserProfileUrlMapGetApi } from "../../../models";

export interface IGetUserProfileUrlMapResponse {
  data: IUserProfileUrlMapGetApi[];
}

export interface IGetUserProfileUrlMapError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetUserProfileUrlMapParams {
  page: number;
  size: number;
  id?: string;
}
