export interface IGetTotalRentalsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalRentalsParams {
  rental_id?: string;
  from?: string;
  to?: string;
  property_id?: string;
  tenant_name?: string;
  tenant_phone?: string;
  rental_price?: string;
  address?: string;
}
