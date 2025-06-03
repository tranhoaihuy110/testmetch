import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { ILeadPropertyFloorsGetApi } from "../../../../models";
import { LeadsPropertyFloorsFormModalProps } from "./index";
import {IFormField} from '../../../../components'
export const LeadPropertyFloorsFormModal: React.FC<LeadsPropertyFloorsFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<ILeadPropertyFloorsGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        id: config.id || "",
        lead_property_id: config.lead_property_id || "",
        floor_type: config.floor_type || "",
        floor_name: config.floor_name || "",
        created_at: config.created_at || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        lead_property_id: "",
        floor_type: "",
        floor_name: "",
        created_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<ILeadPropertyFloorsGetApi>[]  = [
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
      name: "lead_property_id",
      label: "Lead Property ID",
      type: "text" as const,
      required: true,
      placeholder: "Enter leadProperty Id",
      disabled: mode === "detail",
    },
    {
      name: "floor_type",
      label: "Floor Type",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter Floor Type",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "floor_name",
      label: "Floor name",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter Floor name",
      rows: 6,
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<ILeadPropertyFloorsGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(String(data.lead_property_id ?? "").trim().length)) {
        throw new Error("Missing key");
}
        if (!(String(data.lead_property_id ?? "").trim().length)) {
        throw new Error("Missing values");
        }

        const newMetadata: ILeadPropertyFloorsGetApi = {
            id: data.id || undefined,
            lead_property_id: data.lead_property_id,
            floor_type: data.floor_type,
            floor_name: data.floor_name,
            created_at: data.created_at || "",
        };

        await onSubmit(newMetadata);
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New LeadProperty Floors",
        edit: "Edit LeadProperty Floors",
        detail: "LeadProperty Floors Details",
      }}
      description={{
        add: "Create a new LeadProperty Floors with the details below.",
        edit: "Update the LeadProperty Floors details to keep it up-to-date.",
        detail: "View the details of the LeadProperty Floors below.",
      }}
      children={children}
    />
  );
};
