import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import {
  ILeadsReferPartnerActivityGetApi,
  ILeadsReferPartnerGetApi,
} from "../../../../models";
import {
  searchLeadsReferPartnerActivityApi,
  searchLeadsReferPartnerApi,
} from "../../../../services";
import { ILeadsReferPartnerActivityFormModalProps } from "./index";
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

export const LeadsReferPartnerActivityFormModal: React.FC<
  ILeadsReferPartnerActivityFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<ILeadsReferPartnerActivityGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          refer_partner_id: config.refer_partner_id || "",
          json_metadata: processJson(config.json_metadata) || {},
          user_action: config.user_action || "",
          note: config.note || "",
          status_new: config.status_new || "",
          status_old: config.status_old || "",
          created_at: config.created_at || "",
          updated_at: config.updated_at || "",
        }
      : {
          refer_partner_id: "",
          id: "",
          user_action: "",
          created_at: "",
          updated_at: "",
          json_metadata: {},
          note: "",
          status_new: "",
          status_old: "",
        }
  );
  const [referpartneridSuggestions, setReferpartneridSuggestions] = useState<
    ILeadsReferPartnerGetApi[]
  >([]);
  const [leadIdSuggestions, setLeadIdSuggestions] = useState<
    ILeadsReferPartnerGetApi[]
  >([]);
  const [showReferPartnerIdSuggestions, setShowReferPartnerIdSuggestions] =
    useState(false);

  const referPartnerIdRef = useRef<HTMLDivElement | null>(null);
  const leadIdRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.refer_partner_id) {
        const fetchLeadsReferPartnerActivityDetails = async () => {
          try {
            const results = await searchLeadsReferPartnerActivityApi({
              page: 1,
              size: 1,
              refer_partner_id: config.refer_partner_id,
            });
            console.log(
              "API results for leads refer partner details:",
              results
            );

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                refer_partner_id:
                  fetchedConfig.refer_partner_id ||
                  config.refer_partner_id ||
                  "",
                id: fetchedConfig.id || config.id || "",
                user_action:
                  fetchedConfig.user_action || config.user_action || "",
                created_at: fetchedConfig.created_at || config.created_at || "",
                updated_at: fetchedConfig.updated_at || config.updated_at || "",
                status_old: fetchedConfig.status_old || config.status_old || "",
                status_new: fetchedConfig.status_new || config.status_new || "",
                note: fetchedConfig.note || config.note || "",
                json_metadata:
                  processJson(fetchedConfig.json_metadata) ||
                  processJson(config.json_metadata) ||
                  {},
              };
              setFormData(newFormData);
            } else {
              const newFormData = {
                refer_partner_id: config.refer_partner_id || "",
                id: config.id || "",
                user_action: config.user_action || "",
                note: config.note || "",
                status_new: config.status_new || "",
                status_old: config.status_old || "",
                created_at: config.created_at || "",
                updated_at: config.updated_at || "",
                json_metadata: processJson(config.json_metadata) || {},
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
              id: config.id || "",
              created_at: config.created_at || "",
              updated_at: config.updated_at || "",
              json_metadata: processJson(config.json_metadata) || {},
              user_action: config.user_action || "",
              note: config.note || "",
              status_new: config.status_new || "",
              status_old: config.status_old || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadsReferPartnerActivityDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          refer_partner_id: "",
          id: "",
          email: "",
          created_at: "",
          updated_at: "",
          json_metadata: { "": "" },
          user_action: "",
          note: "",
          status_new: "",
          status_old: "",
        };
        setFormData(defaultFormData);
        setReferpartneridSuggestions([]);
        setLeadIdSuggestions([]);
        setShowReferPartnerIdSuggestions(false);

        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        referPartnerIdRef.current &&
        !referPartnerIdRef.current.contains(event.target as Node)
      ) {
        setShowReferPartnerIdSuggestions(false);
      }
      if (
        leadIdRef.current &&
        !leadIdRef.current.contains(event.target as Node)
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchReferPartnerIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setReferpartneridSuggestions([]);
        setShowReferPartnerIdSuggestions(false);
        console.log("Empty email search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchLeadsReferPartnerApi({
          page: 1,
          size: 15,
          email: value,
        });
        setReferpartneridSuggestions(results);
        setShowReferPartnerIdSuggestions(results.length > 0);
        console.log("Search results for refer_partner_id by email:", results);
        if (results.length === 0) {
          toast.warn("No refer partners found for the given email.");
        }
      } catch (error) {
        console.error("Error searching refer partners by email:", error);
        toast.error("Failed to search refer partners by email.");
        setReferpartneridSuggestions([]);
        setShowReferPartnerIdSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ILeadsReferPartnerActivityGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ILeadsReferPartnerActivityGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "ID",
            value: formData.id,
          } as const,
        ]
      : []),
    ...(mode === "detail"
      ? [
          {
            name: "json_metadata",
            label: "JSON Metadata",
            type: "aceEditor" as const,
            placeholder: "Enter JSON metadata {Json Object}",
            disabled: mode === "detail",
            value: JSON.stringify(formData.json_metadata, null, 2),
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
        ]
      : []),
    {
      name: "refer_partner_id",
      label: "Refer Partner Id",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter email to search refer partner",
      disabled: mode === "detail",
      value: formData.refer_partner_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "refer_partner_id");
        if (e.target instanceof HTMLInputElement) {
          searchReferPartnerIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showReferPartnerIdSuggestions && referpartneridSuggestions.length > 0
          ? referpartneridSuggestions.map((partner) => ({
              value: partner.refer_partner_id || "",
              label: `${partner.email} (Refer Partner ID: ${partner.refer_partner_id})`,
              onSelect: () => {
                const updatedData = {
                  refer_partner_id: partner.refer_partner_id || "",
                  email: partner.email || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  refer_partner_id: updatedData.refer_partner_id,
                  email: updatedData.email,
                }));
                setShowReferPartnerIdSuggestions(false);
                console.log("Selected refer partner suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: referPartnerIdRef,
      clearable: mode !== "detail" && !!formData.refer_partner_id,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          refer_partner_id: "",
          email: "",
        }));
        return { refer_partner_id: "", email: "" };
      },
    } as const,
    {
      name: "user_action",
      label: "User Action",
      type: "text" as const,
      placeholder: "Enter Update By",
      required: true,
      disabled: mode === "detail",
      value: formData.user_action,
      onChange: (e) => handleInputChange(e, "user_action"),
    } as const,

    {
      name: "note",
      label: "Note",
      type: "text" as const,
      placeholder: "Enter Note",
      disabled: mode === "detail",
      value: formData.note,
      onChange: (e) => handleInputChange(e, "note"),
    } as const,
    {
      name: "status_old",
      label: "Status Old",
      type: "text" as const,
      placeholder: "Enter Status Old",
      disabled: mode === "detail",
      required: true,
      value: formData.status_old,
      onChange: (e) => handleInputChange(e, "status_old"),
    } as const,
    {
      name: "status_new",
      label: "Status New",
      type: "text" as const,
      required: true,
      placeholder: "Enter Status New",
      disabled: mode === "detail",
      value: formData.status_new,
      onChange: (e) => handleInputChange(e, "status_new"),
    } as const,
  ];

  console.log(
    "Rendering Leads Refer Partner Form Modal with formData:",
    formData
  );
  console.log("Fields passed to FormModal:", fields);
  console.log(
    "Current refer_partner_id suggestions:",
    referpartneridSuggestions
  );
  console.log("Current lead ID suggestions:", leadIdSuggestions);

  return (
    <FormModal<ILeadsReferPartnerActivityGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

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

          const submitData: ILeadsReferPartnerActivityGetApi = {
            refer_partner_id: data.refer_partner_id || "",
            id: data.id || "",
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
            json_metadata: jsonMetadata,
            user_action: data.user_action || "",
            note: data.note || "",
            status_new: data.status_new || "",
            status_old: data.status_old || "",
          };
          console.log("Payload gửi lên API:", submitData);

          await onSubmit(submitData);
          console.log(
            "Phản hồi từ API sau khi lưu:",
            await searchLeadsReferPartnerActivityApi({
              page: 1,
              size: 1,
              refer_partner_id: submitData.refer_partner_id,
            })
          );
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Leads Refer Partner Activity",
        edit: "Edit Leads Refer Partner Activity",
        detail: "Leads Refer Partner Activity Details",
      }}
      description={{
        add: "Create a new Leads Refer Partner Activity with the details below.",
        edit: "Update Leads Refer Partner Activity details to keep information current.",
        detail: "View details of the Leads Refer Partner Activity below.",
      }}
      children={children}
    />
  );
};
