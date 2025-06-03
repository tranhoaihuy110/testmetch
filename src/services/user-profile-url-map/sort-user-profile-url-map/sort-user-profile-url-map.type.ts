import { IUserProfileUrlMapGetApi } from "../../../models";

export interface ISortUserProfileUrlMapResponse {
  data: IUserProfileUrlMapGetApi[];
}

export interface ISortUserProfileUrlMapError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortUserProfileUrlMapParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
