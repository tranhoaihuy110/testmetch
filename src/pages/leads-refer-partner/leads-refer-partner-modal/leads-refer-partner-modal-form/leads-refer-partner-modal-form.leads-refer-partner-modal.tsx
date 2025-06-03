/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { ILeadsReferPartnerGetApi, ILeadsGetApi } from "../../../../models";
import { searchLeadsReferPartnerApi, searchLeadsApi } from "../../../../services";
import { ILeadsReferPartnerFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

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

export const LeadsReferPartnerFormModal: React.FC<ILeadsReferPartnerFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    mode,
    config,
    children = "",
}) => {
    const [formData, setFormData] = useState<ILeadsReferPartnerGetApi>(
    typeof config === "object" && config !== null
        ? {
            refer_partner_id: config.refer_partner_id || "",
            lead_id: config.lead_id || 0,
            email: config.email || "",
            created_at: config.created_at || "",
            updated_at: config.updated_at || "",
            updated_by: config.updated_by || "",
            json_metadata: processJson(config.json_metadata) || {},
            refer_partner_status: config.refer_partner_status || "",
            trans_value: config.trans_value || "",
        }
        : {
            refer_partner_id: "",
            lead_id: 0,
            email: "",
            created_at: "",
            updated_at: "",
            updated_by: "",
            json_metadata: {},
            refer_partner_status: "",
            trans_value: "",
        }
    );
    const [emailSuggestions, setEmailSuggestions] = useState<ILeadsGetApi[]>([]);
    const [leadIdSuggestions, setLeadIdSuggestions] = useState<ILeadsGetApi[]>(
    []
    );
    const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
    const [showLeadIdSuggestions, setShowLeadIdSuggestions] = useState(false);
    const emailRef = useRef<HTMLDivElement | null>(null);
    const leadIdRef = useRef<HTMLDivElement | null>(null);
    const wasOpenRef = useRef<boolean>(false);

    useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
        console.log("Modal opened in mode:", mode, "with config:", config);
        if ((mode === "edit" || mode === "detail") && config?.refer_partner_id) {
        const fetchLeadsReferPartnerDetails = async () => {
            try {
            const results = await searchLeadsReferPartnerApi({
                page: 1,
                size: 1,
                refer_partner_id: config.refer_partner_id,
            });
            console.log("API results for leads refer partner details:", results);

            if (results && results.length > 0) {
                const fetchedConfig = results[0];
                const newFormData = {
                refer_partner_id:
                    fetchedConfig.refer_partner_id ||
                    config.refer_partner_id ||
                    "",
                lead_id: fetchedConfig.lead_id || config.lead_id || 0,
                email: fetchedConfig.email || config.email || "",
                created_at: fetchedConfig.created_at || config.created_at || "",
                updated_at: fetchedConfig.updated_at || config.updated_at || "",
                updated_by: fetchedConfig.updated_by || config.updated_by || "",
                json_metadata:
                    processJson(fetchedConfig.json_metadata) ||
                    processJson(config.json_metadata) ||
                    {},
                refer_partner_status:
                    fetchedConfig.refer_partner_status ||
                    config.refer_partner_status ||
                    "",
                trans_value:
                    fetchedConfig.trans_value ||
                    config.trans_value ||
                    "",
                };
                setFormData(newFormData);
                console.log("formData updated in edit/detail mode:", newFormData);
            } else {
                const newFormData = {
                refer_partner_id: config.refer_partner_id || "",
                lead_id: config.lead_id || 0,
                email: config.email || "",
                created_at: config.created_at || "",
                updated_at: config.updated_at || "",
                updated_by: config.updated_by || "",
                json_metadata: processJson(config.json_metadata) || {},
                refer_partner_status: config.refer_partner_status || "",
                trans_value: config.trans_value || "",
                };
                setFormData(newFormData);
                console.log(
                "formData set to fallback in edit/detail mode:",
                newFormData
                );
                toast.warn("No data returned from API, using provided data.");
            }
            } catch (error) {
            const newFormData = {
                refer_partner_id: config.refer_partner_id || "",
                lead_id: config.lead_id || 0,
                email: config.email || "",
                created_at: config.created_at || "",
                updated_at: config.updated_at || "",
                updated_by: config.updated_by || "",
                json_metadata: processJson(config.json_metadata) || {},
                refer_partner_status: config.refer_partner_status || "",
                trans_value: config.trans_value || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
            }
        };
        fetchLeadsReferPartnerDetails();
        } else if (isOpen && mode === "add") {
        const defaultFormData = {
            lead_id: 0,
            email: "",
            created_at: "",
            updated_at: "",
            updated_by: "",
            json_metadata: {"":""},
            refer_partner_status: "",
            trans_value: "",
        };
        setFormData(defaultFormData);
        setEmailSuggestions([]);
        setLeadIdSuggestions([]);
        setShowEmailSuggestions(false);
        setShowLeadIdSuggestions(false);
        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emailRef.current &&
        !emailRef.current.contains(event.target as Node)
      ) {
        setShowEmailSuggestions(false);
      }
      if (
        leadIdRef.current &&
        !leadIdRef.current.contains(event.target as Node)
      ) {
        setShowLeadIdSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchEmailSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
        console.log("Empty email search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchLeadsApi({
          page: 1,
          size: 15,
          email: value,
        });
        setEmailSuggestions(results);
        setShowEmailSuggestions(results.length > 0);
        console.log("Search results for email:", results);
        if (results.length === 0) {
          toast.warn("No leads found for the given email.");
        }
      } catch (error) {
        console.error("Error searching leads by email:", error);
        toast.error("Failed to search leads by email.");
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
      }
    }, 500),
    []
  );

  const searchLeadIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setLeadIdSuggestions([]);
        setShowLeadIdSuggestions(false);
        console.log("Empty lead ID search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchLeadsApi({
          page: 1,
          size: 15,
          lead_id: value,
        });
        setLeadIdSuggestions(results);
        setShowLeadIdSuggestions(results.length > 0);
        console.log("Search results for lead ID:", results);
        if (results.length === 0) {
          toast.warn("No leads found for the given lead ID.");
        }
      } catch (error) {
        console.error("Error searching leads by lead ID:", error);
        toast.error("Failed to search leads by lead ID.");
        setLeadIdSuggestions([]);
        setShowLeadIdSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ILeadsReferPartnerGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ILeadsReferPartnerGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "refer_partner_id",
            label: "Refer Partner ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Refer Partner ID",
            value: formData.refer_partner_id,
          } as const,
        ]
      : []),
    {
      name: "email",
      label: "Email",
      type: "text" as const,
      inputType: "email" as const,
      required: true,
      placeholder: "Enter email",
      disabled: mode === "detail",
      value: formData.email ,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "email");
        if (e.target instanceof HTMLInputElement) {
          searchEmailSuggestions(e.target.value);
        }
      },
      suggestions:
        showEmailSuggestions && emailSuggestions.length > 0
          ? emailSuggestions.map((lead) => ({
              value: lead.email || "",
              label: `${lead.email} (Lead ID: ${lead.lead_id})`,
              onSelect: () => {
                const updatedData = {
                  email: lead.email || "",
                  lead_id: lead.lead_id ? Number(lead.lead_id) : 0,
                };
                setFormData((prev) => ({
                  ...prev,
                  email: updatedData.email,
                  lead_id: updatedData.lead_id,
                }));
                setShowEmailSuggestions(false);
                console.log("Selected email suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: emailRef,
      clearable: mode !== "detail" && !!formData.email,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          email: "",
          lead_id: 0,
        }));
        return { email: "", lead_id: 0 };
      },
    } as const,
    {
      name: "lead_id",
      label: "Lead ID",
      type: "text" as const,
      inputType: "number" as const,
      required: true,
      placeholder: "Enter Lead ID",
      disabled: mode === "detail",
      value: formData.lead_id.toString(),
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "lead_id");
        if (e.target instanceof HTMLInputElement) {
          searchLeadIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showLeadIdSuggestions && leadIdSuggestions.length > 0
          ? leadIdSuggestions.map((lead) => ({
              value: lead.lead_id,
              label: `Lead ID: ${lead.lead_id} (Email: ${lead.email})`,
              onSelect: () => {
                const updatedData = {
                  email: lead.email || "",
                  lead_id: lead.lead_id ? Number(lead.lead_id) : 0,
                };
                setFormData((prev) => ({
                  ...prev,
                  email: updatedData.email,
                  lead_id: updatedData.lead_id,
                }));
                setShowLeadIdSuggestions(false);
                console.log("Selected lead ID suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: leadIdRef,
    } as const,
    {
      name: "updated_by",
      label: "Update By",
      type: "text" as const,
      placeholder: "Enter Update By",
      disabled: mode === "detail",
      value: formData.updated_by,
      onChange: (e) => handleInputChange(e, "updated_by"),
    } as const,
    {
        name: "json_metadata",
        label: "JSON Metadata",
        type: "aceEditor" as const,
        placeholder: "Enter JSON metadata {Json Object}",
        disabled: mode === "detail",
        value: JSON.stringify(formData.json_metadata, null, 2),
        onChange: (e) => handleInputChange(e, "json_metadata"),
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
    {
      name: "refer_partner_status",
      label: "Refer Partner Status",
      type: "text" as const,
      placeholder: "Enter Refer Partner Status",
      disabled: mode === "detail",
      value: formData.refer_partner_status,
      onChange: (e) => handleInputChange(e, "refer_partner_status"),
    } as const,
    {
      name: "trans_value",
      label: "Trans Value",
      type: "text" as const,
      placeholder: "Enter Trans Value",
      disabled: mode === "detail",
      value: formData.trans_value,
      onChange: (e) => handleInputChange(e, "trans_value"),
    } as const,
  ];

  console.log("Rendering Leads Refer Partner Form Modal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);
  console.log("Current email suggestions:", emailSuggestions);
  console.log("Current lead ID suggestions:", leadIdSuggestions);

  return (
    <FormModal<ILeadsReferPartnerGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);
          // Validate email
          const email = data.email || "";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            toast.error("Email must be a valid email address.");
            throw new Error("Invalid email");
          }

          

          let jsonMetadata = data.json_metadata || {};
          if (
            typeof data.json_metadata === "string" &&
            data.json_metadata !== ""
          ) {
            try {
              jsonMetadata = JSON.parse(data.json_metadata);
              if (typeof jsonMetadata !== "object" || jsonMetadata === null) {
                toast.error("JSON Metadata must be a valid JSON object.");
                throw new Error("Invalid JSON Metadata");
              }
            } catch (error) {
              toast.error("JSON Metadata must be a valid JSON object.");
              throw new Error("Invalid JSON Metadata");
            }
          }

          const submitData: ILeadsReferPartnerGetApi = {
            refer_partner_id: data.refer_partner_id || undefined,
            lead_id: data.lead_id || 0,
            email: data.email || "",
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
            updated_by: data.updated_by || "",
            json_metadata: jsonMetadata,
            refer_partner_status: data.refer_partner_status || "",
            trans_value: data.trans_value || "",
          };
          console.log("Payload gửi lên API:", submitData);

          await onSubmit(submitData);
console.log("Phản hồi từ API sau khi lưu:", await searchLeadsReferPartnerApi({
  page: 1,
  size: 1,
  refer_partner_id: submitData.refer_partner_id,
}));
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Leads Refer Partner",
        edit: "Edit Leads Refer Partner",
        detail: "Leads Refer Partner Details",
      }}
      description={{
        add: "Create a new Leads Refer Partner with the details below.",
        edit: "Update Leads Refer Partner details to keep information current.",
        detail: "View details of the Leads Refer Partner below.",
      }}
      children={children}
    />
  );
};
