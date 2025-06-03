import { ILeadsGetApi } from "../../../models";

export interface ISearchLeadsResponse {
  data: ILeadsGetApi[];
}

export interface ISearchLeadsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchLeadsParams {
  from?: string; 
  to?: string; 
  page?: number; 
  size?: number; 
  lead_id?: string; 
  email?: string;
  phone_number?:string
  last_name?:string
}