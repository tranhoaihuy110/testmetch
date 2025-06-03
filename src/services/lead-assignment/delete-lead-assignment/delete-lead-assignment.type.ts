import { ILeadAssignmentResponseApi } from "../../../models";

export interface IDeleteLeadAssignmentResponse {
  data: ILeadAssignmentResponseApi[];
}

export interface IDeleteLeadAssignmentError {
  message: string;
  statusCode: number;
  error: string;
}
