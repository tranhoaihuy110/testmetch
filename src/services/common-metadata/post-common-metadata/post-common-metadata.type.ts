import { ICommonMetadataResponseApi } from "../../../models";

export interface IPostCommonMetadataResponse {
  data: ICommonMetadataResponseApi[];
}

export interface IPostCommonMetadataError {
  message: string;
  statusCode: number;
  error: string;
}
