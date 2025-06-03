import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { toast } from "react-toastify";
import {
  IAppUserPendingGetApi,
  IAppUserPendingPostApi,
} from "../../../../models";
import { AppUserPendingFormModalProps } from "./index";
import { IFormField } from "../../../../components";

const processJson = (data: any): Record<string, any> => {
  try {
    if (typeof data === "string") {
      return JSON.parse(data) || {};
    }
    return data || {};
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return {};
  }
};

export const AppUserPendingFormModal: React.FC<
  AppUserPendingFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<IAppUserPendingGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        user_id: config.user_id || "",
        username: config.username || "",
        user_firstname: config.user_firstname || "",
        user_lastname: config.user_lastname || "",
        user_password: config.user_password || "",
        phone_number: config.phone_number || "",
        user_gender: config.user_gender || "",
        user_email: config.user_email || "",
        date_of_birth: config.date_of_birth || "",
        verify_code: config.verify_code || undefined,
        company_name: config.company_name || "",
        created_at: config.created_at || "",
        verify_code_expired: config.verify_code_expired || "",
        verify_status: config.verify_status || "",
        otp: config.otp || undefined,
        json_data: processJson(config.json_data) || {},
        otp_expired_at: config.otp_expired_at || undefined,
        job: config.job || "",
        expertise: config.expertise || "",
        user_type: config.user_type || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        username: "",
        user_firstname: "",
        user_lastname: "",
        user_password: "",
        phone_number: "",
        user_gender: "",
        user_email: "",
        date_of_birth: "",
        company_name: "",
        created_at: "",
        verify_code: "",
        verify_code_expired: "",
        verify_status: "",
        otp: "",
        json_data: {"":""},
        otp_expired_at: "",
        job: "",
        expertise: "",
        user_type: "",
      });
    }
  }, [isOpen, mode, config]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IAppUserPendingGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      if (!prev) return prev;
      const newFormData = {
        ...prev,
        [fieldName]: value ?? "",
      };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IAppUserPendingGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "user_id",
            label: "User ID",
            type: "text" as const,
            disabled: true,
            placeholder: "App User Pending ID",
          } as const,
        ]
      : []),
    ...(mode === "add"
      ? [
          {
            name: "user_password",
            label: "User Password",
            type: "text" as const,
            disabled: false,
            placeholder: "App User Pending password",
          } as const,
        ]
      : []),
    {
      name: "username",
      label: "Username",
      type: "text" as const,
      required: true,
      placeholder: "Enter username",
      disabled: mode === "detail",
    },

    {
      name: "user_firstname",
      label: "User Firstname",
      type: "text" as const,
      required: true,
      placeholder: "Enter user firstname",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "user_lastname",
      label: "User Lastname",
      type: "text" as const,
      required: true,
      placeholder: "Enter user lastname",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text" as const,
      required: true,
      placeholder: "Enter phone number",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "user_gender",
      label: "User Gender",
      type: "text" as const,
      required: true,
      placeholder: "Enter user gender",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "user_email",
      label: "User Email  ",
      type: "text" as const,
      required: true,
      placeholder: "Enter user email",
      rows: 6,
      disabled: mode === "detail",
    },
    ...(mode === "add" || mode === "detail"
      ? [
          {
            name: "otp_expired_at",
            label: "OTP Expired At",
            type: "text" as const,
            placeholder: "Enter OTP expired at",
            rows: 6,
            disabled: mode === "detail",
          } as const,
          {
            name: "verify_code",
            label: "Verify Code",
            type: "text" as const,
            required: true,
            placeholder: "Enter verify code",
            rows: 6,
            disabled: mode === "detail",
          } as const,

          {
            name: "otp",
            label: "OTP",
            type: "text" as const,
            required: true,
            placeholder: "Enter OTP",
            rows: 6,
            disabled: mode === "detail",
          } as const,
        ]
      : []),

    {
      name: "verify_code_expired",
      label: "Date of Birth",
      type: "text" as const,
      placeholder: "Enter date of birth",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "verify_status",
      label: "Verify Status",
      type: "text" as const,
      placeholder: "Enter verify status",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "job",
      label: "Job",
      type: "text" as const,
      placeholder: "Enter job",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "user_type",
      label: "User Type",
      type: "text" as const,
      required: true,
      placeholder: "Enter user type",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "expertise",
      label: "Expertise",
      type: "array" as const,
      placeholder: "Enter expertise",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "json_data",
      label: "JSON Data",
      type: "aceEditor" as const,
      required: true,
      placeholder: "Enter {Json Object}",
      rows: 6,
      disabled: mode === "detail",
      value: JSON.stringify(formData?.json_data, null, 2),
      onChange: (e) => handleInputChange(e, "json_data"),
      aceOptions: {
        mode: "json",
        theme: "github",
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        fontSize: 14,
        height: "150px",
      },
    },
  ];

  return (
    <FormModal<IAppUserPendingGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(data.username?.trim() ?? "").length) {
          toast.error("Key is required.");
          throw new Error("Missing key");
        }

        const newMetadata: IAppUserPendingGetApi = {
          user_id: data.user_id || undefined,
          created_at: data.created_at || "",
          username: data.username || "",
          user_password: data.user_password || undefined,
          user_firstname: data.user_firstname || "",
          user_lastname: data.user_lastname || "",
          phone_number: data.phone_number || "",
          user_gender: data.user_gender || "",
          user_email: data.user_email || "",
          company_name: data.company_name || "",
          date_of_birth: data.date_of_birth || "",
          verify_code: data.verify_code || undefined,
          verify_status: data.verify_status || "",
          user_type: data.user_type || "",
          expertise: data.expertise || "",
          otp_expired_at: data.otp_expired_at || undefined,
          job: data.job || "",
          otp: data.otp || undefined,
          json_data: processJson(data.json_data) || {},
        };

        if (mode === "edit") {
          delete newMetadata.otp;
          delete newMetadata.otp_expired_at;
          delete newMetadata.verify_code;
        }

        await onSubmit(newMetadata);
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Metadata",
        edit: "Edit Metadata",
        detail: "Metadata Details",
      }}
      description={{
        add: "Create a new metadata with the details below.",
        edit: "Update the metadata details to keep it up-to-date.",
        detail: "View the details of the metadata below.",
      }}
      children={children}
    />
  );
};
