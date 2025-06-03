import { ILeadAssignmentGetApi } from "../../../models";

export interface IGetLeadAssignmentResponse {
  data: ILeadAssignmentGetApi[];
}

export interface IGetLeadAssignmentError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadAssignmentParams {
  page: number;
  size: number;
  assignment_id?: string;
}