/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { ILeadNotesGetApi, ILeadsGetApi } from "../../../../models";
import { searchLeadNotesApi, searchLeadsApi } from "../../../../services";
import { ILeadNotesFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

export const LeadNotesFormModal: React.FC<ILeadNotesFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<ILeadNotesGetApi>(
    typeof config === "object" && config !== null
      ? {
          note_id: config.note_id || "",
          lead_id: config.lead_id || 0,
          note_text: config.note_text || "",
          email: config.email || "",
          created_at: config.created_at || "",
        }
      : {
          note_id: "",
          lead_id: 0,
          note_text: "",
          email: "",
          created_at: "",
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
      if ((mode === "edit" || mode === "detail") && config?.note_id) {
        const fetchLeadPropertyDetails = async () => {
          try {
            const results = await searchLeadNotesApi({
              page: 1,
              size: 1,
              note_id: config.note_id,
            });
            console.log("API results for lead property details:", results);

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                note_id:
                  fetchedConfig.note_id ||
                  config.note_id ||
                  "",
                lead_id: (fetchedConfig.lead_id || config.lead_id || 0),
                note_text:
                  fetchedConfig.note_text ||
                  config.note_text ||
                  "",
                email: fetchedConfig.email || config.email || "",
                created_at:
                  fetchedConfig.created_at ||
                  config.created_at ||
                  "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                note_id: config.note_id || "",
                lead_id: config.lead_id || 0,
                note_text: config.note_text || "",
                email: config.email || "",
                created_at: config.created_at || "",
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
              note_id: config.note_id || "",
              lead_id: config.lead_id || 0,
              note_text: config.note_text || "",
              email: config.email || "",
              created_at: config.created_at || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadPropertyDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          lead_id: 0,
          note_text: "",
          email: "",
          created_at: "",
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
        setLeadIdSuggestions([]);
        setShowLeadIdSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ILeadNotesGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ILeadNotesGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "note_id",
            label: "note_id",
            type: "text" as const,
            disabled: true,
            placeholder: "note_id",
            value: formData.note_id,
          } as const,
        ]
      : []),
      ...( mode === "add"
      ? [
            {
      name: "email",
      label: "Email",
      type: "text" as const,
      inputType: "email" as const,
      required: true,
      placeholder: "Enter email",
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
                   lead_id: Number(lead.lead_id), 
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
      clearable: mode == "add" && !!formData.email,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          email: "",
          lead_id: 0,
        }));
        return { email: "", lead_id: 0 };
      },
    } as const,
        ]
      : []),
    {
      name: "lead_id",
      label: "Lead ID",
      type: "text" as const,
      inputType: "number" as const,
      required: true,
      placeholder: "Enter Lead ID",
      disabled: mode === "detail",
      value: formData.lead_id !== undefined && formData.lead_id !== null ? formData.lead_id.toString(): "",
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
                  lead_id: Number(lead.lead_id) || 0,
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
      name: "note_text",
      label: "note_text",
      type: "text" as const,
      placeholder: "Enter lead property type",
      disabled: mode === "detail",
      value: formData.note_text,
      onChange: (e) => handleInputChange(e, "note_text"),
    } as const,
  ];

  console.log("Rendering LeadPropertyFormModal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);
  console.log("Current email suggestions:", emailSuggestions);
  console.log("Current lead ID suggestions:", leadIdSuggestions);

  return (
    <FormModal<ILeadNotesGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {

          // Validate lead_id
          const leadId = Number(data.lead_id) || 0;
          if (!leadId) {
            throw new Error("Invalid lead ID");
          }


          const submitData: ILeadNotesGetApi = {
            note_id: data.note_id || undefined,
            lead_id: leadId || 0,
            note_text: data.note_text || "",
            email: data.email || "",
            created_at: data.created_at || "",
          };

          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Lead Note",
        edit: "Edit Lead Note",
        detail: "Lead Note Details",
      }}
      description={{
        add: "Create a new Lead Note with the details below.",
        edit: "Update Lead Note details to keep information current.",
        detail: "View details of the Lead Note below.",
      }}
      children={children}
    />
  );
};
