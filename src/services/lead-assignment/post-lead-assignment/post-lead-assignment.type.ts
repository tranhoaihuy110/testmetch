import { ILeadAssignmentPatchApi } from "../../../models";

export interface IPostLeadAssignmentResponse {
  data: ILeadAssignmentPatchApi[];
}

export interface IPostLeadAssignmentError {
  message: string;
  statusCode: number;
  error: string;
}
