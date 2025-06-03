/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from "axios";
import {
  IPatchLeadConversionsError,
  IPatchLeadConversionsResponse,
} from "./patch-leadconversions.type";
import { ILeadConversionsPatchApi } from "../../../models";

export const patchLeadConversionsApi = async (
  leadconversions_id: Partial<ILeadConversionsPatchApi>
): Promise<IPatchLeadConversionsResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    if (!leadconversions_id.conversion_id) {
      throw new Error("ID is required for update");
    }

    const { conversion_id, ...payload } = leadconversions_id;
    const formattedPayload = {
      ...payload,
    };

    const response = await axios.patch(
      `/leadconversions/v1/update/${leadconversions_id.conversion_id}`,
      formattedPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as IPatchLeadConversionsResponse;
  } catch (error) {
    const err = error as AxiosError<IPatchLeadConversionsError>;
    if (err.response?.data) {
      throw err.response.data;
    }
    throw {
      message: "Failed to update leadconversions",
      statusCode: err.response?.status || 0,
      error: err.message || "Network Error",
    } as IPatchLeadConversionsError;
  }
};
