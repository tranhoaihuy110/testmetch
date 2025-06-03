import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { IAppConfigGetApi } from "../../../../models";
import { searchAppConfigApi } from "../../../../services";
import { IAppConfigFormModalProps } from "./index";
import { toast } from "react-toastify";
import { IFormField } from "../../../../components";

export const AppConfigFormModal: React.FC<IAppConfigFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onReset,
  mode,
  config,
  children = "",
}) => {
  const [apiData, setApiData] = useState<IAppConfigGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config?.key) {
      const fetchAppConfigDetails = async () => {
        try {
          setApiData(undefined);
          const results = await searchAppConfigApi({
            page: 1,
            size: 1,
            key: config.key,
          });
          console.log("API results for app config details:", results);

          if (results.length > 0) {
            const fetchedConfig = results[0];
            setApiData({
              key: fetchedConfig.key || config.key || "",
              value: fetchedConfig.value || config.value || "",
              description:
                fetchedConfig.description || config.description || "",
              created_at: fetchedConfig.created_at || config.created_at || "",
              updated_at: fetchedConfig.updated_at || config.updated_at || "",
            });
          } else {
            setApiData({
              key: config.key || "",
              value: config.value || "",
              description: config.description || "",
              created_at: config.created_at || "",
              updated_at: config.updated_at || "",
            });
            toast.warn("No data returned from API, using provided data.");
          }
        } catch (error) {
          setApiData({
            key: config.key || "",
            value: config.value || "",
            description: config.description || "",
            created_at: config.created_at || "",
            updated_at: config.updated_at || "",
          });
        }
      };

      fetchAppConfigDetails();
    } else if (isOpen && mode === "add") {
      setApiData({
        key: "",
        value: "",
        description: "",
        created_at: "",
        updated_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<IAppConfigGetApi>[] = [
    {
      name: "key",
      label: "Key",
      type: "text" as const,
      required: mode === "add",
      placeholder: "Enter key",
      disabled: mode === "edit" || mode === "detail",
    },
    {
      name: "value",
      label: "Value",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter JSON value",
      rows: 8,
      disabled: mode === "detail",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Enter description (optional)",
      rows: 4,
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<IAppConfigGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          try {
            JSON.parse(data.value);
          } catch (error) {
            throw new Error("Invalid JSON");
          }
        }
        const newConfig: IAppConfigGetApi = {
          key: data.key,
          value: data.value,
          description: data.description || null,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        await onSubmit(newConfig);
        onReset && onReset();
        onClose();
      }}
      mode={mode}
      config={apiData}
      fields={fields}
      title={{
        add: "Add New App Config",
        edit: "Edit App Config",
        detail: "App Config Details",
      }}
      description={{
        add: "Create a new App Config with the details below.",
        edit: "Update the App Config details to keep it up-to-date.",
        detail: "View the details of the App Config below.",
      }}
      children={children}
    />
  );
};
