import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { toast } from "react-toastify";
import { IMartPotentialLeadOrderGetApi } from "../../../../models";
import { MartPotentialLeadOrderFormModalProps } from "./index";
import { IFormField } from "../../../../components";

export const MartPotentialLeadOrderFormModal: React.FC<
  MartPotentialLeadOrderFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<
    IMartPotentialLeadOrderGetApi | undefined
  >(typeof config === "object" && config !== null ? config : undefined);

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        potential_lead_order_id: config.potential_lead_order_id || "",
        full_address: config.full_address || "",
        postal_code: config.postal_code || "",
        username_order: config.username_order || "",
        order_status: config.order_status || "",
        updated_at: config.updated_at || "",
        created_at: config.created_at || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({

        full_address: "",
        postal_code: "",
        username_order: "",
        order_status: "",
        updated_at: "",
        created_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<IMartPotentialLeadOrderGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "potential_lead_order_id",
            label: "Potential Lead Order ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Potential Order ID",
          } as const,
        ]
      : []),
    {
      name: "full_address",
      label: "Full Address",
      type: "text" as const,
      placeholder: "Enter full address",
      disabled: mode === "detail",
    },
    {
      name: "postal_code",
      label: "Postal Code",
      type: "text" as const,
      placeholder: "Enter postal code",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "username_order",
      label: "Username Order",
      type: "text" as const,
      placeholder: "Enter username for order",
      disabled: mode === "detail",
    },
    {
      name: "order_status",
      label: "Order Status",
      type: "text" as const,
      placeholder: "Enter order status",
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<IMartPotentialLeadOrderGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(data.username_order?.trim() ?? "").length) {
          toast.error("Key is required.");
          throw new Error("Missing key");
        }

        const newMetadata: IMartPotentialLeadOrderGetApi = {
          potential_lead_order_id: data.potential_lead_order_id || undefined,
          username_order: data.username_order || "",
          order_status: data.order_status || "",
          full_address: data.full_address || "",
          postal_code: data.postal_code || "",
          updated_at: data.updated_at || "",
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
