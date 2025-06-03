import { IUserProfileUrlMapGetApi } from "../../../models";

export interface ISearchUserProfileUrlMapResponse {
  data: IUserProfileUrlMapGetApi[];
}

export interface ISearchUserProfileUrlMapError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchUserProfileUrlMapParams {
  page?: number;
  size?: number;
  id?: string;
  email?: string;
}
