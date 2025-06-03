import { ILeadConversionsGetApi } from "../../../models";

export interface IGetLeadConversionsResponse {
  data: ILeadConversionsGetApi[];
}

export interface IGetLeadConversionsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadConversionsParams {
  page: number;
  size: number;
  conversion_id?: string;
}
