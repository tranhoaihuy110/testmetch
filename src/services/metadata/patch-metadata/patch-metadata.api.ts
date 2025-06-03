import { MS_API } from "../../api";

export const patchMetaDataApi = (value?: Record<string, any>) => {
  const { id, ...payload } = value || {};
  if (!id) {
    return Promise.reject(new Error("id is required for update"));
  }
  return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.patch(
      `/api/v1/common_metadata_partner/list/${id}`,
      payload
    )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
