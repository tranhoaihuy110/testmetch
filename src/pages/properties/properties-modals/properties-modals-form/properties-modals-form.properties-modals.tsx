/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { FormModal } from "../../../../index";
import { IPropertiesGetApi } from "../../../../models";
import { searchPropertiesApi } from "../../../../services";
import { IPropertiesFormModalProps } from "./index";
import { toast } from "react-toastify";
import { IFormField } from "../../../../components";

interface UrlItem {
  url: string;
  zoom: number;
}

const processJson = (data: unknown): Record<string, any> => {
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

const processUrls = (data: unknown): UrlItem[] => {
  try {
    if (typeof data === "string") {
      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {
        if (parsedData.every((item: any) => typeof item === "object" && "url" in item)) {
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
        url: (typeof item === "object" && item !== null ? item.url : item) || "",
        zoom: typeof item === "object" && item !== null && typeof item.zoom === "number" ? item.zoom : 1,
      }));
    }
    if (typeof data === "object" && data !== null) {
      return Object.values(data).map((item: any) => ({
        url: (typeof item === "object" && item !== null ? item.url : item) || "",
        zoom: typeof item === "object" && item !== null && typeof item.zoom === "number" ? item.zoom : 1,
      }));
    }
    return [{ url: "", zoom: 1 }];
  } catch (e) {
    console.error("Error parsing URLs:", e);
    return [{ url: "", zoom: 1 }];
  }
};

export const PropertiesFormModal: React.FC<IPropertiesFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<IPropertiesGetApi>(
    typeof config === "object" && config !== null
      ? {
          property_id: config.property_id || "",
          property_name: String(config.property_name || ""),
          property_type: config.property_type || "",
          description: config.description || "",
          json_address: processJson(config.json_address) || {},
          full_address: config.full_address || "",
          address: config.address || "",
          city: config.city || "",
          state: config.state || "",
          postal_code: config.postal_code || "",
          country: config.country || "",
          price: config.price || "",
          size: config.size || "",
          longtitude: config.longtitude || "",
          latitude: config.latitude || "",
          scanned_outside_folder_url: processUrls(config.scanned_outside_folder_url) || [{ url: "", zoom: 1 }],
          ksplat_url: processUrls(config.ksplat_url) || [{ url: "", zoom: 1 }],
          created_at: config.created_at || "",
          updated_at: config.updated_at || "",
          streetview_url: config.streetview_url || "",
          created_by: config.created_by || "",
        }
      : {
          property_id: "",
          property_name: "",
          property_type: "",
          description: "",
          json_address: {},
          full_address: "",
          address: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          price: "",
          size: "",
          longtitude: "",
          latitude: "",
          scanned_outside_folder_url: [{ url: "", zoom: 1 }],
          ksplat_url: [{ url: "", zoom: 1 }],
          created_at: "",
          updated_at: "",
          streetview_url: "",
          created_by: "",
        }
  );

  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with config:", config);
      if ((mode === "edit" || mode === "detail") && config?.property_id) {
        const fetchPropertiesDetails = async () => {
          try {
            const results = await searchPropertiesApi({
              page: 1,
              size: 1,
              property_id: config.property_id,
            });
            console.log("API results for Properties details:", results);

            if (results && results.length > 0) {
              const fetchedConfig = results[0];
              const newFormData = {
                property_id: fetchedConfig.property_id || config.property_id || "",
                property_name: String(fetchedConfig.property_name || config.property_name || ""),
                property_type: fetchedConfig.property_type || config.property_type || "",
                description: fetchedConfig.description || config.description || "",
                json_address: processJson(fetchedConfig.json_address) || processJson(config.json_address) || {},
                full_address: fetchedConfig.full_address || config.full_address || "",
                address: fetchedConfig.address || config.address || "",
                city: fetchedConfig.city || config.city || "",
                state: fetchedConfig.state || config.state || "",
                postal_code: fetchedConfig.postal_code || config.postal_code || "",
                country: fetchedConfig.country || config.country || "",
                price: fetchedConfig.price || config.price || "",
                size: fetchedConfig.size || config.size || "",
                longtitude: fetchedConfig.longtitude || config.longtitude || "",
                latitude: fetchedConfig.latitude || config.latitude || "",
                scanned_outside_folder_url: processUrls(fetchedConfig.scanned_outside_folder_url) || processUrls(config.scanned_outside_folder_url) || [{ url: "", zoom: 1 }],
                ksplat_url: processUrls(fetchedConfig.ksplat_url) || processUrls(config.ksplat_url) || [{ url: "", zoom: 1 }],
                created_at: fetchedConfig.created_at || config.created_at || "",
                updated_at: fetchedConfig.updated_at || config.updated_at || "",
                streetview_url: fetchedConfig.streetview_url || config.streetview_url || "",
                created_by: fetchedConfig.created_by || config.created_by || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                property_id: config.property_id || "",
                property_name: String(config.property_name || ""),
                property_type: config.property_type || "",
                description: config.description || "",
                json_address: processJson(config.json_address) || {},
                full_address: config.full_address || "",
                address: config.address || "",
                city: config.city || "",
                state: config.state || "",
                postal_code: config.postal_code || "",
                country: config.country || "",
                price: config.price || "",
                size: config.size || "",
                longtitude: config.longtitude || "",
                latitude: config.latitude || "",
                scanned_outside_folder_url: processUrls(config.scanned_outside_folder_url) || [{ url: "", zoom: 1 }],
                ksplat_url: processUrls(config.ksplat_url) || [{ url: "", zoom: 1 }],
                created_at: config.created_at || "",
                updated_at: config.updated_at || "",
                streetview_url: config.streetview_url || "",
                created_by: config.created_by || "",
              };
              setFormData(newFormData);
              console.log("formData set to fallback in edit/detail mode:", newFormData);
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            const newFormData = {
              property_id: config.property_id || "",
              property_name: String(config.property_name || ""),
              property_type: config.property_type || "",
              description: config.description || "",
              json_address: processJson(config.json_address) || {},
              full_address: config.full_address || "",
              address: config.address || "",
              city: config.city || "",
              state: config.state || "",
              postal_code: config.postal_code || "",
              country: config.country || "",
              price: config.price || "",
              size: config.size || "",
              longtitude: config.longtitude || "",
              latitude: config.latitude || "",
              scanned_outside_folder_url: processUrls(config.scanned_outside_folder_url) || [{ url: "", zoom: 1 }],
              ksplat_url: processUrls(config.ksplat_url) || [{ url: "", zoom: 1 }],
              created_at: config.created_at || "",
              updated_at: config.updated_at || "",
              streetview_url: config.streetview_url || "",
              created_by: config.created_by || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchPropertiesDetails();
      } else if (isOpen && mode === "add") {
        const defaultFormData = {
          property_name: "",
          property_type: "",
          description: "",
          json_address: {},
          full_address: "",
          address: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          price: "",
          size: "",
          longtitude: "",
          latitude: "",
          scanned_outside_folder_url: [{ url: "", zoom: 1 }],
          ksplat_url: [{ url: "", zoom: 1 }],
          created_at: "",
          updated_at: "",
          streetview_url: "",
          created_by: "",
        };
        setFormData(defaultFormData);
        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, config]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IPropertiesGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IPropertiesGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "property_id",
            label: "Property ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Property ID",
            value: formData.property_id,
          } as const,
        ]
      : []),
    {
      name: "property_name",
      label: "Property Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter property name",
      disabled: mode === "detail",
      value: formData.property_name,
      onChange: (e) => handleInputChange(e, "property_name"),
    } as const,
    {
      name: "property_type",
      label: "Property Type",
      type: "text" as const,
      placeholder: "Enter property type",
      disabled: mode === "detail",
      value: formData.property_type,
      onChange: (e) => handleInputChange(e, "property_type"),
    } as const,
    {
      name: "description",
      label: "Description",
      type: "text" as const,
      placeholder: "Enter location elements",
      disabled: mode === "detail",
      value: formData.description,
      onChange: (e) => handleInputChange(e, "description"),
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
      name: "full_address",
      label: "Full Address",
      type: "text" as const,
      placeholder: "Enter full_address",
      disabled: mode === "detail",
      value: formData.full_address,
      onChange: (e) => handleInputChange(e, "full_address"),
    } as const,
    {
      name: "address",
      label: " Address",
      type: "text" as const,
      placeholder: "Enter address",
      disabled: mode === "detail",
      value: formData.address,
      onChange: (e) => handleInputChange(e, "address"),
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
      name: "price",
      label: "Price",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter price",
      disabled: mode === "detail",
      value: formData.price,
      onChange: (e) => handleInputChange(e, "price"),
    } as const,
    {
      name: "size",
      label: "Size",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter size",
      disabled: mode === "detail",
      value: formData.size,
      onChange: (e) => handleInputChange(e, "size"),
    } as const,
    {
      name: "longtitude",
      label: "Longitude",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter longitude",
      disabled: mode === "detail",
      value: formData.longtitude !== undefined && formData.longtitude !== null ? formData.longtitude.toString() : "",
      onChange: (e) => handleInputChange(e, "longtitude"),
    } as const,
    {
      name: "latitude",
      label: "Latitude",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter latitude",
      disabled: mode === "detail",
      value: formData.latitude !== undefined && formData.latitude !== null ? formData.latitude.toString() : "",
      onChange: (e) => handleInputChange(e, "latitude"),
    } as const,
    {
      name: "scanned_outside_folder_url",
      label: "Scanned Outside Folder URL",
      type: "urlList" as const,
      placeholder: "Enter scanned_outside_folder_url",
      disabled: mode === "detail",
      value: formData.scanned_outside_folder_url,
      defaultValue: [{ url: "", zoom: 1 }],
      onChange: (e) => handleInputChange(e, "scanned_outside_folder_url"),
    } as const,
    {
      name: "ksplat_url",
      label: "Ksplat URLs",
      type: "urlList" as const,
      placeholder: "Enter ksplat URL",
      disabled: mode === "detail",
      value: formData.ksplat_url,
      defaultValue: [{ url: "", zoom: 1 }],
      onChange: (e) => handleInputChange(e, "ksplat_url"),
    } as const,
    {
      name: "streetview_url",
      label: "Streetview URL",
      type: "text" as const,
      placeholder: "Enter streetview_url",
      disabled: mode === "detail",
      value: formData.streetview_url,
      onChange: (e) => handleInputChange(e, "streetview_url"),
    } as const,
    {
      name: "created_by",
      label: "Created By",
      type: "text" as const,
      inputType: "number" as const,
      placeholder: "Enter created_by",
      disabled: mode === "detail",
      value: formData.created_by?.toString(),
      onChange: (e) => handleInputChange(e, "created_by"),
    } as const,
  ];

  console.log("Rendering PropertiesFormModal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);

  return (
    <FormModal<IPropertiesGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);

          let jsonAddress = data.json_address || {};
          if (typeof data.json_address === "string" && data.json_address !== "") {
            try {
              jsonAddress = JSON.parse(data.json_address);
              if (typeof jsonAddress !== "object" || jsonAddress === null) {
                throw new Error("Invalid JSON Address");
              }
            } catch (error) {
              throw new Error("Invalid JSON Address");
            }
          }

          const submitData: IPropertiesGetApi = {
            property_id: data.property_id || undefined,
            property_name: data.property_name || "",
            property_type: data.property_type || "",
            description: data.description || "",
            json_address: jsonAddress,
            full_address: data.full_address || "",
            address: data.address || "",
            city: data.city || "",
            state: data.state || "",
            postal_code: data.postal_code || "",
            country: data.country || "",
            price: data.price || "",
            size: data.size || "",
            longtitude: data.longtitude || "",
            latitude: data.latitude || "",
            scanned_outside_folder_url: data.scanned_outside_folder_url || [{ url: "", zoom: 1 }],
            ksplat_url: data.ksplat_url || [{ url: "", zoom: 1 }],
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
            streetview_url: data.streetview_url || "",
            created_by: data.created_by || "",
          };
            console.log("submitData cuối cùng:", submitData);
          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Properties",
        edit: "Edit Properties",
        detail: "Properties Details",
      }}
      description={{
        add: "Create a new Properties with the details below.",
        edit: "Update Properties details to keep information current.",
        detail: "View details of the Properties below.",
      }}
      children={children}
    />
  );
};