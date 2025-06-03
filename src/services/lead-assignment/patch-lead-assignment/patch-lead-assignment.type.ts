import { ILeadAssignmentPatchApi } from "../../../models";

export interface IPatchLeadAssignmentResponse {
  data: ILeadAssignmentPatchApi[];
}

export interface IPatchLeadAssignmentError {
  message: string;
  statusCode: number;
  error: string;
}
