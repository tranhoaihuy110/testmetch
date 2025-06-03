import { ICommonMetadataFinalGetApi } from "../../../models";

export interface ISearchCommonMetadataFinalResponse {
  data: ICommonMetadataFinalGetApi[];
}

export interface ISearchCommonMetadataFinalError {
  message: string;
  statusCode: number;
  error: string;
}


export interface ISearchCommonMetadataFinalParams {
 from?: string ,
  to?: string ,
  page? : number,
  size?: number ,
  id?: string ,
  meta_key?:string, 
}