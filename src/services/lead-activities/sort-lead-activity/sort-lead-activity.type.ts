import { ILeadActivityGetApi } from "../../../models";

export interface ISortLeadActivityResponse {
  data: ILeadActivityGetApi[];
}

export interface ISortLeadActivityError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISortLeadActivityParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}