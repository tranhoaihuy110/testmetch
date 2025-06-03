import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { toast } from "react-toastify";
import { ICommonMetadataFinalGetApi } from "../../../../models";
import { CommonMetadataFinalFormModalProps } from "./index";
import { IFormField } from "../../../../components";
export const CommonMetadataFinalFormModal: React.FC<
  CommonMetadataFinalFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<
    ICommonMetadataFinalGetApi | undefined
  >(typeof config === "object" && config !== null ? config : undefined);

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        id: config.id || "",
        meta_key: config.meta_key || "",
        meta_values: config.meta_values || "",
        created_at: config.created_at || "",
        meta_values_display: config.meta_values_display || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        meta_key: "",
        meta_values: "",
        created_at: "",
        meta_values_display: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<ICommonMetadataFinalGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Metadata ID",
          } as const,
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
    {
      name: "meta_values_display",
      label: "Values Display",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter metadata values display",
      rows: 6,
      disabled: mode === "detail",
    },
  ];
  return (
    <FormModal<ICommonMetadataFinalGetApi>
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

        const newMetadata: ICommonMetadataFinalGetApi = {
          id: data.id || undefined,
          meta_key: data.meta_key,
          meta_values: data.meta_values,
          created_at: data.created_at || "",
          meta_values_display: data.meta_values_display || "",
        };

        await onSubmit(newMetadata);
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Metadata Final",
        edit: "Edit Metadata Final",
        detail: "Metadata Final Details",
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
