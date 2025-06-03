
export interface IRentalsGetApi {
      rental_id: string,
      property_id: string,
      property_name : string,
      tenant_name: string,
      tenant_phone: string,
      tenant_email: string,
      rental_start_date: string,
      rental_end_date: string,
      rental_price: string,
      deposit: string,
      created_at: string
}
export interface IRentalsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IRentalsPatchApi {
      rental_id: string,
      property_id: string,
      tenant_name: string,
      tenant_phone: string,
      tenant_email: string,
      rental_start_date: string,
      rental_end_date: string,
      rental_price: string,
      deposit: string,
}

export interface IRentalsPostApi {
      property_id: string,
      tenant_name: string,
      tenant_phone: string,
      tenant_email: string,
      rental_start_date: string,
      rental_end_date: string,
      rental_price: string,
      deposit: string,
}
