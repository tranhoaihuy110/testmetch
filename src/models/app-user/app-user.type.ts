export interface IAppUserGetApi {
  user_id: string;
  username: string;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_fullname: string;
  phone_number: string;
  user_gender: string | null;
  user_avatar: string | null;
  date_of_birth: string | null;
  job: string | null;
  user_status: number;
  created_at: string;
  updated_at: string;
  group_id: string | null;
  user_session: string;
  parent_id: string | null;
  province_id: string | null;
  district_id: string | null;
  ward_id: string | null;
  object_id: string | null;
  user_type: string;
  department: string | null;
  department_code: string | null;
  language_session: string | null;
  rank: string | null;
  company_name: string | null;
  date_start_work: string | null;
  profession: string | null;
  job_title: string | null;
  manager_email: string | null;
  is_head: string;
  department_v2: string | null;
  department_level2: string | null;
  test_mh: string | null;
  otp: string | null;
  otp_expired_at: string | null;
  json_data: string | null;
  keycloak_id: string;
  salesforce_id: string | null;
  salesforce_token: string | null;
  expertise: string | null;
  fcm_token: string | null;
  profile_url: string | null;
  partner_code: string | null;
  auth_provider: string | null;
}

export interface IAppUserResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IAppUserPatchApi {
  user_id: string,
  user_email: string;
  username: string;
  user_firstname: string;
  user_lastname: string;
  user_status: number;
  phone_number: string;
}
