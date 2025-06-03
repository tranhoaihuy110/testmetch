export interface IUserProfileUrlMapGetApi {
  id?: string;
  email: string;
  profile_url: string;
  profile_image: string;
}

export interface IUserProfileUrlMapResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IUserProfileUrlMapPatchApi {
  id: string;
  email: string;
  profile_url: string;
  profile_image: string;
}

export interface IUserProfileUrlMapPostApi {
  email: string;
  profile_url: string;
  profile_image: string;
}
