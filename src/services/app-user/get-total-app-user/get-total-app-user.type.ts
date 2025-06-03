export interface IGetTotalAppUserError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalAppUserParams {
  user_id?: string;
  from?: string;
  to?: string;
  user_email?:string
  phone_number?:string
  username?:string 
}
