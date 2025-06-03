import { ICommonFaqGetApi } from "../../../models";

export interface ISortCommonFaqResponse {
  data: ICommonFaqGetApi[];
}

export interface ISortCommonFaqError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISortCommonFaqParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}