import { ILeadActivityPatchApi } from "../../../models";

export interface IPostLeadActivityResponse {
  data: ILeadActivityPatchApi[];
}

export interface IPostLeadActivityError {
  message: string;
  statusCode: number;
  error: string;
}
