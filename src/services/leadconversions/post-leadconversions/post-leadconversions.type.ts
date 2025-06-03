import { ILeadConversionsPostApi } from "../../../models";

export interface IPostLeadConversionsResponse {
  data: ILeadConversionsPostApi[];
}

export interface IPostLeadConversionsError {
  message: string;
  statusCode: number;
  error: string;
}
