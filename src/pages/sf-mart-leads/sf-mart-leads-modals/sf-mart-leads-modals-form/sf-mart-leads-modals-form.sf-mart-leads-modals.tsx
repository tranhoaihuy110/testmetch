import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { toast } from "react-toastify";
import { ISfMartLeadsGetApi } from "../../../../models";
import { SfMartLeadsFormModalProps } from "./index";
import {IFormField} from '../../../../components'

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

export const SfMartLeadsFormModal: React.FC<SfMartLeadsFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<ISfMartLeadsGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        id: config.id || "",
        username: config.username || "",
        salesforce_id: config.salesforce_id || "",
        data_type: config.data_type || "",
        salesforce_lead_id: config.salesforce_lead_id || "",
        json_data_lv1: processJson(config.json_data_lv1 ) || {},
        json_data_lv2: processJson(config.json_data_lv2 ) || {},
        json_data_lv3: processJson(config.json_data_lv3 ) || {},
        created_at: config.created_at || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        id: "",
        username: "",
        salesforce_id: "",
        data_type: "",
        salesforce_lead_id: "",
        json_data_lv1: {},
        json_data_lv2: {},
        json_data_lv3: {},
        created_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ISfMartLeadsGetApi
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

  const fields: IFormField<ISfMartLeadsGetApi>[]  = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Sf Mart Leads ID",
          }as const,
        ]
      : []),
    {
      name: "username",
      label: "Username",
      type: "text" as const,
      placeholder: "Enter username",
      disabled: mode === "detail",
    },
    {
      name: "salesforce_id",
      label: "Salesforce ID",
      type: "text" as const,
      placeholder: "Enter salesforce ID",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "data_type",
      label: "Data Type",
      type: "text" as const,
      placeholder: "Enter data type",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "salesforce_lead_id",
      label: "Salesforce Lead ID",
      type: "text" as const,
      placeholder: "Enter salesforce lead ID",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "json_data_lv1",
      label: "JSON Data Level 1",
      type: "aceEditor" as const,
      placeholder: "Enter {Json Object}",
      rows: 6,
      disabled: mode === "detail",
      value: JSON.stringify(formData?.json_data_lv1, null, 2),
      onChange: (e) => handleInputChange(e, "json_data_lv1"),
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
    {
      name: "json_data_lv2",
      label: "JSON Data Level 2",
      type: "aceEditor" as const,
      placeholder: "Enter {Json Object}",
      rows: 6,
      disabled: mode === "detail",
      value: JSON.stringify(formData?.json_data_lv2, null, 2),
      onChange: (e) => handleInputChange(e, "json_data_lv2"),
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
    {
      name: "json_data_lv3",
      label: "JSON Data Level 3",
      type: "aceEditor" as const,
      placeholder: "Enter {Json Object}",
      rows: 6,
      disabled: mode === "detail",
      value: JSON.stringify(formData?.json_data_lv3, null, 2),
      onChange: (e) => handleInputChange(e, "json_data_lv3"),
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
    <FormModal<ISfMartLeadsGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(data.username?.trim() ?? "").length) {
          toast.error("Key is required.");
          throw new Error("Missing key");
        }

        const newMetadata: ISfMartLeadsGetApi = {
          id: data.id || undefined,
          username: data.username || "",
          salesforce_id: data.salesforce_id || "",
          data_type: data.data_type || "",
          salesforce_lead_id: data.salesforce_lead_id || "",
          json_data_lv1: processJson(data.json_data_lv1) || {},
          json_data_lv2: processJson(data.json_data_lv2) || {},
          json_data_lv3: processJson(data.json_data_lv3) || {},
          created_at: data.created_at || "",
        };

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
