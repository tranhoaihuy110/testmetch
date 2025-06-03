import axios, { AxiosError } from "axios";
import {
  IGetLeadConversionsError,
  IGetLeadConversionsResponse,
  IGetLeadConversionsParams,
} from "./get-leadconversions.type";

export const getLeadConversionsApi = async (
  params: IGetLeadConversionsParams
): Promise<IGetLeadConversionsResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }
    const queryParams: { [key: string]: string | number | undefined } = {
      page: params.page,
      size: params.size,
      sort: "created_at,desc",
    };
    if (params.conversion_id) {
      queryParams.id = params.conversion_id;
    }

    const response = await axios.get(`/leadconversions/v1/list`, {
      params: queryParams,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as IGetLeadConversionsResponse;
  } catch (error) {
    const err = error as AxiosError<IGetLeadConversionsError>;
    if (err.response?.data) {
      throw err.response.data;
    }
    throw {
      message: `Failed to fetch data`,
      statusCode: err.response?.status || 0,
      error: err.message || "Network Error",
    } as IGetLeadConversionsError;
  }
};
