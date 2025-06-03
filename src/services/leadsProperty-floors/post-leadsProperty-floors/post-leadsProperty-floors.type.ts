import { ILeadPropertyFloorsPostApi } from "../../../models";

export interface IPostLeadsPropertyFloorsResponse {
  data: ILeadPropertyFloorsPostApi[];
}

export interface IPostLeadsPropertyFloorsError {
  message: string;
  statusCode: number;
  error: string;
}
