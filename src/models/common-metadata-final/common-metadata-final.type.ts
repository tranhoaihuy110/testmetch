export interface ICommonMetadataFinalGetApi {
  id?: string;
  meta_key: string;
  meta_values: string;
  created_at: string;
  meta_values_display: string;
}

export interface ICommonMetadataFinalResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ICommonMetadataFinalPatchApi {
  id: string;
  meta_key: string;
  meta_values: string;
  meta_values_display: string;
}

export interface ICommonMetadataFinalPostApi {
  id?: string;
  meta_key: string;
  meta_values: string;
  created_at: string;
  meta_values_display: string;
}