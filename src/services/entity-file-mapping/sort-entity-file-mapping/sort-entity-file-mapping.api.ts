import axios, { AxiosError } from "axios";
import {
  ISortEntityFileMappingError,
  ISortEntityFileMappingResponse,
  ISortEntityFileMappingParams,
} from "./sort-entity-file-mapping.type";
import { IEntityFileMappingGetApi } from "../../../models";

export const sortEntityFileMappingApi = async (
  params: ISortEntityFileMappingParams
): Promise<IEntityFileMappingGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  try {
    const response = await axios.get<ISortEntityFileMappingResponse>(
      `/api/v1/entity-file-mapping/list`,
      {
        params: {
          page: params.page ?? 1,
          size: params.size ?? 10,
          sort: `${params.option},${params.ascDesc}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("sort entity file mapping response data:", response.data);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<ISortEntityFileMappingError>;
    if (err.response?.data) {
      throw err.response.data;
    }
    throw {
      message: "Failed to sort entity file mapping",
      statusCode: err.response?.status || 0,
      error: err.message || "Network Error",
    } as ISortEntityFileMappingError;
  }
};
