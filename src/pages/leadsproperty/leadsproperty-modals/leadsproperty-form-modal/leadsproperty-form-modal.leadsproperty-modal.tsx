import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { ILeadsPropertyGetApi, ILeadsGetApi } from "../../../../models";
import { searchLeadsPropertyApi, searchLeadsApi } from "../../../../services";
import { ILeadsPropertyFormModalProps } from "./index";
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

const processUrls = (data: any): { url: string; zoom: number }[] => {
  try {
    if (typeof data === "string") {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        if (
          parsedData.every(
            (item: any) => typeof item === "object" && "url" in item
          )
        ) {
          return parsedData.map((item: any) => ({
            url: item.url || "",
            zoom: typeof item.zoom === "number" ? item.zoom : 1,
          }));
        }
        if (parsedData.every((item: any) => typeof item === "string")) {
          return parsedData.map((url: string) => ({ url, zoom: 1 }));
        }
      }
    }
    if (Array.isArray(data)) {
      if (data.every((item: any) => typeof item === "string")) {
        return data.map((url: string) => ({ url, zoom: 1 }));
      }
      return data.map((item: any) => ({
        url:
          (typeof item === "object" && item !== null ? item.url : item) || "",
        zoom:
          typeof item === "object" &&
          item !== null &&
          typeof item.zoom === "number"
            ? item.zoom
            : 1,
      }));
    }
    if (typeof data === "object" && data !== null) {
      return Object.values(data).map((item: any) => ({
        url:
          (typeof item === "object" && item !== null ? item.url : item) || "",
        zoom:
          typeof item === "object" &&
          item !== null &&
          typeof item.zoom === "number"
            ? item.zoom
            : 1,
      }));
    }
    return [{ url: "", zoom: 1 }];
  } catch (e) {
    console.error("Error parsing URLs:", e);
    return [{ url: "", zoom: 1 }];
  }
};

export const LeadPropertyFormModal: React.FC<ILeadsPropertyFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<ILeadsPropertyGetApi>(
    typeof config === "object" && config !== null
      ? {
          lead_property_id: config.lead_property_id || "",
          lead_id: config.lead_id || 0,
          lead_property_type: config.lead_property_type || "",
          email: config.email || "",
          location_elements: config.location_elements || "",
          address: config.address || "",
          full_address: config.full_address || "",
          city: config.city || "",
          state: config.state || "",
          postal_code: config.postal_code || "",
          country: config.country || "",
          created_at: config.created_at || "",
          updated_at: config.updated_at || "",
          json_metadata: processJson(config.json_metadata) || {},
          lead_property_note: config.lead_property_note || "",
          json_address: processJson(config.json_address) || {},
          property_id: config.property_id || 0,
          longitude: config.longitude || 0,
          latitude: config.latitude || 0,
          ksplat_urls: processUrls(config.ksplat_urls) || [
            { url: "", zoom: 1 },
          ],
          captured_video_urls: processUrls(config.captured_video_urls) || [
            { url: "", zoom: 1 },
          ],
          ["3d_outside_status"]: config["3d_outside_status"] || 0,
          lead_property_stage: config.lead_property_stage || "",
          lead_property_status: config.lead_property_status || "",
          lead_property_sf_id: config.lead_property_sf_id || "",
          location_status: config.location_status || "",
        }
      : {
          lead_property_id: "",
          lead_id: 0,
          lead_property_type: "",
          email: "",
          location_elements: "",
          address: "",
          full_address: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          created_at: "",
          updated_at: "",
          json_metadata: {},
          lead_property_note: "",
          json_address: {},
          property_id: 0,
          longitude: 0,
          latitude: 0,
          ksplat_urls: [{ url: "", zoom: 1 }],
          captured_video_urls: [{ url: "", zoom: 1 }],
          ["3d_outside_status"]: 0,
          lead_property_stage: "",
          lead_property_status: "",
          lead_property_sf_id: "",
          location_status: "",
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
      if ((mode === "edit" || mode === "detail") && config?.lead_property_id) {
        const fetchLeadPropertyDetails = async () => {
          try {
            const results = await searchLeadsPropertyApi({
              page: 1,
              size: 1,
              lead_property_id: config.lead_property_id,
            });
            console.log("API results for lead property details:", results);

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                lead_property_id:
                  fetchedConfig.lead_property_id ||
                  config.lead_property_id ||
                  "",
                lead_id: fetchedConfig.lead_id || config.lead_id || 0,
                lead_property_type:
                  fetchedConfig.lead_property_type ||
                  config.lead_property_type ||
                  "",
                email: fetchedConfig.email || config.email || "",
                location_elements:
                  fetchedConfig.location_elements ||
                  config.location_elements ||
                  "",
                address: fetchedConfig.address || config.address || "",
                full_address:
                  fetchedConfig.full_address || config.full_address || "",
                city: fetchedConfig.city || config.city || "",
                state: fetchedConfig.state || config.state || "",
                postal_code:
                  fetchedConfig.postal_code || config.postal_code || "",
                country: fetchedConfig.country || config.country || "",
                created_at: fetchedConfig.created_at || config.created_at || "",
                updated_at: fetchedConfig.updated_at || config.updated_at || "",
                json_metadata:
                  processJson(fetchedConfig.json_metadata) ||
                  processJson(config.json_metadata) ||
                  {},
                lead_property_note:
                  fetchedConfig.lead_property_note ||
                  config.lead_property_note ||
                  "",
                json_address:
                  processJson(fetchedConfig.json_address) ||
                  processJson(config.json_address) ||
                  {},
                property_id:
                  fetchedConfig.property_id || config.property_id || 0,
                longitude: fetchedConfig.longitude || config.longitude || 0,
                latitude: fetchedConfig.latitude || config.latitude || 0,
                ksplat_urls: processUrls(fetchedConfig.ksplat_urls) ||
                  processUrls(config.ksplat_urls) || [{ url: "", zoom: 1 }],
                captured_video_urls: processUrls(
                  fetchedConfig.captured_video_urls
                ) ||
                  processUrls(config.captured_video_urls) || [
                    { url: "", zoom: 1 },
                  ],
                ["3d_outside_status"]:
                  fetchedConfig["3d_outside_status"] ||
                  config["3d_outside_status"] ||
                  0,
                lead_property_stage:
                  fetchedConfig.lead_property_stage ||
                  config.lead_property_stage ||
                  "",
                lead_property_status:
                  fetchedConfig.lead_property_status ||
                  config.lead_property_status ||
                  "",
                lead_property_sf_id:
                  fetchedConfig.lead_property_sf_id ||
                  config.lead_property_sf_id ||
                  "",
                location_status:
                  fetchedConfig.location_status || config.location_status || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                lead_property_id: config.lead_property_id || "",
                lead_id: config.lead_id || 0,
                lead_property_type: config.lead_property_type || "",
                email: config.email || "",
                location_elements: config.location_elements || "",
                address: config.address || "",
                full_address: config.full_address || "",
                city: config.city || "",
                state: config.state || "",
                postal_code: config.postal_code || "",
                country: config.country || "",
                created_at: config.created_at || "",
                updated_at: config.created_at || "",
                json_metadata: processJson(config.json_metadata) || {},
                lead_property_note: config.lead_property_note || "",
                json_address: processJson(config.json_address) || {},
                property_id: config.property_id || 0,
                longitude: config.longitude || 0,
                latitude: config.latitude || 0,
                ksplat_urls: processUrls(config.ksplat_urls) || [
                  { url: "", zoom: 1 },
                ],
                captured_video_urls: processUrls(
                  config.captured_video_urls
                ) || [{ url: "", zoom: 1 }],
                ["3d_outside_status"]: config["3d_outside_status"] || 0,
                lead_property_stage: config.lead_property_stage || "",
                lead_property_status: config.lead_property_status || "",
                lead_property_sf_id: config.lead_property_sf_id || "",
                location_status: config.location_status || "",
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
              lead_property_id: config.lead_property_id || "",
              lead_id: config.lead_id || 0,
              lead_property_type: config.lead_property_type || "",
              email: config.email || "",
              location_elements: config.location_elements || "",
              address: config.address || "",
              full_address: config.full_address || "",
              city: config.city || "",
              state: config.state || "",
              postal_code: config.postal_code || "",
              country: config.country || "",
              created_at: config.created_at || "",
              updated_at: config.created_at || "",
              json_metadata: processJson(config.json_metadata) || {},
              lead_property_note: config.lead_property_note || "",
              json_address: processJson(config.json_address) || {},
              property_id: config.property_id || 0,
              longitude: config.longitude || 0,
              latitude: config.latitude || 0,
              ksplat_urls: processUrls(config.ksplat_urls) || [
                { url: "", zoom: 1 },
              ],
              captured_video_urls: processUrls(config.captured_video_urls) || [
                { url: "", zoom: 1 },
              ],
              ["3d_outside_status"]: config["3d_outside_status"] || 0,
              lead_property_stage: config.lead_property_stage || "",
              lead_property_status: config.lead_property_status || "",
              lead_property_sf_id: config.lead_property_sf_id || "",
              location_status: config.location_status || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadPropertyDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {

          lead_id: 0,
          lead_property_type: "",
          email: "",
          location_elements: "",
          address: "",
          full_address: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          created_at: "",
          updated_at: "",
          json_metadata: {},
          lead_property_note: "",
          json_address: {},
          property_id: 0,
          longitude: 0,
          latitude: 0,
          ksplat_urls: [{ url: "", zoom: 1 }],
          captured_video_urls: [{ url: "", zoom: 1 }],
          ["3d_outside_status"]: 0,
          lead_property_stage: "",
          lead_property_status: "",
          lead_property_sf_id: "",
          location_status: "",
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
    fieldName: keyof ILeadsPropertyGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ILeadsPropertyGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "lead_property_id",
            label: "Lead Property ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Lead Property ID",
            value: formData.lead_property_id,
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
      name: "lead_property_type",
      label: "Lead Property Type",
      type: "text" as const,
      placeholder: "Enter lead property type",
      disabled: mode === "detail",
      value: formData.lead_property_type,
      onChange: (e) => handleInputChange(e, "lead_property_type"),
    } as const,
    {
      name: "location_elements",
      label: "Location Elements",
      type: "text" as const,
      placeholder: "Enter location elements",
      disabled: mode === "detail",
      value: formData.location_elements,
      onChange: (e) => handleInputChange(e, "location_elements"),
    } as const,
    {
      name: "city",
      label: "City",
      type: "text" as const,
      placeholder: "Enter city",
      disabled: mode === "detail",
      value: formData.city,
      onChange: (e) => handleInputChange(e, "city"),
    } as const,
    {
      name: "state",
      label: "State",
      type: "text" as const,
      placeholder: "Enter state",
      disabled: mode === "detail",
      value: formData.state,
      onChange: (e) => handleInputChange(e, "state"),
    } as const,
    {
      name: "postal_code",
      label: "Postal Code",
      type: "text" as const,
      placeholder: "Enter postal code",
      disabled: mode === "detail",
      value: formData.postal_code,
      onChange: (e) => handleInputChange(e, "postal_code"),
    } as const,
    {
      name: "country",
      label: "Country",
      type: "text" as const,
      placeholder: "Enter country",
      disabled: mode === "detail",
      value: formData.country,
      onChange: (e) => handleInputChange(e, "country"),
    } as const,
    {
      name: "property_id",
      label: "Property ID",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter Property ID",
      disabled: mode === "detail",
      value: formData.lead_property_id?.toString(),
      onChange: (e) => handleInputChange(e, "property_id"),
    } as const,
    {
      name: "longitude",
      label: "Longitude",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter longitude",
      disabled: mode === "detail",
      value: formData.longitude.toString(),
      onChange: (e) => handleInputChange(e, "longitude"),
    } as const,
    {
      name: "latitude",
      label: "Latitude",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter latitude",
      disabled: mode === "detail",
      value: formData.latitude.toString(),
      onChange: (e) => handleInputChange(e, "latitude"),
    } as const,
    {
      name: "3d_outside_status",
      label: "3D Outside Status",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter 3D outside status",
      disabled: mode === "detail",
      value: formData["3d_outside_status"].toString(),
      onChange: (e) => handleInputChange(e, "3d_outside_status"),
    } as const,
    {
      name: "lead_property_stage",
      label: "Lead Property Stage",
      type: "text" as const,
      placeholder: "Enter lead property stage",
      disabled: mode === "detail",
      value: formData.lead_property_stage,
      onChange: (e) => handleInputChange(e, "lead_property_stage"),
    } as const,
    {
      name: "lead_property_status",
      label: "Lead Property Status",
      type: "text" as const,
      placeholder: "Enter lead property status",
      disabled: mode === "detail",
      value: formData.lead_property_status,
      onChange: (e) => handleInputChange(e, "lead_property_status"),
    } as const,
    {
      name: "lead_property_sf_id",
      label: "Lead Property SF ID",
      type: "text" as const,
      placeholder: "Enter Lead Property SF ID",
      disabled: mode === "detail",
      value: formData.lead_property_sf_id,
      onChange: (e) => handleInputChange(e, "lead_property_sf_id"),
    } as const,
    {
      name: "location_status",
      label: "Location Status",
      type: "text" as const,
      placeholder: "Enter location status",
      disabled: mode === "detail",
      value: formData.location_status,
      onChange: (e) => handleInputChange(e, "location_status"),
    } as const,
    {
      name: "address",
      label: "Address",
      type: "textarea" as const,
      placeholder: "Enter address",
      disabled: mode === "detail",
      value: formData.address,
      rows: 4,
      onChange: (e) => handleInputChange(e, "address"),
    } as const,
    {
      name: "full_address",
      label: "Full Address",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter full address",
      disabled: mode === "detail",
      value: formData.full_address,
      rows: 4,
      onChange: (e) => handleInputChange(e, "full_address"),
    } as const,
    {
      name: "lead_property_note",
      label: "Lead Property Note",
      type: "textarea" as const,
      placeholder: "Enter lead property note",
      disabled: mode === "detail",
      value: formData.lead_property_note,
      rows: 4,
      onChange: (e) => handleInputChange(e, "lead_property_note"),
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
      name: "json_address",
      label: "JSON Address",
      type: "aceEditor" as const,
      placeholder: "Enter JSON address {Json Object}",
      disabled: mode === "detail",
      value: JSON.stringify(formData.json_address, null, 2),
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
    } as const,
    {
      name: "ksplat_urls",
      label: "Ksplat URLs",
      type: "urlList" as const,
      placeholder: "Enter Ksplat URL",
      disabled: mode === "detail",
      value: formData.ksplat_urls,
      defaultValue: [{ url: "", zoom: 1 }],
      onChange: (e) => handleInputChange(e, "ksplat_urls"),
    } as const,
    {
      name: "captured_video_urls",
      label: "Captured Video URLs",
      type: "urlList" as const,
      placeholder: "Enter Video URL",
      disabled: mode === "detail",
      value: formData.captured_video_urls,
      defaultValue: [{ url: "", zoom: 1 }],
      onChange: (e) => handleInputChange(e, "captured_video_urls"),
    } as const,
  ];

  console.log("Rendering LeadPropertyFormModal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);
  console.log("Current email suggestions:", emailSuggestions);
  console.log("Current lead ID suggestions:", leadIdSuggestions);

  return (
    <FormModal<ILeadsPropertyGetApi>
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

          // Validate lead_id
          const leadId = Number(data.lead_id) || 0;
          if (!leadId) {
            toast.error("Lead ID must be a valid number greater than 0.");
            throw new Error("Invalid lead ID");
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

          let jsonAddress = data.json_address || {};
          if (
            typeof data.json_address === "string" &&
            data.json_address !== ""
          ) {
            try {
              jsonAddress = JSON.parse(data.json_address);
              if (typeof jsonAddress !== "object" || jsonAddress === null) {
                toast.error("JSON Address must be a valid JSON object.");
                throw new Error("Invalid JSON Address");
              }
            } catch (error) {
              toast.error("JSON Address must be a valid JSON object.");
              throw new Error("Invalid JSON Address");
            }
          }

          const submitData: ILeadsPropertyGetApi = {
            lead_property_id: data.lead_property_id || undefined,
            lead_id: leadId,
            lead_property_type: data.lead_property_type || "",
            email: data.email || "",
            location_elements: data.location_elements || "",
            address: data.address || "",
            full_address: data.full_address || "",
            city: data.city || "",
            state: data.state || "",
            postal_code: data.postal_code || "",
            country: data.country || "",
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
            json_metadata: jsonMetadata,
            lead_property_note: data.lead_property_note || "",
            json_address: jsonAddress,
            property_id: Number(data.property_id) || 0,
            longitude: Number(data.longitude) || 0,
            latitude: Number(data.latitude) || 0,
            ksplat_urls: data.ksplat_urls || [{ url: "", zoom: 1 }],
            captured_video_urls: data.captured_video_urls || [
              { url: "", zoom: 1 },
            ],
            ["3d_outside_status"]: Number(data["3d_outside_status"]) || 0,
            lead_property_stage: data.lead_property_stage || "",
            lead_property_status: data.lead_property_status || "",
            lead_property_sf_id: data.lead_property_sf_id || "",
            location_status: data.location_status || "",
          };

          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Lead Property",
        edit: "Edit Lead Property",
        detail: "Lead Property Details",
      }}
      description={{
        add: "Create a new Lead Property with the details below.",
        edit: "Update Lead Property details to keep information current.",
        detail: "View details of the Lead Property below.",
      }}
      children={children}
    />
  );
};
