export interface IGetTotalOwnersError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalOwnersParams {
  owner_id?: string;
  from?: string;
  to?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  address?: string;
}
