import axios, { AxiosError } from "axios";
import {
  ISortLeadConversionsError,
  ISortLeadConversionsResponse,
  ISortLeadConversionsParams,
} from "./sort-leadconversions.type";
import { ILeadConversionsGetApi } from "../../../models";

export const sortLeadConversionsApi = async (
  params: ISortLeadConversionsParams
): Promise<ILeadConversionsGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  try {
    const response = await axios.get<ISortLeadConversionsResponse>(
      `/leadconversions/v1/list`,
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
    console.log("sort leadconversions response data:", response.data);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<ISortLeadConversionsError>;
    if (err.response?.data) {
      throw err.response.data;
    }
    throw {
      message: "Failed to sort leadconversions",
      statusCode: err.response?.status || 0,
      error: err.message || "Network Error",
    } as ISortLeadConversionsError;
  }
};
