import { ILeadConversionsGetApi } from "../../../models";

export interface ISearchLeadConversionsResponse {
  data: ILeadConversionsGetApi[];
}

export interface ISearchLeadConversionsError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchLeadConversionsParams {
  to?: string;
  from?: string;
  page?: number;
  size?: number;
  conversion_id?: string;
  lead_id?: string;
  converted_to?: string;
  conversion_value?: string;
}
