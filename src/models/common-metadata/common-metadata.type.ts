export interface ICommonMetadataGetApi {
  id: string;
  meta_key: string;
  meta_values: string;
  created_at: string;
}

export interface ICommonMetadataResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ICommonMetadataPatchApi {
  id: string;
  meta_key: string;
  meta_values: string;
}

export interface ICommonMetadataPostApi {
  id: string;
  meta_key: string;
  meta_values: string;
}