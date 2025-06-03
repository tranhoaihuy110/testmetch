import { ICommonFaqGetApi } from "../../../models";

export interface ISearchCommonFaqResponse {
  data: ICommonFaqGetApi[];
}

export interface ISearchCommonFaqError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchCommonFaqParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  id?: string;
  faq_a?: string;
  faq_q?: string;
  faq_type?: string;
}
