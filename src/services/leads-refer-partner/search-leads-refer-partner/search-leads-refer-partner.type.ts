import { ILeadsReferPartnerGetApi } from "../../../models";

export interface ISearchLeadsReferPartnerResponse {
  data: ILeadsReferPartnerGetApi[];
}

export interface ISearchLeadsReferPartnerError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchLeadsReferPartnerParams {
  to?: string;
  from?: string;
  page?: number; 
  size?: number;
  refer_partner_id?: string;
  lead_id?: string;
  email?: string;
  updated_by?: string;
  refer_partner_status?: string;
}