import { ILeadsourcesPostApi } from "../../../models";

export interface IPostLeadsourcesResponse {
  data: ILeadsourcesPostApi[];
}

export interface IPostLeadsourcesError {
  message: string;
  statusCode: number;
  error: string;
}
