import { IApiLogsGetApi } from "../../../models";

export interface ISearchApiLogsResponse {
  data: IApiLogsGetApi[];
}

export interface ISearchApiLogsError {
  message: string;
  statusCode: number;
  error: string;
}


export interface ISearchApiLogsParams {
 from?: string ,
  to?: string ,
  page? : number,
  size?: number ,
  id?: string , 
  name_log?:string
}