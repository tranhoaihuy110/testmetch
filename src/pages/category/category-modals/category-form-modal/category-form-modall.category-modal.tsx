import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { IMetaDataApi } from "../../../../models";
import { searchMetaDataApi } from "../../../../services";
import { ICategoryFormModalProps } from "./index";
import { toast } from "react-toastify";
import {IFormField} from '../../../../components'
export const CategoryFormModal: React.FC<ICategoryFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onReset,
  mode,
  category,
  children = "",
}) => {
  const [apiData, setApiData] = useState<IMetaDataApi | undefined>(
    typeof category === "object" && category !== null ? category : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && category?.id) {
      const fetchCategoryDetails = async () => {
        try {
          setApiData(undefined);
          const params = {
            data_type: "category",
            page: 1,
            size: 1,
            id: String(category.id),
          };
          const results = await searchMetaDataApi(params);
          console.log("Category details from API:", results);

          if (results.length > 0) {
            const fetchedCategory = results[0];
            setApiData({
              id: fetchedCategory.id || category.id || "",
              data_type: fetchedCategory.data_type || category.data_type || "",
              data_code: fetchedCategory.data_code || category.data_code || "",
              data_title: fetchedCategory.data_title || category.data_title || "",
              name: fetchedCategory.name || category.name || "",
              parent_id: fetchedCategory.parent_id || category.parent_id || "0",
              data_image: fetchedCategory.data_image || category.data_image || "",
              data_desc: fetchedCategory.data_desc || category.data_desc || "",
              referral_name: fetchedCategory.referral_name || category.referral_name || "",
              referral_email: fetchedCategory.referral_email || category.referral_email || "",
              referral_phone: fetchedCategory.referral_phone || category.referral_phone || "",
            });
          } else {
            setApiData({
              id: category.id || "",
              data_type: category.data_type || "",
              data_code: category.data_code || "",
              data_title: category.data_title || "",
              name: category.name || "",
              parent_id: category.parent_id || "0",
              data_image: category.data_image || "",
              data_desc: category.data_desc || "",
              referral_name: category.referral_name || "",
              referral_email: category.referral_email || "",
              referral_phone: category.referral_phone || "",
            });
            toast.warn("No data returned from API, using provided data.");
          }
        } catch (error) {

          setApiData({
            id: category.id || "",
            data_type: category.data_type || "",
            data_code: category.data_code || "",
            data_title: category.data_title || "",
            name: category.name || "",
            parent_id: category.parent_id || "0",
            data_image: category.data_image || "",
            data_desc: category.data_desc || "",
            referral_name: category.referral_name || "",
            referral_email: category.referral_email || "",
            referral_phone: category.referral_phone || "",
          });
        }
      };

      fetchCategoryDetails();
    } else if (isOpen && mode === "add") {
      setApiData({
        data_type: "",
        data_code: "",
        data_title: "",
        name: "",
        parent_id: "0",
        data_image: "",
        data_desc: "",
        referral_name: "",
        referral_email: "",
        referral_phone: "",
      });
    }
  }, [isOpen, mode, category]);

  const fields : IFormField<IMetaDataApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "Category ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Category ID",
          } as const,
        ]
      : []),
    {
      name: "data_code",
      label: "Data Code",
      type: "text" as const,
      required: true,
      placeholder: "Enter data code",
      disabled: mode === "detail",
    },
    {
      name: "name",
      label: "Category Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter category title",
      disabled: mode === "detail",
    },
    {
      name: "data_image",
      label: "Data Image URL",
      type: "text" as const,
      placeholder: "Enter image URL (optional)",
      disabled: mode === "detail",
    },
    {
      name: "data_desc",
      label: "Data Description",
      type: "textarea" as const,
      placeholder: "Enter description (optional)",
      rows: 4,
      disabled: mode === "detail",
    },
    {
      name: "referral_name",
      label: "Referral Name",
      type: "text" as const,
      placeholder: "Enter referral name (optional)",
      disabled: mode === "detail",
    },
    {
      name: "referral_email",
      label: "Referral Email",
      type: "text" as const,
      placeholder: "Enter referral email (optional)",
      disabled: mode === "detail",
    },
    {
      name: "referral_phone",
      label: "Referral Phone",
      type: "text" as const,
      placeholder: "Enter referral phone (optional)",
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<IMetaDataApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        const newCategory: IMetaDataApi = {
          id: data.id || undefined,
          data_type: data.data_type || "",
          data_code: data.data_code,
          data_title: data.name,
          parent_id: data.parent_id || "0",
          data_image: data.data_image || "",
          data_desc: data.data_desc || "",
          referral_name: data.referral_name || "",
          referral_email: data.referral_email || "",
          referral_phone: data.referral_phone || "",
        };
        await onSubmit(newCategory);
        onReset && onReset();
      }}
      mode={mode}
      config={apiData}
      fields={fields}
      title={{
        add: "Add New Category",
        edit: "Edit Category",
        detail: "Category Details",
      }}
      description={{
        add: "Create a new Category with the details below.",
        edit: "Update the category details to keep it up-to-date.",
        detail: "View the details of the category below.",
      }}
      children={children}
    />
  );
};