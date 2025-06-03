/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import {
  IPropertyOwnerShipGetApi,
  IOwnersGetApi,
  IPropertiesGetApi,
} from "../../../../models";
import {
  searchPropertyOwnerShipApi,
  searchOwnersApi,
  searchPropertiesApi,
} from "../../../../services";
import { PropertyOwnerShipFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";

export const PropertyOwnerShipFormModal: React.FC<
  PropertyOwnerShipFormModalProps
> = ({ isOpen, onClose, onSubmit, mode, config, children = "" }) => {
  const [formData, setFormData] = useState<IPropertyOwnerShipGetApi>(
    typeof config === "object" && config !== null
      ? {
          ownership_id: config.ownership_id || "",
          property_id: config.property_id || "",
          owner_id: config.owner_id || "",
          ownership_percentage: config.ownership_percentage || "",
          start_date: config.start_date || "",
          end_date: config.end_date || "",
          email: config.email || "",
          property_name: config.property_name || "",
        }
      : {
          ownership_id: "",
          property_id: "",
          owner_id: "",
          ownership_percentage: "",
          start_date: "",
          end_date: "",
          email: "",
          property_name: "",
        }
  );
  const [ownerSuggestions, setOwnerSuggestions] = useState<IOwnersGetApi[]>([]);
  const [ownerIdSuggestions, setOwnerIdSuggestions] = useState<IOwnersGetApi[]>(
    []
  );
  const [propertySuggestions, setPropertySuggestions] = useState<
    IPropertiesGetApi[]
  >([]);
  const [propertyIdSuggestions, setPropertyIdSuggestions] = useState<
    IPropertiesGetApi[]
  >([]);
  const [showOwnerSuggestions, setShowOwnerSuggestions] = useState(false);
  const [showOwnerIdSuggestions, setShowOwnerIdSuggestions] = useState(false);
  const [showPropertySuggestions, setShowPropertySuggestions] = useState(false);
  const [showPropertyIdSuggestions, setShowPropertyIdSuggestions] =
    useState(false);

  const ownerRef = useRef<HTMLDivElement | null>(null);
  const ownerIdRef = useRef<HTMLDivElement | null>(null);
  const propertyRef = useRef<HTMLDivElement | null>(null);
  const propertyIdRef = useRef<HTMLDivElement | null>(null);

  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.ownership_id) {
        const fetchLeadPropertyDetails = async () => {
          try {
            const results = await searchPropertyOwnerShipApi({
              page: 1,
              size: 1,
              ownership_id: config.ownership_id,
            });
            console.log("API results for lead property details:", results);

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                ownership_id:
                  fetchedConfig.ownership_id || config.ownership_id || "",
                property_id:
                  fetchedConfig.property_id || config.property_id || "",
                owner_id: fetchedConfig.owner_id || config.owner_id || "",
                ownership_percentage:
                  fetchedConfig.ownership_percentage ||
                  config.ownership_percentage ||
                  "",
                start_date: fetchedConfig.start_date || config.start_date || "",
                end_date: fetchedConfig.end_date || config.end_date || "",
                email: fetchedConfig.email || config.email || "",
                property_name:
                  fetchedConfig.property_name || config.property_name || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                ownership_id: config.ownership_id || "",
                property_id: config.property_id || "",
                owner_id: config.owner_id || "",
                ownership_percentage: config.ownership_percentage || "",
                start_date: config.start_date || "",
                end_date: config.end_date || "",
                email: config.email || "",
                property_name: config.property_name || "",
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
              ownership_id: config.ownership_id || "",
              property_id: config.property_id || "",
              owner_id: config.owner_id || "",
              ownership_percentage: config.ownership_percentage || "",
              start_date: config.start_date || "",
              end_date: config.end_date || "",
              email: config.email || "",
              property_name: config.property_name || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadPropertyDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          ownership_id: "",
          property_id: "",
          owner_id: "",
          ownership_percentage: "",
          start_date: "",
          end_date: "",
          email: "",
          property_name: "",
        };
        setFormData(defaultFormData);
        setOwnerSuggestions([]);
        setOwnerIdSuggestions([]);
        setPropertySuggestions([]);
        setPropertyIdSuggestions([]);
        setShowOwnerSuggestions(false);
        setShowOwnerIdSuggestions(false);
        setShowPropertySuggestions(false);
        setShowPropertyIdSuggestions(false);
        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ownerRef.current &&
        !ownerRef.current.contains(event.target as Node)
      ) {
        setShowOwnerSuggestions(false);
      }
      if (
        ownerIdRef.current &&
        !ownerIdRef.current.contains(event.target as Node)
      ) {
        setShowOwnerIdSuggestions(false);
      }
      if (
        propertyRef.current &&
        !propertyRef.current.contains(event.target as Node)
      ) {
        setShowPropertySuggestions(false);
      }
      if (
        propertyIdRef.current &&
        !propertyIdRef.current.contains(event.target as Node)
      ) {
        setShowPropertyIdSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchOwnerSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setOwnerSuggestions([]);
        setShowOwnerSuggestions(false);
        console.log("Empty email search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchOwnersApi({
          page: 1,
          size: 15,
          email: value,
        });
        setOwnerSuggestions(results);
        setShowOwnerSuggestions(results.length > 0);
        console.log("Search results for email:", results);
        if (results.length === 0) {
          toast.warn("No Owner found for the given email.");
        }
      } catch (error) {
        console.error("Error searching Owner by email:", error);
        toast.error("Failed to search Owner by email.");
        setOwnerSuggestions([]);
        setShowOwnerSuggestions(false);
      }
    }, 500),
    []
  );

  const searchOwnerIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setOwnerIdSuggestions([]);
        setShowOwnerIdSuggestions(false);
        console.log("Empty owner ID search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchOwnersApi({
          page: 1,
          size: 15,
          owner_id: value,
        });
        setOwnerIdSuggestions(results);
        setShowOwnerIdSuggestions(results.length > 0);
        console.log("Search results for owner ID:", results);
        if (results.length === 0) {
          toast.warn("No Owner found for the given owner ID.");
        }
      } catch (error) {
        console.error("Error searching Owner by owner ID:", error);
        toast.error("Failed to search Owner by owner ID.");
        setOwnerIdSuggestions([]);
        setShowOwnerIdSuggestions(false);
      }
    }, 500),
    []
  );

  const searchPropertySuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setPropertySuggestions([]);
        setShowPropertySuggestions(false);
        console.log("Empty property search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchPropertiesApi({
          page: 1,
          size: 15,
          property_name: value,
        });
        setPropertySuggestions(results);
        setShowPropertySuggestions(results.length > 0);
        console.log("Search results for property name:", results);
        if (results.length === 0) {
          toast.warn("No properties found for the given name.");
        }
      } catch (error) {
        console.error("Error searching properties by name:", error);
        toast.error("Failed to search properties by name.");
        setPropertySuggestions([]);
        setShowPropertySuggestions(false);
      }
    }, 500),
    []
  );
  const searchPropertyIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setPropertyIdSuggestions([]);
        setShowPropertyIdSuggestions(false);
        console.log("Empty property ID search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchPropertiesApi({
          page: 1,
          size: 15,
          property_id: value,
        });
        setPropertyIdSuggestions(results);
        setShowPropertyIdSuggestions(results.length > 0);
        console.log("Search results for property ID:", results);
        if (results.length === 0) {
          toast.warn("No leads found for the given property ID.");
        }
      } catch (error) {
        console.error("Error searching leads by property ID:", error);
        toast.error("Failed to search leads by property ID.");
        setPropertyIdSuggestions([]);
        setShowPropertyIdSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IPropertyOwnerShipGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IPropertyOwnerShipGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "ownership_id",
            label: "OwnerShip ID",
            type: "text" as const,
            disabled: true,
            placeholder: "OwnerShip ID",
            value: formData.ownership_id,
          } as const,
        ]
      : []),
    {
      name: "email",
      label: "Email",
      type: "text" as const,
      inputType: "email" as const,
      required: true,
      placeholder: "Enter Owner email",
      disabled: mode === "detail",
      value: formData.email,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "email");
        if (e.target instanceof HTMLInputElement) {
          searchOwnerSuggestions(e.target.value);
        }
      },
      suggestions:
        showOwnerSuggestions && ownerSuggestions.length > 0
          ? ownerSuggestions.map((owner) => ({
              value: owner.email || "",
              label: `${owner.email} (Owner ID: ${owner.owner_id})`,
              onSelect: () => {
                const updatedData = {
                  email: owner.email || "",
                  owner_id: owner.owner_id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  email: updatedData.email,
                  owner_id: updatedData.owner_id,
                }));
                setShowOwnerSuggestions(false);
                console.log("Selected email suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: ownerRef,
      clearable: mode !== "detail" && !!formData.email,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          email: "",
          owner_id: "",
        }));
        return { email: "", owner_id: "" };
      },
    } as const,
    {
      name: "owner_id",
      label: "Owner ID",
      type: "text" as const,
      inputType: "number" as const,
      required: true,
      placeholder: "Enter Owner ID",
      disabled: mode === "detail",
      value: formData.owner_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "owner_id");
        if (e.target instanceof HTMLInputElement) {
          searchOwnerIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showOwnerIdSuggestions && ownerIdSuggestions.length > 0
          ? ownerIdSuggestions.map((owner) => ({
              value: owner.owner_id,
              label: `Owner ID: ${owner.owner_id} (Email: ${owner.email})`,
              onSelect: () => {
                const updatedData = {
                  email: owner.email || "",
                  owner_id: owner.owner_id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  email: updatedData.email,
                  owner_id: updatedData.owner_id,
                }));
                setShowOwnerIdSuggestions(false);
                console.log("Selected Owner ID suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: ownerIdRef,
    } as const,
    {
      name: "property_name",
      label: "Property Name",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter Property Name",
      disabled: mode === "detail",
      value: formData.property_name,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "property_name");
        if (e.target instanceof HTMLInputElement) {
          searchPropertySuggestions(e.target.value);
        }
      },
      suggestions:
        showPropertySuggestions && propertySuggestions.length > 0
          ? propertySuggestions.map((property) => ({
              value: property.property_name || "",
              label: `${property.property_name} (Property ID: ${property.property_id})`,
              onSelect: () => {
                const updatedData = {
                  property_name: property.property_name || "",
                  property_id: property.property_id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  property_name: updatedData.property_name,
                  property_id: updatedData.property_id,
                }));
                setShowPropertySuggestions(false);
                console.log("Selected property name suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: propertyRef,
      clearable: mode !== "detail" && !!formData.property_name,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          property_name: "",
          property_id: "",
        }));
        return { property_name: "", property_id: "" };
      },
    } as const,
    {
      name: "property_id",
      label: "Property ID",
      type: "text" as const,
      inputType: "number" as const,
      required: true,
      placeholder: "Enter Property ID",
      disabled: mode === "detail",
      value: formData.property_id,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "property_id");
        if (e.target instanceof HTMLInputElement) {
          searchPropertyIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showPropertyIdSuggestions && propertyIdSuggestions.length > 0
          ? propertyIdSuggestions.map((property) => ({
              value: property.property_id,
              label: `Owner ID: ${property.property_id} (Name: ${property.property_name})`,
              onSelect: () => {
                const updatedData = {
                  name: property.property_name || "",
                  property_id: property.property_id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  name: updatedData.name,
                  property_id: updatedData.property_id,
                }));
                setShowPropertyIdSuggestions(false);
                console.log("Selected Property ID suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: propertyIdRef,
    } as const,
    
    {
      name: "ownership_percentage",
      label: "Ownership Percentage",
      type: "text" as const,
      placeholder: "Enter Ownership Percentage",
      disabled: mode === "detail",
      value: formData.ownership_percentage,
      onChange: (e) => handleInputChange(e, "ownership_percentage"),
    } as const,
    {
      name: "start_date",
      label: "Start Date",
      type: "text" as const,
      placeholder: "Enter Start Date",
      disabled: mode === "detail",
      value: formData.start_date,
      onChange: (e) => handleInputChange(e, "start_date"),
    } as const,
    {
      name: "end_date",
      label: "End Date",
      type: "text" as const,
      placeholder: "Enter End Date",
      disabled: mode === "detail",
      value: formData.end_date,
      onChange: (e) => handleInputChange(e, "end_date"),
    } as const,
  ];

  return (
    <FormModal<IPropertyOwnerShipGetApi>
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

          const submitData: IPropertyOwnerShipGetApi = {
            ownership_id: data.ownership_id || "",
            property_id: data.property_id || "",
            owner_id: data.owner_id || "",
            ownership_percentage: data.ownership_percentage || "",
            start_date: data.start_date || "",
            end_date: data.end_date || "",
            property_name: data.property_name || "",
            email: data.email || "",
          };

          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Property Owner Ship",
        edit: "Edit Property Owner Ship",
        detail: "Property Owner Ship Details",
      }}
      description={{
        add: "Create a new Property Owner Ship with the details below.",
        edit: "Update Property Owner Ship details to keep information current.",
        detail: "View details of the Property Owner Ship below.",
      }}
      children={children}
    />
  );
};
