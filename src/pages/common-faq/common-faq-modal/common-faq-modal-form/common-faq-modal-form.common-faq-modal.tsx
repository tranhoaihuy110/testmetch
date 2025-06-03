import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { ICommonFaqGetApi } from "../../../../models";
import { searchCommonFaqApi } from "../../../../services";
import { ICommonFaqFormModalProps } from "./index";
import { toast } from "react-toastify";
import {IFormField} from '../../../../components'
export const CommonFaqFormModal: React.FC<ICommonFaqFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [apiData, setApiData] = useState<ICommonFaqGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config?.id) {
      const fetchFaqDetails = async () => {
        try {
          setApiData(undefined);
          const results = await searchCommonFaqApi({
            page: 1,
            size: 1,
            id: String(config.id),
          });
          console.log("API results for FAQ details:", results);

          if (results && results.length > 0) {
            const fetchedFaq = results[0];
            setApiData({
              id: fetchedFaq.id || config.id || 0,
              faq_q: fetchedFaq.faq_q || config.faq_q || "",
              faq_a: fetchedFaq.faq_a || config.faq_a || "",
              faq_type: fetchedFaq.faq_type || config.faq_type || "",
              create_date: fetchedFaq.create_date || config.create_date || "",
              tenacy_id: fetchedFaq.tenacy_id || config.tenacy_id || "",
              faq_status: fetchedFaq.faq_status ?? config.faq_status ?? 0,
            });
          } else {
            setApiData({
              id: config.id || 0,
              faq_q: config.faq_q || "",
              faq_a: config.faq_a || "",
              faq_type: config.faq_type || "",
              create_date: config.create_date || "",
              tenacy_id: config.tenacy_id || "",
              faq_status: config.faq_status ?? 0,
            });
            toast.warn("No data returned from API, using provided data.");
          }
        } catch (error) {
          console.error("Error fetching FAQ details:", error);
          toast.error("Failed to fetch FAQ details.");
          setApiData({
            id: config.id || 0,
            faq_q: config.faq_q || "",
            faq_a: config.faq_a || "",
            faq_type: config.faq_type || "",
            create_date: config.create_date || "",
            tenacy_id: config.tenacy_id || "",
            faq_status: config.faq_status ?? 0,
          });
        }
      };

      fetchFaqDetails();
    } else if (isOpen && mode === "add") {
      setApiData({
        faq_q: "",
        faq_a: "",
        faq_type: "",
        create_date: "",
        tenacy_id: "",
        faq_status: 0,
      });
    }
  }, [isOpen, mode, config]);

  const fields : IFormField<ICommonFaqGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "FAQ ID",
          } as const,
        ]
      : []),
    {
      name: "faq_q",
      label: "Question",
      type: "text" as const,
      required: true,
      placeholder: "Enter question",
      disabled: mode === "detail",
    },
    {
      name: "faq_a",
      label: "Answer",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter answer",
      rows: 6,
      disabled: mode === "detail",
    },
    {
      name: "faq_type",
      label: "Type",
      type: "text" as const,
      required: true,
      placeholder: "Enter type (e.g., SignUp)",
      disabled: mode === "detail",
    },
    {
      name: "tenacy_id",
      label: "Tenant ID",
      type: "text" as const,
      required: true,
      placeholder: "Enter tenant ID",
      disabled: mode === "detail",
    },
    {
      name: "faq_status",
      label: "Status (0 or 1)",
      type: "text" as const,
      required: true,
      placeholder: "Enter status (0 or 1)",
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<ICommonFaqGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          const status = Number(data.faq_status);
          if (status !== 0 && status !== 1) {
            toast.error("Status must be 0 (Inactive) or 1 (Active).");
            throw new Error("Invalid status");
          }
        }
        const newFaq: ICommonFaqGetApi = {
          id: data.id || undefined,
          faq_q: data.faq_q,
          faq_a: data.faq_a,
          faq_type: data.faq_type || "",
          create_date: data.create_date || "",
          tenacy_id: data.tenacy_id || "",
          faq_status: Number(data.faq_status),
        };
        await onSubmit(newFaq);
        onClose(); 
      }}
      mode={mode}
      config={apiData}
      fields={fields}
      title={{
        add: "Add New FAQ",
        edit: "Edit FAQ",
        detail: "FAQ Details",
      }}
      description={{
        add: "Create a new FAQ with the details below.",
        edit: "Update the FAQ details to keep it up-to-date.",
        detail: "View the details of the FAQ below.",
      }}
      children={children}
    />
  );
};