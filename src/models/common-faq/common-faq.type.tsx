export interface ICommonFaqGetApi {
  id?: number;
  faq_q: string;
  faq_a: string;
  faq_type: string;
  create_date: string;
  tenacy_id: string;
  faq_status: number | undefined;
}

export interface ICommonFaqResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ICommonFaqPatchApi {
  id: number;
  faq_q: string;
  faq_a: string;
  faq_type: string;
  tenacy_id: string;
  faq_status: number | undefined;
}
export interface ICommonFaqPostApi {
  id: number;
  faq_q: string;
  faq_a: string;
  faq_type: string;
  tenacy_id: string;
  faq_status: number | undefined;
}
