import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { IMetaDataApi } from "../../../../models";
import { searchMetaDataApi } from "../../../../services";
import { IPartnerFormModalProps } from "./index";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import { IFormField } from "../../../../components";



interface ExtendedMetaDataApi extends IMetaDataApi {
  parent_name: string;
  parent_names: string[];
}

export const PartnerFormModal: React.FC<IPartnerFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onReset,
  mode,
  partner,
}) => {
  const [formData, setFormData] = useState<ExtendedMetaDataApi>(
    mode === "add" || !partner
      ? {
          id: "0",
          data_type: "",
          data_code: "",
          data_title: "",
          name: "",
          parent_id: "",
          data_image: "",
          data_desc: "",
          referral_name: "",
          referral_email: "",
          referral_phone: "",
          parent_name: "",
          parent_names: [],
        }
      : {
          id: String(partner.id),
          data_type: partner.data_type || "",
          data_code: partner.data_code || "",
          data_title: partner.data_title || "",
          name: partner.name || "",
          parent_id: partner.parent_id || "",
          data_image: partner.data_image || "",
          data_desc: partner.data_desc || "",
          referral_name: partner.referral_name || "",
          referral_email: partner.referral_email || "",
          referral_phone: partner.referral_phone || "",
          parent_name: "",
          parent_names: [],
        }
  );
  const [suggestions, setSuggestions] = useState<IMetaDataApi[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      console.log("Modal opened in mode:", mode, "with partner:", partner);
      if ((mode === "edit" || mode === "detail") && partner?.id) {
        const fetchPartnerDetails = async () => {
          try {
            const results = await searchMetaDataApi({
              page: 1,
              size: 10,
              data_type: "partner",
              id: String(partner.id),
            });
            console.log("API results for partner details:", results);

            if (results.length > 0) {
              const fetchedPartner = results[0];
              const parentIdString = fetchedPartner.parent_id || partner.parent_id || "";
              let initialParentIds: string[] = parentIdString
                .split(",")
                .map((id) => id.trim())
                .filter((id) => id);

              const serviceIds = results
                .map((item: IMetaDataApi) => String(item.service_id))
                .filter((id: string, index: number, self: string[]) => id && self.indexOf(id) === index);

              if (partner.service_id && !initialParentIds.includes(String(partner.service_id))) {
                initialParentIds.push(String(partner.service_id));
              }

              initialParentIds = [...new Set([...initialParentIds, ...serviceIds])];

              const newFormData = {
                id: String(fetchedPartner.id || partner.id),
                data_type: fetchedPartner.data_type || partner.data_type || "",
                data_code: fetchedPartner.data_code || partner.data_code || "",
                data_title: fetchedPartner.data_title || partner.data_title || "",
                name: fetchedPartner.name || partner.name || "",
                parent_id: initialParentIds.join(",") || "",
                data_image: fetchedPartner.data_image || partner.data_image || "",
                data_desc: fetchedPartner.data_desc || partner.data_desc || "",
                referral_name: fetchedPartner.referral_name || partner.referral_name || "",
                referral_email: fetchedPartner.referral_email || partner.referral_email || "",
                referral_phone: fetchedPartner.referral_phone || partner.referral_phone || "",
                parent_name: "",
                parent_names: [],
              };
              setFormData(newFormData);
              fetchParentNames(initialParentIds);
              console.log("formData updated in edit/detail mode:", newFormData);
            } else {
              const parentIdString = partner.parent_id || "";
              let initialParentIds: string[] = parentIdString
                .split(",")
                .map((id) => id.trim())
                .filter((id) => id);

              if (partner.service_id && !initialParentIds.includes(String(partner.service_id))) {
                initialParentIds.push(String(partner.service_id));
              }

              initialParentIds = [...new Set(initialParentIds)];

              const newFormData = {
                id: String(partner.id),
                data_type: partner.data_type || "",
                data_code: partner.data_code || "",
                data_title: partner.data_title || "",
                name: partner.name || "",
                parent_id: initialParentIds.join(",") || "",
                data_image: partner.data_image || "",
                data_desc: partner.data_desc || "",
                referral_name: partner.referral_name || "",
                referral_email: partner.referral_email || "",
                referral_phone: partner.referral_phone || "",
                parent_name: "",
                parent_names: [],
              };
              setFormData(newFormData);
              fetchParentNames(initialParentIds);
              console.log("formData set to fallback in edit/detail mode:", newFormData);
              toast.warn("No data returned from API, using provided data.");
            }
          } catch (error) {
            console.error("Error fetching partner details:", error);
            toast.error("Failed to fetch partner details.");
            const parentIdString = partner.parent_id || "";
            let initialParentIds: string[] = parentIdString
              .split(",")
              .map((id) => id.trim())
              .filter((id) => id);

            if (partner.service_id && !initialParentIds.includes(String(partner.service_id))) {
              initialParentIds.push(String(partner.service_id));
            }

            initialParentIds = [...new Set(initialParentIds)];

            const newFormData = {
              id: String(partner.id),
              data_type: partner.data_type || "",
              data_code: partner.data_code || "",
              data_title: partner.data_title || "",
              name: partner.name || "",
              parent_id: initialParentIds.join(",") || "",
              data_image: partner.data_image || "",
              data_desc: partner.data_desc || "",
              referral_name: partner.referral_name || "",
              referral_email: partner.referral_email || "",
              referral_phone: partner.referral_phone || "",
              parent_name: "",
              parent_names: [],
            };
            setFormData(newFormData);
            fetchParentNames(initialParentIds);
            console.log("formData set to fallback after error:", newFormData);
          }
        };
        fetchPartnerDetails();
      } else if (mode === "add") {
        const defaultFormData = {
          id: "0",
          data_type: "",
          data_code: "",
          data_title: "",
          name: "",
          parent_id: "",
          data_image: "",
          data_desc: "",
          referral_name: "",
          referral_email: "",
          referral_phone: "",
          parent_name: "",
          parent_names: [],
        };
        setFormData(defaultFormData);
        setSuggestions([]);
        setShowSuggestions(false);
        console.log("formData initialized in add mode:", defaultFormData);
      }
    }
    wasOpenRef.current = isOpen;
  }, [isOpen, mode, partner]);

  const fetchParentNames = async (ids: string[]) => {
    try {
      const names: string[] = [];
      for (const id of ids) {
        const results = await searchMetaDataApi({
          page: 1,
          size: 10,
          data_type: "service",
          id,
        });
        const service = results[0];
        names.push(service ? (service.data_title || service.name || `Service ${id}`) : `Service ${id}`);
      }
      setFormData((prev) => ({
        ...prev,
        parent_names: names,
      }));
      console.log("Fetched parent names:", names);
    } catch (error) {
      const fallbackNames = ids.map((id) => `Service ${id}`);
      setFormData((prev) => ({
        ...prev,
        parent_names: fallbackNames,
      }));
      console.log("Error fetching parent names, using fallback:", fallbackNames);
      toast.error("Failed to fetch parent names.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (parentRef.current && !parentRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchServices = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        console.log("Empty search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchMetaDataApi({
          page: 1,
          size: 15,
          data_type: "service",
          service_name: value,
        });
        const formattedResults = results.map((service: IMetaDataApi) => ({
          ...service,
          id: String(service.id),
        }));
        setSuggestions(formattedResults);
        setShowSuggestions(formattedResults.length > 0);
        console.log("Search results for 'parent_name':", formattedResults);
        if (formattedResults.length === 0) {
          toast.warn("No service found for the given name.");
        }
      } catch (error) {
        console.error("Error searching services:", error);
        toast.error("Failed to search services.");
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof ExtendedMetaDataApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<ExtendedMetaDataApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "Partner ID",
            type: "text",
            disabled: true,
            placeholder: "Partner ID",
            value: formData.id,
          } as const,
        ]
      : []),
    {
      name: "data_code",
      label: "Partner Name",
      type: "text",
      required: true,
      placeholder: "Enter data code",
      disabled: mode === "detail",
      value: formData.data_code,
      onChange: (e) => handleInputChange(e, "data_code"),
    } as const,
    {
      name: "name",
      label: "Data Title",
      type: "text",
      required: true,
      placeholder: "Enter partner title",
      disabled: mode === "detail",
      value: formData.name,
      onChange: (e) => handleInputChange(e, "name"),
    } as const,
    {
      name: "parent_name",
      label: "Parent Name",
      type: "text",
      placeholder: "Search service name",
      disabled: mode === "detail",
      value: formData.parent_name,
      onChange: (e) => {
        handleInputChange(e, "parent_name");
        searchServices(e.target.value);
      },
      suggestions:
        showSuggestions && suggestions.length > 0
          ? suggestions.slice(0, 15).map((service) => ({
              value: service.id,
              label: service.data_title || service.name || `Service ${service.id}`,
              onSelect: () => {
                const selectedId = String(service.id).trim();
                const parentIds = formData.parent_id
                  ?.split(",")
                  .map((id) => id.trim())
                  .filter((id) => id) || [];
                if (parentIds.includes(selectedId)) {
                  toast.warn(`Parent ID ${selectedId} is already added.`);
                  return {};
                }
                const updatedParentIds = [...parentIds, selectedId];
                const updatedParentNames = [
                  ...(formData.parent_names || []),
                  service.data_title || service.name || `Service ${selectedId}`,
                ];
                setFormData((prev) => ({
                  ...prev,
                  parent_id: updatedParentIds.join(","),
                  parent_name: "", // Reset input sau khi chọn
                  parent_names: updatedParentNames,
                }));
                setShowSuggestions(false);
                console.log("Selected parent - Before update:", { ...formData });
                console.log("Selected parent - After update:", {
                  parent_id: updatedParentIds.join(","),
                  parent_name: "",
                  parent_names: updatedParentNames,
                });
                return { parent_id: updatedParentIds.join(",") };
              },
            }))
          : [],
      suggestionRef: parentRef,
    } as const,
    {
      name: "parent_id",
      label: "Parent ID",
      type: "custom",
      disabled: mode === "detail",
      renderValue: () => {
        const parentIds = formData.parent_id
          ?.split(",")
          .map((id) => id.trim())
          .filter((id) => id) || [];
        console.log("Rendering parent values:", {
          parentIds,
          parentNames: formData.parent_names,
        });
        return (
          <div className="flex flex-wrap gap-2 mt-2">
            {parentIds.length > 0 ? (
              parentIds.map((id, index) => (
                <div
                  key={id}
                  className="relative rounded-md bg-white py-0.5 px-2 shadow-sm ring-1 ring-black ring-opacity-5 dark:bg-gray-800 max-w-[200px] flex items-center"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                    {(formData.parent_names && formData.parent_names[index]) || `Service ${id}`} ({id})
                  </span>
                  {mode !== "detail" && (
                    <button
                      type="button"
                      onClick={() => {
                        const updatedParentIds = parentIds.filter((_, i) => i !== index);
                        const updatedParentNames = (formData.parent_names || []).filter((_, i) => i !== index);
                        setFormData((prev) => ({
                          ...prev,
                          parent_id: updatedParentIds.join(","),
                          parent_names: updatedParentNames,
                        }));
                        console.log("Updated formData after removing parent:", {
                          parent_id: updatedParentIds.join(","),
                          parent_names: updatedParentNames,
                        });
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      title="Remove Parent ID"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No Parent IDs selected.
              </p>
            )}
          </div>
        );
      },
    } as const,
    {
      name: "data_image",
      label: "Data Image URL",
      type: "text",
      placeholder: "Enter image URL (optional)",
      disabled: mode === "detail",
      value: formData.data_image,
      onChange: (e) => handleInputChange(e, "data_image"),
    } as const,
    {
      name: "data_desc",
      label: "Data Description",
      type: "textarea",
      placeholder: "Enter description (optional)",
      disabled: mode === "detail",
      value: formData.data_desc,
      rows: 4,
      onChange: (e) => handleInputChange(e, "data_desc"),
    } as const,
    {
      name: "referral_name",
      label: "Referral Name",
      type: "text",
      placeholder: "Enter referral name (optional)",
      disabled: mode === "detail",
      value: formData.referral_name,
      onChange: (e) => handleInputChange(e, "referral_name"),
    } as const,
    {
      name: "referral_email",
      label: "Referral Email",
      type: "text",
      inputType: "email",
      placeholder: "Enter referral email (optional)",
      disabled: mode === "detail",
      value: formData.referral_email,
      onChange: (e) => handleInputChange(e, "referral_email"),
    } as const,
    {
      name: "referral_phone",
      label: "Referral Phone",
      type: "text",
      inputType: "tel",
      placeholder: "Enter referral phone (optional)",
      disabled: mode === "detail",
      value: formData.referral_phone,
      onChange: (e) => handleInputChange(e, "referral_phone"),
    } as const,
  ];

  console.log("Rendering PartnerFormModal with formData:", formData);
  console.log("Fields passed to FormModal:", fields);
  console.log("Current suggestions:", suggestions);
  console.log("Current showSuggestions:", showSuggestions);

  return (
    <FormModal<ExtendedMetaDataApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          console.log("Submitting data:", data);
          if (!data.data_code?.trim()) {
            toast.error("Data Code is required.");
            throw new Error("Data Code is required");
          }
          if (!data.name?.trim()) {
            toast.error("Data Title is required.");
            throw new Error("Data Title is required");
          }
          if (!data.parent_id?.trim()) {
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
            parent_id: data.parent_id || "",
            data_image: data.data_image || "",
            data_desc: data.data_desc || "",
            referral_name: data.referral_name || "",
            referral_email: data.referral_email || "",
            referral_phone: data.referral_phone || "",
          };

          await onSubmit(submitData);
          onReset && onReset();
        }
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New Partner",
        edit: "Edit Partner",
        detail: "Partner Details",
      }}
      description={{
        add: "Create a new Partner with the details below.",
        edit: "Update the Partner details to keep it up-to-date.",
        detail: "View the details of the Partner below.",
      }}
      className="max-w-[700px] m-4"
    />
  );
};