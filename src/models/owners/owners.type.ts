
export interface IOwnersGetApi {
  owner_id?: string;
  first_name: string | null;
  last_name: string;
  phone_number: string | null;
  email: string | null;
  address: string | null;
  created_at: string ;
}
export interface IOwnersResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IOwnersPatchApi {
  owner_id?: string;
  first_name: string | null;
  last_name: string;
  phone_number: string | null;
  email: string | null;
  address: string | null;
}

export interface IOwnersPostApi {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  address?: string;
}
 