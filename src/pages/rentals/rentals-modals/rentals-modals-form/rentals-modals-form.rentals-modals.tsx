import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { IRentalsGetApi, IPropertiesGetApi } from "../../../../models";
import { searchRentalsApi, searchPropertiesApi } from "../../../../services";
import { IRentalsFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";


export const RentalsFormModal: React.FC<IRentalsFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<IRentalsGetApi>(
    typeof config === "object" && config !== null
      ? {
          rental_id: config.rental_id || "",
          property_id: config.property_id || "",
          property_name: config.property_name || "",
          tenant_name: config.tenant_name || "",
          tenant_phone: config.tenant_phone || "",
          tenant_email: config.tenant_email || "",
          rental_start_date: config.rental_start_date || "",
          rental_end_date: config.rental_end_date || "",
          rental_price: config.rental_price || "",
          deposit: config.deposit || "",
          created_at: config.created_at || "",
        }
      : {
          rental_id: "",
          property_id: "",
          property_name: "",
          tenant_name: "",
          tenant_phone: "",
          tenant_email: "",
          rental_start_date: "",
          rental_end_date: "",
          rental_price: "",
          deposit: "",
          created_at: "",
        }
  );
  const [nameSuggestions, setNameSuggestions] = useState<IPropertiesGetApi[]>([]);
  const [PropertyIdSuggestions, setPropertyIdSuggestions] = useState<IPropertiesGetApi[]>(
    []
  );
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);
  const [showPropertyIdSuggestions, setShowPropertyIdSuggestions] = useState(false);
  const nameRef = useRef<HTMLDivElement | null>(null);
  const propertyIdRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.rental_id) {
        const fetchLeadPropertyDetails = async () => {
          try {
            const results = await searchRentalsApi({
              page: 1,
              size: 1,
              rental_id: config.rental_id,
            });
            console.log("API results for rental details:", results);

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                rental_id:
                  fetchedConfig.rental_id ||
                  config.rental_id ||
                  "",
                property_id: fetchedConfig.property_id || config.property_id || "",
                property_name:
                  fetchedConfig.property_name ||
                  config.property_name ||
                  "",
                tenant_name: fetchedConfig.tenant_name || config.tenant_name || "",
                tenant_phone:
                  fetchedConfig.tenant_phone ||
                  config.tenant_phone ||
                  "",
                tenant_email: fetchedConfig.tenant_email || config.tenant_email || "",
                rental_start_date:
                  fetchedConfig.rental_start_date || config.rental_start_date || "",
                rental_end_date: fetchedConfig.rental_end_date || config.rental_end_date || "",
                rental_price: fetchedConfig.rental_price || config.rental_price || "",
                deposit:
                  fetchedConfig.deposit || config.deposit || "",
                created_at: fetchedConfig.created_at || config.created_at || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                rental_id: config.rental_id || "",
                property_id: config.property_id || "",
                property_name: config.property_name || "",
                tenant_name: config.tenant_name || "",
                tenant_phone: config.tenant_phone || "",
                tenant_email: config.tenant_email || "",
                rental_start_date: config.rental_start_date || "",
                rental_end_date: config.rental_end_date || "",
                rental_price: config.rental_price || "",
                deposit: config.deposit || "",
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
            console.error("Error fetching Rentals details:", error);
            toast.error("Failed to fetch  Rentals details.");
            const newFormData = {
              rental_id: config.rental_id || "",
              property_id: config.property_id || "",
              property_name: config.property_name || "",
              tenant_name: config.tenant_name || "",
              tenant_phone: config.tenant_phone || "",
              tenant_email: config.tenant_email || "",
              rental_start_date: config.rental_start_date || "",
              rental_end_date: config.rental_end_date || "",
              rental_price: config.rental_price || "",
              deposit: config.deposit || "",
              created_at: config.created_at || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchLeadPropertyDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          rental_id: "",
          property_id: "",
          property_name: "",
          tenant_name: "",
          tenant_phone: "",
          tenant_email: "",
          rental_start_date: "",
          rental_end_date: "",
          rental_price: "",
          deposit: "",
          created_at: "",
        };
        setFormData(defaultFormData);
        setNameSuggestions([]);
        setPropertyIdSuggestions([]);
        setShowNameSuggestions(false);
        setShowPropertyIdSuggestions(false);
        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        nameRef.current &&
        !nameRef.current.contains(event.target as Node)
      ) {
        setShowNameSuggestions(false);
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

  const searchNameSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setNameSuggestions([]);
        setShowNameSuggestions(false);
        console.log("Empty email search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchPropertiesApi({
          page: 1,
          size: 15,
          property_name: value,
        });
        setNameSuggestions(results);
        setShowNameSuggestions(results.length > 0);
        console.log("Search results for name:", results);
        if (results.length === 0) {
          toast.warn("No property found for the given name.");
        }
      } catch (error) {
        console.error("Error searching property by name:", error);
        toast.error("Failed to search property by email.");
        setNameSuggestions([]);
        setShowNameSuggestions(false);
      }
    }, 500),
    []
  );

  const searchPropertyIdSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setPropertyIdSuggestions([]);
        setShowPropertyIdSuggestions(false);
        console.log("Empty Property ID search value, clearing suggestions");
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
        console.log("Search results for Property ID:", results);
        if (results.length === 0) {
          toast.warn("No property found for the given Property ID.");
        }
      } catch (error) {
        console.error("Error searching Property by Property ID:", error);
        toast.error("Failed to search Property by Property ID.");
        setPropertyIdSuggestions([]);
        setShowPropertyIdSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IRentalsGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IRentalsGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "rental_id",
            label: "Rental ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Rental ID",
            value: formData.rental_id,
          } as const,
        ]
      : []),
    {
      name: "property_name",
      label: "Property Name",
      type: "text" as const,
      inputType: "text" as const,
      required: true,
      placeholder: "Enter Property Name",
      disabled: mode === "detail",
      value: formData.property_id ,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "property_name");
        if (e.target instanceof HTMLInputElement) {
          searchNameSuggestions(e.target.value);
        }
      },
      suggestions:
        showNameSuggestions && nameSuggestions.length > 0
          ? nameSuggestions.map((property) => ({
              value: property.property_name || "",
              label: `${property.property_name} (Property ID: ${property.property_id})`,
              onSelect: () => {
                const updatedData = {
                  property_name: property.property_name || "",
                  property_id: property.property_id ||"",
                };
                setFormData((prev) => ({
                  ...prev,
                  property_name: updatedData.property_name,
                  property_id: updatedData.property_id,
                }));
                setShowNameSuggestions(false);
                console.log("Selected property name suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: nameRef,
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
      required: true,
      placeholder: "Enter Property ID",
      disabled: mode === "detail",
      value: formData.property_id.toString(),
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "property_id");
        if (e.target instanceof HTMLInputElement) {
          searchPropertyIdSuggestions(e.target.value);
        }
      },
      suggestions:
        showPropertyIdSuggestions && PropertyIdSuggestions.length > 0
          ? PropertyIdSuggestions.map((property) => ({
              value: property.property_id,
              label: `Property ID: ${property.property_id} (Email: ${property.property_name})`,
              onSelect: () => {
                const updatedData = {
                  property_name: property.property_name || "",
                  property_id: property.property_id ||"",
                };
                setFormData((prev) => ({
                  ...prev,
                  property_name: updatedData.property_name,
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
      name: "tenant_name",
      label: "Tenant Name",
      type: "text" as const,
      placeholder: "Enter tenant name",
      disabled: mode === "detail",
      value: formData.tenant_name,
      onChange: (e) => handleInputChange(e, "tenant_name"),
    } as const,
    {
      name: "tenant_phone",
      label: "Tenant Phone",
      type: "text" as const,
      placeholder: "Enter Tenant Phone",
      disabled: mode === "detail",
      value: formData.tenant_phone,
      onChange: (e) => handleInputChange(e, "tenant_phone"),
    } as const,
    {
      name: "tenant_email",
      label: "Tenant Email",
      type: "text" as const,
      placeholder: "Enter Tenant Email",
      disabled: mode === "detail",
      value: formData.tenant_email,
      onChange: (e) => handleInputChange(e, "tenant_email"),
    } as const,
    {
      name: "rental_start_date",
      label: "Rental Start Date",
      type: "text" as const,
      placeholder: "Enter state",
      disabled: mode === "detail",
      value: formData.rental_start_date,
      onChange: (e) => handleInputChange(e, "rental_start_date"),
    } as const,
    {
      name: "rental_end_date",
      label: "Rental End Date",
      type: "text" as const,
      placeholder: "Enter Rental End Date",
      disabled: mode === "detail",
      value: formData.rental_end_date,
      onChange: (e) => handleInputChange(e, "rental_end_date"),
    } as const,
    {
      name: "rental_price",
      label: "Rental Price",
      type: "text" as const,
      placeholder: "Enter Rental Price",
      disabled: mode === "detail",
      value: formData.rental_price,
      onChange: (e) => handleInputChange(e, "rental_price"),
    } as const,
    {
      name: "deposit",
      label: "Deposit",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter Deposit",
      disabled: mode === "detail",
      value: formData.deposit?.toString(),
      onChange: (e) => handleInputChange(e, "deposit"),
    } as const,
    
  ];

  console.log("Rendering LeadPropertyFormModal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);
  console.log("Current name suggestions:", nameSuggestions);
  console.log("Current property ID suggestions:", PropertyIdSuggestions);

  return (
    <FormModal<IRentalsGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);
          // Validate email
          

          const submitData: IRentalsGetApi = {
            rental_id: data.rental_id || "",
            property_id: data.property_id || "",
            property_name: data.property_name || "",
            tenant_name: data.tenant_name || "",
            tenant_phone: data.tenant_phone || "",
            tenant_email: data.tenant_email || "",
            rental_start_date: data.rental_start_date || "",
            rental_end_date: data.rental_end_date || "",
            rental_price: data.rental_price || "",
            deposit: data.deposit || "",
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
        add: "Add New Rentals",
        edit: "Edit Rentals",
        detail: "Rentals Details",
      }}
      description={{
        add: "Create a new Rentals with the details below.",
        edit: "Update Rentasl details to keep information current.",
        detail: "View details of the Rentals below.",
      }}
      children={children}
    />
  );
};
