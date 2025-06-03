import { IAppUserGetApi } from "../../../models";

export interface ISearchAppUserResponse {
  data: IAppUserGetApi[];
}

export interface ISearchAppUserError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchAppUserParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  user_id?: string;
  user_email?: string;
  user_status?: string;
  username?: string;
  user_fullname?: string;
  phone_number?: string;
}
