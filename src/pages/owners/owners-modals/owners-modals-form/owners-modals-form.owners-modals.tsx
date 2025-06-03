import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { toast } from "react-toastify";
import { IOwnersGetApi } from "../../../../models";
import { OwnersFormModalProps } from "./index";
import {IFormField} from '../../../../components'


export const OwnersFormModal: React.FC<OwnersFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<IOwnersGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        owner_id: config.owner_id || "",
        first_name: config.first_name || "",
        last_name: config.last_name || "",
        email: config.email || "",
        phone_number: config.phone_number || "",
        address: config.address || "",
        created_at: config.created_at || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        owner_id: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        created_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<IOwnersGetApi>[]  = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "owner_id",
            label: "Owner ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Owner ID",
          } as const,
        ]
      : []),
    
    {
      name: "first_name",
      label: "First Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter first name",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter last name",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "email",
      label: "Email",
      type: "text" as const,
      required: true,
      placeholder: "Enter email",
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
      name: "address",
      label: "Address",
      type: "text" as const,
      required: true,
      placeholder: "Enter address",
      rows: 6,
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<IOwnersGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(data.last_name?.trim() ?? "").length) {
          toast.error("Key is required.");
          throw new Error("Missing key");
        }
        
        const newMetadata: IOwnersGetApi = {
          owner_id: data.owner_id || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone_number: data.phone_number || "",
          address: data.address || "",
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
