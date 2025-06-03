import { MS_API } from "../../api";

export const postEntityFileMappingApi = (value?: Record<string, any>) => {
   return new Promise<Record<string, any>>((resolve, reject) => {
    MS_API.post<Record<string, any>>("/api/v1/entity-file-mapping/insert", value)
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};

