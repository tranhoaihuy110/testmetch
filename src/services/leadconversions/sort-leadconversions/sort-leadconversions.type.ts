import { ILeadConversionsGetApi } from "../../../models";

export interface ISortLeadConversionsResponse {
  data: ILeadConversionsGetApi[];
}

export interface ISortLeadConversionsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortLeadConversionsParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
