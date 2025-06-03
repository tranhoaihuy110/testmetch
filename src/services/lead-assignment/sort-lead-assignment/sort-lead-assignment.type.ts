import { ILeadAssignmentGetApi } from "../../../models";

export interface ISortLeadAssignmentResponse {
  data: ILeadAssignmentGetApi[];
}

export interface ISortLeadAssignmentError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISortLeadAssignmentParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}