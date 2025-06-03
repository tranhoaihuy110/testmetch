import axios, { AxiosError } from "axios";
import {
  ISearchLeadConversionsError,
  ISearchLeadConversionsResponse,
  ISearchLeadConversionsParams,
} from "./search-leadconversions.type";
import { ILeadConversionsGetApi } from "../../../models";

export const searchLeadConversionsApi = async (
  params: ISearchLeadConversionsParams
): Promise<ILeadConversionsGetApi[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token is missing");

  try {
    const queryParams: { [key: string]: string | number | undefined } = {
      page: params.page ?? 1,
      size: params.size ?? 10,
      conversion_id: params.conversion_id,
      lead_id: params.lead_id,
      converted_to: params.converted_to,
      conversion_value: params.conversion_value,
      sort: "created_at,desc",
    };
    if (params.conversion_id) {
      queryParams.user_action = params.conversion_id;
    }

    if (params.from) {
      queryParams.created_at_from = params.from;
    }
    if (params.to) {
      queryParams.created_at_to = params.to;
    }

    const response = await axios.get<ISearchLeadConversionsResponse>(
      `/leadconversions/v1/list`,
      {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("search Lead-Conversions response data:", response.data);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<ISearchLeadConversionsError>;
    if (err.response?.data) {
      throw err.response.data;
    }
    throw {
      message: "Failed to search leadconversions",
      statusCode: err.response?.status || 0,
      error: err.message || "Network Error",
    } as ISearchLeadConversionsError;
  }
};
