import { ILeadConversionsResponseApi } from "../../../models";

export interface IDeleteLeadConversionsResponse {
  data: ILeadConversionsResponseApi[];
}

export interface IDeleteLeadConversionsError {
  message: string;
  statusCode: number;
  error: string;
}
