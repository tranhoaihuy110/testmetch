/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { ILeadAssignmentGetApi, ILeadsGetApi } from "../../../../models";
import { searchLeadAssignmentApi, searchLeadsApi } from "../../../../services";
import { LeadAssignmentFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

export const LeadAssignmentFormModal: React.FC<LeadAssignmentFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
    const [formData, setFormData] = useState<ILeadAssignmentGetApi>(
    typeof config === "object" && config !== null
        ? {
            assignment_id: config.assignment_id || "",
            lead_id: config.lead_id || "",
            email: config.email || "",
            assigned_to_id: config.assigned_to_id || "",
            assigned_to: config.assigned_to || "",
            assigned_date: config.assigned_date || "",
        }
        : {
            assignment_id: "",
            lead_id: "",
            email: "",
            assigned_to_id: "",
            assigned_to: "",
            assigned_date: "",
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
      if ((mode === "edit" || mode === "detail") && config?.assignment_id) {
        const fetchLeadAssignmentDetails = async () => {
          try {
            const results = await searchLeadAssignmentApi({
              page: 1,
              size: 1,
              assignment_id: config.assignment_id,
            });
            console.log("API results for lead assignment details:", results);

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                assignment_id:
                  fetchedConfig.assignment_id ||
                  config.assignment_id ||
                  "",
                lead_id: fetchedConfig.lead_id || config.lead_id || "",
                email: fetchedConfig.email || config.email || "",
                assigned_to_id:
                  fetchedConfig.assigned_to_id ||
                  config.assigned_to_id ||
                  "",
                assigned_to: fetchedConfig.assigned_to || config.assigned_to || "",
                assigned_date:
                  fetchedConfig.assigned_date || config.assigned_date || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                assignment_id: config.assignment_id || "",
                lead_id: config.lead_id || "",
                email: config.email || "",
                assigned_to_id: config.assigned_to_id || "",
                assigned_to: config.assigned_to || "",
                assigned_date: config.assigned_date || "",
              };
              setFormData(newFormData);
              console.log(
                "formData set to fallback in edit/detail mode:",
                newFormData
              );
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            console.error("Error fetching lead property details:", error);
            toast.error("Failed to fetch lead property details.");
            const newFormData = {
              assignment_id: config.assignment_id || "",
              lead_id: config.lead_id || "",
              email: config.email || "",
              assigned_to_id: config.assigned_to_id || "",
              assigned_to: config.assigned_to || "",
              assigned_date: config.assigned_date || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadAssignmentDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          lead_id: "",
          email: "",
          assigned_to_id: "",
          assigned_to: "",
          assigned_date: "",
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
    fieldName: keyof ILeadAssignmentGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ILeadAssignmentGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "assignment_id",
            label: "Lead Assignment ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Lead Assignment ID",
            value: formData.assignment_id,
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
                  lead_id: lead.lead_id ? String(lead.lead_id) : "",
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
          lead_id: "",
        }));
        return { email: "", lead_id: "" };
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
                  lead_id: lead.lead_id ? String(lead.lead_id) : "",
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
      name: "assigned_to_id",
      label: "Assigned To ID",
      type: "text" as const,
      placeholder: "Enter Assigned To ID",
      disabled: mode === "detail",
      value: formData.assigned_to_id,
      onChange: (e) => handleInputChange(e, "assigned_to_id"),
    } as const,
    {
      name: "assigned_to",
      label: "Assigned To",
      type: "text" as const,
      placeholder: "Enter assigned to",
      disabled: mode === "detail",
      value: formData.assigned_to,
      onChange: (e) => handleInputChange(e, "assigned_to"),
    } as const,
  ];

  console.log("Rendering Lead Assignment FormModal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);
  console.log("Current email suggestions:", emailSuggestions);
  console.log("Current lead ID suggestions:", leadIdSuggestions);

  return (
    <FormModal<ILeadAssignmentGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);
          const email = data.email || "";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            toast.error("Email must be a valid email address.");
            throw new Error("Invalid email");
          }
          const leadId = Number(data.lead_id) || 0;
          if (!leadId) {
            toast.error("Lead ID must be a valid number greater than 0.");
            throw new Error("Invalid lead ID");
          }

          const submitData: ILeadAssignmentGetApi = {
            assignment_id: data.assignment_id || undefined,
            lead_id: data.lead_id || "",
            assigned_to_id: data.assigned_to_id || "",
            assigned_to: data.assigned_to || "",
          };

          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Lead Assignment",
        edit: "Edit Lead Assignment",
        detail: "Lead Assignment Details",
      }}
      description={{
        add: "Create a new Lead Assignment with the details below.",
        edit: "Update Lead Assignment details to keep information current.",
        detail: "View details of the Lead assignment below.",
      }}
      children={children}
    />
  );
};
