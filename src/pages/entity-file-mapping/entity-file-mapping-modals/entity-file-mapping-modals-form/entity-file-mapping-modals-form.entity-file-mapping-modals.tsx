import React from "react";
import { FormModal } from "../../../../index";
import { IEntityFileMappingGetApi } from "../../../../models";
import { EntityFileMappingFormModalProps } from "./index";
import { IFormField } from "../../../../components";
export const EntityFileMappingFormModal: React.FC<
  EntityFileMappingFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const fields: IFormField<IEntityFileMappingGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Entity ID",
          } as const,
        ]
      : []),
    {
      name: "entity_type",
      label: "Entity Type",
      type: "text" as const,
      required: true,
      placeholder: "Enter entity type",
    },
    {
      name: "mapping_key",
      label: "Mapping Key",
      type: "text" as const,
      required: true,
      placeholder: "Enter mapping key",
    },
    {
      name: "entity_id",
      label: "Entity ID",
      type: "text" as const,
      placeholder: "Enter entity ID",
    },
    {
      name: "file_key",
      label: "File Key",
      type: "text" as const,
      required: true,
      placeholder: "Enter file key",
    },
    {
      name: "file_name",
      label: "File Name",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter file name",
      rows: 5,
    },
    {
      name: "file_url",
      label: "File URL",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter file URL",
      rows: 5,
    },
    {
      name: "metadata",
      label: "Metadata",
      type: "text" as const,
      placeholder: "Enter metadata (optional)",
    },
  ];

  return (
    <FormModal<IEntityFileMappingGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      mode={mode}
      config={config}
      fields={fields}
      title={{
        add: "Add New Entity File Mapping",
        edit: "Edit Entity File Mapping",
        detail: "Entity File Mapping Details",
      }}
      description={{
        add: "Create a new entity file mapping with the details below.",
        edit: "Update the entity file mapping details to keep it up-to-date.",
        detail: "View the details of the entity file mapping below.",
      }}
      children={children}
    />
  );
};
