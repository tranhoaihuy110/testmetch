import { MS_API } from "../../api";

export const deleteCommonBranchPostcodeApi = (id?: string) => {
  return new Promise<void[]>((resolve, reject) => {
    if (!id) return reject(new Error('Missing ID'));

    MS_API.delete<never[]>(`/api/v1/common-branch-postcode/delete/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => reject());
  });
};
