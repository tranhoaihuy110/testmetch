/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import {
  ILeadsPropertyRoomsGetApi,
  ILeadsPropertyGetApi,
  ILeadPropertyFloorsGetApi,
} from "../../../../models";
import {
  searchLeadsPropertyRoomsApi,
  searchLeadsPropertyApi,
  searchLeadPropertyFloorsApi,
} from "../../../../services";
import { LeadsPropertyRoomsFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

export const LeadsPropertyRoomsFormModal: React.FC<
  LeadsPropertyRoomsFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<ILeadsPropertyRoomsGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          lead_property_id: config.lead_property_id || "",
          floor_id: config.floor_id || "",
          floor_name: config.floor_name || "",
          room_type: config.room_type || "",
          room_name: config.room_name || "",
          created_at: config.created_at || "",
        }
      : {
          id: "",
          lead_property_id: "",
          floor_id: "",
          floor_name: "",
          room_type: "",
          room_name: "",
          created_at: "",
        }
  );
  const [typeSuggestions, setTypeSuggestions] = useState<
    ILeadPropertyFloorsGetApi[]
  >([]);

  const [propertyEmailSuggestions, setPropertyEmailSuggestions] = useState<
    ILeadsPropertyGetApi[]
  >([]);

  const [showTypeSuggestions, setShowTypeSuggestions] = useState(false);

  const [showPropertyEmailSuggestions, setShowPropertyEmailSuggestions] =
    useState(false);

  const typeRef = useRef<HTMLDivElement | null>(null);
  const propertyemailRef = useRef<HTMLDivElement | null>(null);

  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.id) {
        const fetchLeadPropertyDetails = async () => {
          try {
            const results = await searchLeadsPropertyRoomsApi({
              page: 1,
              size: 1,
              id: config.id,
            });
            console.log(
              "API results for lead property rooms details:",
              results
            );

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                id: fetchedConfig.id || config.id || "",
                lead_property_id:
                  fetchedConfig.lead_property_id ||
                  config.lead_property_id ||
                  "",
                floor_id: fetchedConfig.floor_id || config.floor_id || "",
                floor_name: fetchedConfig.floor_name || config.floor_name || "",
                room_type: fetchedConfig.room_type || config.room_type || "",
                room_name: fetchedConfig.room_name || config.room_name || "",
                created_at: fetchedConfig.created_at || config.created_at || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                id: config.id || "",
                lead_property_id: config.lead_property_id || "",
                floor_id: config.floor_id || "",
                floor_name: config.floor_name || "",
                room_type: config.room_type || "",
                room_name: config.room_name || "",
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
            console.error("Error fetching lead property rooms details:", error);
            toast.error("Failed to fetch lead property rooms details.");
            const newFormData = {
              id: config.id || "",
              lead_property_id: config.lead_property_id || "",
              floor_id: config.floor_id || "",
              floor_name: config.floor_name || "",
              room_type: config.room_type || "",
              room_name: config.room_name || "",
              created_at: config.created_at || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadPropertyDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          lead_property_id: "",
          floor_id: "",
          floor_name: "",
          room_type: "",
          room_name: "",
          created_at: "",
        };
        setFormData(defaultFormData);
        setTypeSuggestions([]);

        setPropertyEmailSuggestions([]);

        setShowTypeSuggestions(false);

        setShowPropertyEmailSuggestions(false);

        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(event.target as Node)) {
        setShowTypeSuggestions(false);
      }
      if (
        propertyemailRef.current &&
        !propertyemailRef.current.contains(event.target as Node)
      ) {
        setShowPropertyEmailSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchTypeSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setTypeSuggestions([]);
        setShowTypeSuggestions(false);
        console.log("Empty type search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchLeadPropertyFloorsApi({
          page: 1,
          size: 15,
          floor_type: value,
        });
        setTypeSuggestions(results);
        setShowTypeSuggestions(results.length > 0);
        console.log("Search results for floor type:", results);
        if (results.length === 0) {
          toast.warn("No Floor Id found for the given type.");
        }
      } catch (error) {
        setTypeSuggestions([]);
        setShowTypeSuggestions(false);
      }
    }, 500),
    []
  );

  const searchLeadPropertyEmailSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setPropertyEmailSuggestions([]);
        setShowPropertyEmailSuggestions(false);
        console.log("Empty property search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchLeadsPropertyApi({
          page: 1,
          size: 15,
          email: value,
        });
        setPropertyEmailSuggestions(results);
        setShowPropertyEmailSuggestions(results.length > 0);
        if (results.length === 0) {
          toast.warn("No lead properties id found for the given email.");
        }
      } catch (error) {
        setPropertyEmailSuggestions([]);
        setShowPropertyEmailSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ILeadsPropertyRoomsGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ILeadsPropertyRoomsGetApi>[] = [
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
    {
      name: "lead_property_id",
      label: "Lead Property Id",
      type: "text" as const,
      inputType: "email" as const,
      required: true,
      placeholder: "Enter Lead Property Email",
      disabled: mode === "detail",
      value: formData.lead_property_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "lead_property_id");
        if (e.target instanceof HTMLInputElement) {
          searchLeadPropertyEmailSuggestions(e.target.value);
        }
      },
      suggestions:
        showPropertyEmailSuggestions && propertyEmailSuggestions.length > 0
          ? propertyEmailSuggestions.map((property) => ({
              value: property.email || "",
              label: `${property.email} (Lead Property ID: ${property.lead_property_id})`,
              onSelect: () => {
                const updatedData = {
                  email: property.email || "",
                  lead_property_id: property.lead_property_id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  email: updatedData.email,
                  lead_property_id: updatedData.lead_property_id,
                }));
                setShowPropertyEmailSuggestions(false);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: propertyemailRef,
      clearable: mode !== "detail" && !!formData.lead_property_id,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          email: "",
          lead_property_id: "",
        }));
        return { email: "", lead_property_id: "" };
      },
    } as const,
    {
      name: "floor_id",
      label: "Floor Id",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter Floor Type",
      disabled: mode === "detail",
      value: formData.floor_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "floor_id");
        if (e.target instanceof HTMLInputElement) {
          searchTypeSuggestions(e.target.value);
        }
      },
      suggestions:
        showTypeSuggestions && typeSuggestions.length > 0
          ? typeSuggestions.map((type) => ({
              value: type.floor_type || "",
              label: `${type.floor_type} (Floor ID: ${type.id})`,
              onSelect: () => {
                const updatedData = {
                  type: type.floor_type || "",
                  floor_id: type.id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  type: updatedData.type,
                  floor_id: updatedData.floor_id,
                }));
                setShowTypeSuggestions(false);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: typeRef,
      clearable: mode !== "detail" && !!formData.floor_id,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          type: "",
          floor_id: "",
        }));
        return { type: "", floor_id: "" };
      },
    } as const,
    {
      name: "floor_name",
      label: "Floor Name",
      type: "text" as const,
      placeholder: "Enter Floor Name",
      disabled: mode === "detail",
      value: formData.floor_name,
      onChange: (e) => handleInputChange(e, "floor_name"),
    } as const,
    {
      name: "room_type",
      label: "Room Type",
      type: "text" as const,
      placeholder: "Enter Room Type",
      disabled: mode === "detail",
      value: formData.room_type,
      onChange: (e) => handleInputChange(e, "room_type"),
    } as const,
    {
      name: "room_name",
      label: "Room Name",
      type: "text" as const,
      placeholder: "Enter Room Name",
      disabled: mode === "detail",
      value: formData.room_name,
      onChange: (e) => handleInputChange(e, "room_name"),
    } as const,
    {
      name: "created_at",
      label: "Created At",
      type: "text" as const,
      placeholder: "Enter Created At",
      disabled: mode === "detail",
      value: formData.created_at,
      onChange: (e) => handleInputChange(e, "created_at"),
    } as const,
  ];

  return (
    <FormModal<ILeadsPropertyRoomsGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);
          const submitData: ILeadsPropertyRoomsGetApi = {
            id: data.id || undefined,
            lead_property_id: data.lead_property_id || "",
            floor_id: data.floor_id || "",
            floor_name: data.floor_name || "",
            room_type: data.room_type || "",
            room_name: data.room_name || "",
            created_at: data.created_at || undefined,
          };
          if (mode === "add" || mode === "edit") {
            delete submitData.created_at;
            delete submitData.floor_name;
          }
          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Property Room",
        edit: "Edit Property Room",
        detail: "Property Room Details",
      }}
      description={{
        add: "Create a new Property Room with the details below.",
        edit: "Update Property Room details to keep information current.",
        detail: "View details of the Property Room below.",
      }}
    />
  );
};
