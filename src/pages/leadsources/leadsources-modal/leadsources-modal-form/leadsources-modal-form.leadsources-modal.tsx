/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { ILeadsourcesGetApi } from "../../../../models";
import { ILeadsourcesFormModalProps } from "./index";
import {IFormField} from '../../../../components'

export const LeadsourcesFormModal: React.FC<ILeadsourcesFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<ILeadsourcesGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        source_id: config.source_id || "",
        source_name: config.source_name || "",
        description: config.description || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        source_name: "",
        description: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<ILeadsourcesGetApi>[]  = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "source_id",
            label: "Source Id",
            type: "text" as const,
            disabled: true,
            placeholder: " Source Id",
          }as const,
        ]
      : []),
    {
      name: "source_name",
      label: "source name",
      type: "text" as const,
      required: true,
      placeholder: "Enter source name",
      disabled: mode === "detail",
    },
    {
      name: "description",
      label: "description",
      type: "textarea" as const,
    //   required: true,
      placeholder: "Enter description",
      rows: 6,
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<ILeadsourcesGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(String(data.source_name ?? "").trim().length)) {
        throw new Error("Missing key");
}
        if (!(String(data.source_name ?? "").trim().length)) {
        throw new Error("Missing values");
        }

        const newMetadata: ILeadsourcesGetApi = {
            source_name: data.source_name,
            description: data.description,
        };
        if (mode === "edit" && data.source_id) {
        newMetadata.source_id = data.source_id;
      }

        await onSubmit(newMetadata);
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New leadsource ",
        edit: "Edit leadsource ",
        detail: " leadsource  Details",
      }}
      description={{
        add: "Create a new leadsource with the details below.",
        edit: "Update the leadsource details to keep it up-to-date.",
        detail: "View the of the leadsource below.",
      }}
      children={children}
    />
  );
};
