import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { ICommonBranchPostcodeGetApi } from "../../../../models";
import { searchCommonBranchPostcodeApi } from "../../../../services";
import { ICommonBranchPostcodeDetailModalProps } from "./index";
import { toast } from "react-toastify";
import {IFormField} from '../../../../components'
export const CommonBranchPostcodeDetailModal: React.FC<ICommonBranchPostcodeDetailModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [apiData, setApiData] = useState<ICommonBranchPostcodeGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config?.id) {
      const fetchFaqDetails = async () => {
        try {
          setApiData(undefined);
          const results = await searchCommonBranchPostcodeApi({
            page: 1,
            size: 1,
            id: String(config.id),
          });
          console.log("API results for CommonBranchPostcode details:", results);

          if (results && results.length > 0) {
            const fetchedPostcode = results[0];
            setApiData({
              id: fetchedPostcode.id || config.id || "",
              user_name: fetchedPostcode.user_name || config.user_name || "",
              branch: fetchedPostcode.branch || config.branch || "",
              postcodes: fetchedPostcode.postcodes || config.postcodes || "",
              created_at: fetchedPostcode.created_at || config.created_at || "",
            });
          } else {
            setApiData({
              id: config.id || "",
              user_name: config.user_name || "",
              branch: config.branch || "",
              postcodes: config.postcodes || "",
              created_at: config.created_at || "",
            });
            toast.warn("No data returned from API, using provided data.");
          }
        } catch (error) {
          console.error("Error fetching Postcode details:", error);
          toast.error("Failed to fetch Postcode details.");
          setApiData({
            id: config.id || "",
            user_name: config.user_name || "",
            branch: config.branch || "",
            postcodes: config.postcodes || "",
            created_at: config.created_at || "",
          });
        }
      };

      fetchFaqDetails();
    } else if (isOpen && mode === "add") {
      setApiData({
        id: "",
        user_name: "",
        branch: "",
        postcodes: "",
        created_at: "",
      });
    }
  }, [isOpen, mode, config]);

  const fields : IFormField<ICommonBranchPostcodeGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Branch Postcode ID",
          } as const,
        ]
      : []),
    {
      name: "user_name",
      label: "User Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter user name",
      disabled: mode === "detail",
    },
    {
      name: "branch",
      label: "Branch",
      type: "text" as const,
      required: true,
      placeholder: "Enter branch",
      disabled: mode === "detail",
    },
    {
      name: "postcodes",
      label: "Postcodes",
      type: "text" as const,
      required: true,
      placeholder: "Enter postcodes",
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<ICommonBranchPostcodeGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        const newPostcode: ICommonBranchPostcodeGetApi = {
          id: data.id || undefined,
          user_name: data.user_name,
          branch: data.branch,
          postcodes: data.postcodes,
        };
        await onSubmit(newPostcode);
        onClose();
      }}
      mode={mode}
      config={apiData}
      fields={fields}
      title={{
        add: "Add New Postcode",
        edit: "Edit Postcode",
        detail: "Postcode Details",
      }}
      description={{
        add: "Create a new Postcode with the details below.",
        edit: "Update the Postcode details to keep it up-to-date.",
        detail: "View the details of the Postcode below.",
      }}
      children={children}
    />
  );
};