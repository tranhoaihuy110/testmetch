
export interface IGetTotalCommonFaqError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalCommonFaqParams {
  id?: string | null; 
  from?: string; 
  to?: string;
  faq_q?:string 
}