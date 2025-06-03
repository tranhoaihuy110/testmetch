import { IAppConfigGetApi } from "../../../models";

export interface ISearchAppConfigResponse {
  data: IAppConfigGetApi[];
}

export interface ISearchAppConfigError {
  message: string;
  statusCode: number;
  error: string;
}


export interface ISearchAppConfigParams {
 from?: string ,
  to?: string ,
  page? : number,
  size?: number ,
  key?: string , 
}