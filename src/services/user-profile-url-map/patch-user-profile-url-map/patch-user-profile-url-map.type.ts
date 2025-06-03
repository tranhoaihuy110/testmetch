import { IUserProfileUrlMapPatchApi } from "../../../models";

export interface IPatchUserProfileUrlMapResponse {
  data: IUserProfileUrlMapPatchApi[];
}

export interface IPatchUserProfileUrlMapError {
  message: string;
  statusCode: number;
  error: string;
}
