/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserNotificationsGetApi {
  id?: string;
  title: string;
  message: string;
  user_id: string;
  user_email?: string;
  type: string;
  is_read?: string;
  data: Record<string, any>;
  read_at?: string;
  // created_at?: string;
}

export interface IUserNotificationsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IUserNotificationsPatchApi {
  id: string;
  title: string;
  message: string;
  user_id: string;
  type: string;
  data: string;
  is_read: string;
}

export interface IUserNotificationsPostApi {
  id?: string;
  title: string;
  message: string;
  user_id: string;
  type: string;
  data: Record<string, any>;
  is_read: string;
}
