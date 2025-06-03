import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { toast } from "react-toastify";
import { ICommonMetadataGetApi } from "../../../../models";
import { CommonMetadataFormModalProps } from "./index";
import {IFormField} from '../../../../components'
export const CommonMetadataFormModal: React.FC<CommonMetadataFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<ICommonMetadataGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        id: config.id || "",
        meta_key: config.meta_key || "",
        meta_values: config.meta_values || "",
        created_at: config.created_at || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        id: "",
        meta_key: "",
        meta_values: "",
        created_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<ICommonMetadataGetApi>[]  = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Metadata ID",
          }as const,
        ]
      : []),
    {
      name: "meta_key",
      label: "Key",
      type: "text" as const,
      required: true,
      placeholder: "Enter metadata key",
      disabled: mode === "detail",
    },
    {
      name: "meta_values",
      label: "Values",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter metadata values",
      rows: 6,
      disabled: mode === "detail",
    },
  ]
  return (
    <FormModal<ICommonMetadataGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(data.meta_key?.trim() ?? "").length) {
          toast.error("Key is required.");
          throw new Error("Missing key");
        }
        if (!(data.meta_values?.trim() ?? "").length) {
          toast.error("Values is required.");
          throw new Error("Missing values");
        }

        const newMetadata: ICommonMetadataGetApi = {
          id: data.id || "",
          meta_key: data.meta_key,
          meta_values: data.meta_values,
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
