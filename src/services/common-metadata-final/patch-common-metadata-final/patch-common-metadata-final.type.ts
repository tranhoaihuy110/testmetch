import { ICommonMetadataFinalPatchApi } from "../../../models";

export interface IPatchCommonMetadataFinalResponse {
  data: ICommonMetadataFinalPatchApi[];
}

export interface IPatchCommonMetadataFinalError {
  message: string;
  statusCode: number;
  error: string;
}
