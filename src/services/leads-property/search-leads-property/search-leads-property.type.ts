import { ILeadsPropertyGetApi } from "../../../models";

export interface ISearchLeadsPropertyResponse {
  data: ILeadsPropertyGetApi[];
}

export interface ISearchLeadsPropertyError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchLeadsPropertyParams {
  to?: string; 
  from?: string; 
  page?: number; 
  size?: number;
  email?:string;
  address?:string;
  lead_property_id?: string;
}