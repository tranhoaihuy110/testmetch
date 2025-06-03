/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { IPotentialLeadHistorySearchGetApi } from "../../../../models";
import { IPotentialLeadHistorySearchFormModalProps } from "./index";
import {IFormField} from '../../../../components'

const processJson = (data: unknown): Record<string, any> => {
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

export const PotentialLeadHistorySearchFormModal: React.FC<IPotentialLeadHistorySearchFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<IPotentialLeadHistorySearchGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        id: config.id || "",
        username: config.username || "",
        keysearch: config.keysearch || "",
        status_search: config.status_search || "",
        json_data: processJson(config.json_data) || {},
        create_at: config.create_at || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        username: "",
        keysearch: "",
        status_search: "",
        json_data: {},
        create_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      fieldName: keyof IPotentialLeadHistorySearchGetApi
    ) => {
      const { value } = e.target;
      console.log("Input change for field:", fieldName, "value:", value);
      setFormData((prev) => {
        const safePrev: IPotentialLeadHistorySearchGetApi = {
          id: prev?.id ?? "",
          username: prev?.username ?? "",
          keysearch: prev?.keysearch ?? "",
          status_search: prev?.status_search ?? "",
          json_data: prev?.json_data ?? {},
          create_at: prev?.create_at ?? "",
        };
        const newFormData: IPotentialLeadHistorySearchGetApi = {
          ...safePrev,
          [fieldName]: value,
        };
        console.log("formData updated after input change:", newFormData);
        return newFormData;
      });
    };

  const fields: IFormField<IPotentialLeadHistorySearchGetApi>[]  = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: " ID",
          }as const,
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
      name: "keysearch",
      label: "keysearch",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter keysearch",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "status_search",
      label: "status_search",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter status",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "json_data",
      label: "JSON Data",
      type: "aceEditor" as const,
      placeholder: "Enter JSON Data {Json Object}",
      disabled: mode === "detail",
      value: JSON.stringify(formData?.json_data ?? {}, null, 2),
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
    } as const,
  ];

  return (
    <FormModal<IPotentialLeadHistorySearchGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(String(data.username ?? "").trim().length)) {
        throw new Error("Missing key");
}
        if (!(String(data.username ?? "").trim().length)) {
        throw new Error("Missing values");
        }

        const newMetadata: IPotentialLeadHistorySearchGetApi = {
            username: data.username,
            keysearch: data.keysearch,
            status_search: data.status_search,
            json_data: processJson(data.json_data),
            create_at: data.create_at,
        };
        if (mode === "edit" && data.id) {
        newMetadata.id = data.id || undefined;
      }

        await onSubmit(newMetadata);
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New potential lead history search",
        edit: "Edit potential lead history search",
        detail: "potential lead history search Details",
      }}
      description={{
        add: "Create a new potential lead history search with the details below.",
        edit: "Update the potential lead history search details to keep it up-to-date.",
        detail: "View the details of the potential lead history search below.",
      }}
      children={children}
    />
  );
};
