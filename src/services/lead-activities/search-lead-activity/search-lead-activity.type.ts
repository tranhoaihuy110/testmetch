import { ILeadActivityGetApi } from "../../../models";

export interface ISearchLeadActivityResponse {
  data: ILeadActivityGetApi[];
}

export interface ISearchLeadActivityError {
  message: string;
  statusCode: number;
  error: string;
}


export interface ISearchLeadActivityParams {
 from?: string ,
  to?: string ,
  page? : number,
  size?: number ,
  activity_id?: string , 
  activity_type?: string ,
  lead_id?: string ,
  email?: string ,
  status?: string ,
}