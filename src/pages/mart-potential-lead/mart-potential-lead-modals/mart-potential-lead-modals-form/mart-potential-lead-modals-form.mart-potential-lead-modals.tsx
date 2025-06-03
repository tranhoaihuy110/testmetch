import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { IMartPotentialLeadGetApi } from "../../../../models";
import { MartPotentialLeadFormModalProps } from "./index";
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



export const MartPotentialLeadFormModal: React.FC<MartPotentialLeadFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<IMartPotentialLeadGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config) {
      setFormData({
        potential_lead_id: config.potential_lead_id || "",
        property_name: config.property_name || "",
        lead_property_type: config.lead_property_type || "",
        description: config.description || "",
        json_address: processJson(config.json_address) || {},
        last_name: config.last_name || "",
        first_name: config.first_name || "",
        email: config.email || "",
        full_address: config.full_address || "",
        phone_number: config.phone_number || "",
        address: config.address || "",
        city: config.city || "",  
        state: config.state || "",
        postal_code: config.postal_code || "",
        country: config.country || "",
        price: config.price || "",
        size: config.size || "",
        created_by: config.created_by || "",
        potential_lead_status: config.potential_lead_status || "",
        potential_lead_assigned_to: config.potential_lead_assigned_to || "",
        add_to_lead: config.add_to_lead || "",
        json_manual_to_lead: processJson(config.json_manual_to_lead ) || {},
        property_type: config.property_type || "",
        created_at: config.created_at || "",
      });
    } else if (isOpen && mode === "add") {
      setFormData({
        potential_lead_id: "",
        property_name: "",
        lead_property_type: "",
        property_type: "",
        first_name: "",
        last_name: "",
        email: "",
        full_address: "",
        phone_number: "",
        description: "",
        json_address: {},
        address: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        price: "",
        size: "",
        created_by: "",
        potential_lead_status: "",
        potential_lead_assigned_to: "",
        add_to_lead: "",
        json_manual_to_lead: {},
        created_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IMartPotentialLeadGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      if (!prev) return prev;
      const newFormData: IMartPotentialLeadGetApi = {
        ...prev,
        [fieldName]: value ?? "",
      };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IMartPotentialLeadGetApi>[]  = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "potential_lead_id",
            label: "Potential Lead ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Potential ID",
          }as const,
        ]
      : []),
    {
      name: "property_name",
      label: "Property Name",
      type: "text" as const,
      placeholder: "Enter property name",
      disabled: mode === "detail",
    },
    {
      name: "lead_property_type",
      label: "Lead Property Type",
      type: "text" as const,
      placeholder: "Enter lead property type",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "json_address",
      label: "JSON Address",
      type: "aceEditor" as const,
      placeholder: "Enter {Json Object}",
      rows: 6,
      disabled: mode === "detail",
      value: JSON.stringify(formData?.json_address, null, 2),
      onChange: (e) => handleInputChange(e, "json_address"),
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
      name: "json_manual_to_lead",
      label: "JSON Manual to Lead",
      type: "aceEditor" as const,
      placeholder: "Enter {Json Object}",
      rows: 6,
      disabled: mode === "detail",
      value: JSON.stringify(formData?.json_manual_to_lead, null, 2),
      onChange: (e) => handleInputChange(e, "json_manual_to_lead"),
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
      name: "property_type",
      label: "Property Type",
      type: "text" as const,
      placeholder: "Enter property type",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text" as const,
      placeholder: "Enter first name",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text" as const,
      placeholder: "Enter last name",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "email",
      label: "Email",
      type: "text" as const,
      placeholder: "Enter email",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "full_address",
      label: "Full Address",
      type: "text" as const,
      placeholder: "Enter full address",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text" as const,
      placeholder: "Enter phone number",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "description",
      label: "Description",
      type: "text" as const,
      placeholder: "Enter description",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "address",
      label: "Address",
      type: "text" as const,
      placeholder: "Enter address",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "city",
      label: "City",
      type: "text" as const,
      placeholder: "Enter city",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "state",
      label: "State",
      type: "text" as const,
      placeholder: "Enter state",
      rows: 6,
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
      name: "country",
      label: "Country",
      type: "text" as const,
      placeholder: "Enter country",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "price",
      label: "Price",
      type: "text" as const,
      placeholder: "Enter price",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "size",
      label: "Size",
      type: "text" as const,
      placeholder: "Enter size",
      rows: 6,
      disabled: mode === "detail",   
    },
    {
      name: "created_by",
      label: "Created By",
      type: "text" as const,
      placeholder: "Enter created by",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "potential_lead_status",
      label: "Potential Lead Status",
      type: "text" as const,
      placeholder: "Enter potential lead status",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "potential_lead_assigned_to",
      label: "Potential Lead Assigned To",
      type: "text" as const,
      placeholder: "Enter potential lead assigned to",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "add_to_lead",
      label: "Add to Lead",
      type: "text" as const,
      placeholder: "Enter add to lead",
      rows: 6,
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<IMartPotentialLeadGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        
        
        const newMetadata: IMartPotentialLeadGetApi = {
          potential_lead_id: data.potential_lead_id || undefined,
          property_name: data.property_name || "",
          lead_property_type: data.lead_property_type || "",
          property_type: data.property_type || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          full_address: data.full_address || "",
          phone_number: data.phone_number || "",
          description: data.description || "",
          json_address: processJson(data.json_address) || {},
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          postal_code: data.postal_code || "",
          country: data.country || "",
          price: data.price || "",
          size: data.size || "",
          created_by: data.created_by || "",
          potential_lead_status: data.potential_lead_status || "",
          potential_lead_assigned_to: data.potential_lead_assigned_to || "",
          add_to_lead: data.add_to_lead || "",
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
