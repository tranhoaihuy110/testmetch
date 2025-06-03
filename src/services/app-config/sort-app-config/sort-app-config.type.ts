import { IAppConfigGetApi } from "../../../models";

export interface ISortAppConfigResponse {
  data: IAppConfigGetApi[];
}

export interface ISortAppConfigError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISortAppConfigParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}