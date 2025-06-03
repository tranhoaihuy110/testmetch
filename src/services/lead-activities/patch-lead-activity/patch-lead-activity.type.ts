import { ILeadActivityPatchApi } from "../../../models";

export interface IPatchLeadActivityResponse {
  data: ILeadActivityPatchApi[];
}

export interface IPatchLeadActivityError {
  message: string;
  statusCode: number;
  error: string;
}
