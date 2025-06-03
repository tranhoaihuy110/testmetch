import { IEntityFileMappingPatchApi } from "../../../models";

export interface IPatchEntityFileMappingResponse {
  data: IEntityFileMappingPatchApi[];
}

export interface IPatchEntityFileMappingError {
  message: string;
  statusCode: number;
  error: string;
}
