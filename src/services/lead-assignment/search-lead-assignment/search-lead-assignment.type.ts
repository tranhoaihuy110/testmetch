import { ILeadAssignmentGetApi } from "../../../models";

export interface ISearchLeadAssignmentResponse {
  data: ILeadAssignmentGetApi[];
}

export interface ISearchLeadAssignmentError {
  message: string;
  statusCode: number;
  error: string;
}


export interface ISearchLeadAssignmentParams {
 from?: string ,
  to?: string ,
  page? : number,
  size?: number ,
  assigned_to_id?: string , 
  assigned_to?: string ,
  lead_id?: string ,
  email?: string ,
  assignment_id?: string ,
}