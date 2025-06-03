export interface IAppUserPendingGetApi {
  user_id?: string;
  username: string;
  user_password?: string;
  user_firstname: string;
  user_lastname: string;
  phone_number: string;
  user_gender: string;
  user_email: string;
  date_of_birth: string;
  company_name: string;
  created_at: string;
  verify_code?: string;
  verify_code_expired?: string;
  verify_status: string;
  json_data: Record<string, any> | null;
  otp?: string;
  otp_expired_at?: string;
  job: string;
  expertise: string;
  user_type: string;
}

export interface IAppUserPendingResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IAppUserPendingPatchApi {
  user_id: string;
  user_password: string;
  username: string;
  user_firstname: string;
  user_lastname: string;
  phone_number: string;
  user_gender: string;
  user_email: string;
  date_of_birth: string;
  company_name: string;
  verify_code: string;
  verify_code_expired: string;
  json_data: Record<string, any> | null;
  verify_status: string;
  otp: string;
  otp_expired_at: string;
  job: string;
  expertise: string;
  user_type: string;
}

export interface IAppUserPendingPostApi {
  user_id: string;
  username: string;
  user_password: string;
  user_firstname: string;
  user_lastname: string;
  phone_number: string;
  user_gender: string;
  user_email: string;
  date_of_birth: string;
  company_name: string;
  verify_code: string;
  verify_code_expired: string;
  verify_status: string;
  json_data: Record<string, any> | null;
  otp: string;
  otp_expired_at: string;
  job: string;
  expertise: string;
  user_type: string;
}
