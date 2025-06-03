import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { IMetaDataApi } from "../../../../models";
import { searchMetaDataApi } from "../../../../services";
import { IServiceFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";


export const ServiceFormModal: React.FC<IServiceFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  service,
  children = "",
}) => {
  const [formData, setFormData] = useState<IMetaDataApi>(
    mode === "add" || !service
      ? {
          id: "0",
          data_type: "",
          data_code: "",
          data_title: "",
          name: "",
          category_id: "",
          parent_id: "",
          data_image: "",
          data_desc: "",
          referral_name: "",
          referral_email: "",
          referral_phone: "",
          parent_name: ""
        }
      : { ...service , parent_name: service.category_name || ""}
  );
  const [suggestions, setSuggestions] = useState<IMetaDataApi[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const parentNameRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with service:", service);
      if ((mode === "edit" || mode === "detail") && service?.id) {
        const fetchServiceDetails = async () => {
          try {
            const results = await searchMetaDataApi({
              page: 1,
              size: 1,
              data_type: "service",
              id: String(service.id),
            });
            console.log("API results for service details:", results);

            if (results.length > 0) {
              const fetchedService = results[0];
              const newFormData = {
                id: String(fetchedService.id || service.id),
                data_type: fetchedService.data_type || service.data_type || "",
                data_code: fetchedService.data_code || service.data_code || "",
                data_title: fetchedService.data_title || service.data_title || "",
                name: fetchedService.name || service.name || "",
                category_id: String(fetchedService.category_id || service.category_id || ""),
                parent_id: String(fetchedService.parent_id || service.parent_id || ""),
                data_image: fetchedService.data_image || service.data_image || "",
                data_desc: fetchedService.data_desc || service.data_desc || "",
                referral_name: fetchedService.referral_name || service.referral_name || "",
                referral_email: fetchedService.referral_email || service.referral_email || "",
                referral_phone: fetchedService.referral_phone || service.referral_phone || "",
                parent_name: fetchedService.category_name || service.category_name || "",
              };
              setFormData(newFormData);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const newFormData = {
                id: String(service.id),
                data_type: service.data_type || "",
                data_code: service.data_code || "",
                data_title: service.data_title || "",
                name: service.name || "",
                category_id: String(service.category_id || ""),
                parent_id: String(service.parent_id || ""),
                data_image: service.data_image || "",
                data_desc: service.data_desc || "",
                referral_name: service.referral_name || "",
                referral_email: service.referral_email || "",
                referral_phone: service.referral_phone || "",
                 parent_name: service.category_name || "",
              
              };
              setFormData(newFormData);
              console.log("formData set to fallback in edit/detail mode:", newFormData);
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            console.error("Error fetching service details:", error);
            toast.error("Failed to fetch service details.");
            const newFormData = {
              id: String(service.id),
              data_type: service.data_type || "",
              data_code: service.data_code || "",
              data_title: service.data_title || "",
              name: service.name || "",
              category_id: String(service.category_id || ""),
              parent_id: String(service.parent_id || ""),
              data_image: service.data_image || "",
              data_desc: service.data_desc || "",
              referral_name: service.referral_name || "",
              referral_email: service.referral_email || "",
              referral_phone: service.referral_phone || "",
               parent_name: service.category_name || "",
            };
            setFormData(newFormData);
            console.log("formData set to fallback after error in edit/detail mode:", newFormData);
          }
        };
        fetchServiceDetails();
      } else if (mode === "add") {
        const defaultFormData = {
          id: "0",
          data_type: "",
          data_code: "",
          data_title: "",
          name: "",
          category_id: "",
          parent_id: "",
          data_image: "",
          data_desc: "",
          referral_name: "",
          referral_email: "",
          referral_phone: "",
          parent_name: "",
        };
        setFormData(defaultFormData);
        console.log("formData initialized in add mode:", defaultFormData);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, service]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (parentNameRef.current && !parentNameRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchParentCategory = useCallback(
    debounce(async (value: string) => {
      console.log("searchParentCategory called with value:", value);
      if (!value.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        setFormData((prev) => ({ ...prev, category_id: "", parent_id: "" }));
        console.log("No value or empty, clearing suggestions");
        return;
      }
      try {
        const results = await searchMetaDataApi({
          page: 1,
          size: 15,
          data_type: "category",
          name: value,
        });
        console.log("API response from searchParentCategory:", results);
        const formattedResults = results.map((category: IMetaDataApi) => ({
          ...category,
          id: String(category.id),
          category_id: String(category.category_id || ""),
          parent_id: String(category.parent_id || ""),
        }));
        setSuggestions(formattedResults);
        setShowSuggestions(formattedResults.length > 0);
        if (formattedResults.length === 0) {
          toast.warn("No category found for the given name.");
        }
      } catch (error) {
        console.error("Error searching parent category:", error);
        toast.error("Failed to search parent category.");
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IMetaDataApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IMetaDataApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "Service ID",
            type: "text",
            disabled: true,
            placeholder: "Service ID",
          } as const,
        ]
      : []),
    {
      name: "data_code",
      label: "Service Name",
      type: "text",
      required: true,
      placeholder: "Enter data code",
      disabled: mode === "detail",
      onChange: (e) => handleInputChange(e, "data_code"),
    } as const,
    {
      name: "name",
      label: "Data Title",
      type: "text",
      required: true,
      placeholder: "Enter service title",
      disabled: mode === "detail",
      onChange: (e) => handleInputChange(e, "name"),
    } as const,
    {
      name: "parent_name",
      label: "Parent Name",
      type: "text",
      required: true,
      placeholder: "Enter parent name",
      disabled: mode === "detail",
      onChange: (e) => {
        handleInputChange(e, "parent_name");
        searchParentCategory(e.target.value);
      },
      suggestions:
        showSuggestions && suggestions.length > 0
          ? suggestions.slice(0, 15).map((category) => ({
              value: category.id,
              label: category.data_title || category.name || "Unnamed Category",
              onSelect: () => {
                const selectedName =
                  category.data_title || category.name || "Unnamed Category";
                const selectedId = String(category.id);
                console.log("Suggestion selected:", selectedName, "ID:", selectedId);
                setFormData((prev) => ({
                  ...prev,
                  category_id: selectedId,
                  parent_id: selectedId,
                  parent_name: selectedName,
                }));
                setShowSuggestions(false);
                return { category_id: selectedId, parent_name: selectedName };
              },
            }))
          : [],
      suggestionRef: parentNameRef,
      clearable: mode !== "detail" && !!formData?.parent_name,
      onClear: () => {
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            category_id: "",
            parent_id: "",
            parent_name: "",
          };
          console.log("formData updated after clearing parent_name:", updatedFormData);
          return updatedFormData;
        });
        setShowSuggestions(false);
        return { parent_name: "", category_id: "", parent_id: "" };
      },
    } as const,
    {
      name: "category_id",
      label: "Parent ID",
      type: "text",
      required: true,
      placeholder: "Parent ID will be auto-filled",
      disabled: mode === "detail",
      renderValue: () => (
        <div
          className={`relative ${
            formData?.category_id
              ? "rounded-md bg-white py-0.5 shadow-sm ring-1 ring-black ring-opacity-5 dark:bg-gray-800 max-w-[200px]"
              : ""
          }`}
        >
          <input
            type="text"
            value={formData?.category_id || ""}
            placeholder="Parent ID will be auto-filled"
            disabled={mode === "detail"}
            className={`w-full rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-600 ${
              formData?.category_id ? "border-none" : ""
            }`}
            readOnly
          />
          {mode !== "detail" && formData?.category_id && (
            <button
              type="button"
              onClick={() => {
                setFormData((prev) => {
                  const updatedFormData = {
                    ...prev,
                    category_id: "",
                    parent_id: "",
                    parent_name: "",
                  };
                  console.log("formData updated after clearing category_id:", updatedFormData);
                  return updatedFormData;
                });
                setShowSuggestions(false);
              }}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Clear Parent ID"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      ),
    } as const,
    {
      name: "data_image",
      label: "Data Image URL",
      type: "text",
      placeholder: "Enter image URL (optional)",
      disabled: mode === "detail",
      onChange: (e) => handleInputChange(e, "data_image"),
    } as const,
    {
      name: "data_desc",
      label: "Data Description",
      type: "textarea",
      placeholder: "Enter description (optional)",
      disabled: mode === "detail",
      rows: 4,
      onChange: (e) => handleInputChange(e, "data_desc"),
    } as const,
    {
      name: "referral_name",
      label: "Referral Name",
      type: "text",
      placeholder: "Enter referral name (optional)",
      disabled: mode === "detail",
      onChange: (e) => handleInputChange(e, "referral_name"),
    } as const,
    {
      name: "referral_email",
      label: "Referral Email",
      type: "text",
      inputType: "email",
      placeholder: "Enter referral email (optional)",
      disabled: mode === "detail",
      onChange: (e) => handleInputChange(e, "referral_email"),
    } as const,
    {
      name: "referral_phone",
      label: "Referral Phone",
      type: "text",
      inputType: "tel",
      placeholder: "Enter referral phone (optional)",
      disabled: mode === "detail",
      onChange: (e) => handleInputChange(e, "referral_phone"),
    } as const,
  ];

  console.log("Rendering FormModal with config:", formData);

  return (
    <FormModal<IMetaDataApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting formData:", data);
          if (!data.data_code?.trim()) {
            toast.error("Data Code is required.");
            throw new Error("Data Code is required");
          }
          if (!data.name?.trim()) {
            toast.error("Data Title is required.");
            throw new Error("Data Title is required");
          }
          if (!data.category_id?.trim()) {
            toast.error("Parent ID is required.");
            throw new Error("Parent ID is required");
          }

          if (data.referral_email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.referral_email)) {
              toast.error("Referral Email must be a valid email address.");
              throw new Error("Invalid email");
            }
          }

          const submitData: IMetaDataApi = {
            id: data.id || "0",
            data_type: data.data_type || "",
            data_code: data.data_code || "",
            data_title: data.name || "",
            parent_id: data.category_id || "",
            data_image: data.data_image || "",
            data_desc: data.data_desc || "",
            referral_name: data.referral_name || "",
            referral_email: data.referral_email || "",
            referral_phone: data.referral_phone || "",
          };

          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Service",
        edit: "Edit Service",
        detail: "Service Details",
      }}
      description={{
        add: "Create a new Service with the details below.",
        edit: "Update the service details to keep it up-to-date.",
        detail: "View the details of the Service below.",
      }}
      className="max-w-[900px] m-4"
      children={children}
    />
  );
};