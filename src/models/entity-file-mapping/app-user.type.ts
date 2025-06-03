export interface IEntityFileMappingGetApi {
  id: string;
  entity_type: string;
  mapping_key: string;
  entity_id: string;
  file_key: string | null;
  file_name: string;
  file_url: string;
  created_at: string;
  updated_at: string;
  metadata: string ;
}

export interface IEntityFileMappingGetApiResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IEntityFileMappingPatchApi {
  id: string;
  entity_type: string;
  mapping_key: string;
  entity_id: string;
  file_key: string | null;
  file_name: string;
  file_url: string;
  metadata: string ;
}

export interface IEntityFileMappingPostApi {
  id: string
  entity_type: string;
  mapping_key: string;
  entity_id: string | null;
  file_key: string | null;
  file_name: string;
  file_url: string;
  metadata: string ;
}
