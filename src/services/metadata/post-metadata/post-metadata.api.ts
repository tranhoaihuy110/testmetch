import { MS_API } from "../../api";

export const postMetaDataApi = (value?: Record<string, any>) => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.post<Record<string, any>>(
      "/api/v1/common_metadata_partner/insert-list",
      value
    )
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
