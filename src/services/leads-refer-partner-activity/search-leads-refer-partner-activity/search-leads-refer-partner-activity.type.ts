import { ILeadsReferPartnerActivityGetApi } from "../../../models";

export interface ISearchLeadsReferPartnerActivityResponse {
  data: ILeadsReferPartnerActivityGetApi[];
}

export interface ISearchLeadsReferPartnerActivityError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchLeadsReferPartnerActivityParams {
  to?: string;
  from?: string;
  page?: number; 
  size?: number;
  refer_partner_id?: string;
  user_action?: string;
  status_old?: string;
  status_new?: string;
  id?: string;
}