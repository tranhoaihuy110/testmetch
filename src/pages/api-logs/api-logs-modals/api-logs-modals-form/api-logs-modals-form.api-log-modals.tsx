import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../components";
import { IApiLogsGetApi } from "../../../../models";
import { getApiLogsApi } from "../../../../services";
import { IApiLogsDetailModalProps } from "./index";

import {IFormField} from '../../../../components'
export const ApiLogsDetailModal: React.FC<IApiLogsDetailModalProps> = ({
  isOpen,
  onClose,
  mode,
  config,
  children = "",
}) => {
   const [apiData, setApiData] = useState<IApiLogsGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && mode === "detail" && config?.id) {
      const fetchLogDetails = async () => {
        try {
          setApiData(undefined); 
          const results = await getApiLogsApi({
            page: 1,
            size: 1,
            id: String(config.id),
          });
          console.log("API results for log details:", results);

          if (results.data && results.data.length > 0) {
            const fetchedLog = results.data[0];
            setApiData({
              id: fetchedLog.id || config.id || "",
              name_log: fetchedLog.name_log || config.name_log || "",
              input: fetchedLog.input || config.input || null,
              output: fetchedLog.output || config.output || "",
              create_date: fetchedLog.create_date || config.create_date || "",
            });
          } else {
            setApiData({
              id: config.id || "",
              name_log: config.name_log || "",
              input: config.input || null,
              output: config.output || "",
              create_date: config.create_date || "",
            });

          }
        } catch (error) {
          setApiData({
            id: config.id || "",
            name_log: config.name_log || "",
            input: config.input || null,
            output: config.output || "",
            create_date: config.create_date || "",
          });
        }
      };

      fetchLogDetails();
    }
  }, [isOpen, mode, config]);

  const fields : IFormField<IApiLogsGetApi>[] = [
    {
      name: "id",
      label: "ID",
      type: "text" as const,
      disabled: true,
      placeholder: "Log ID",
    },
    {
      name: "name_log",
      label: "Name Log",
      type: "text" as const,
      disabled: true,
      placeholder: "Enter log name",
    },
    {
      name: "input",
      label: "Input",
      type: "textarea" as const,
      disabled: true,
      placeholder: "Log input",
      rows: 8,
    },
    {
      name: "output",
      label: "Output",
      type: "textarea" as const,
      disabled: true,
      placeholder: "Log output",
      rows: 8,
    },
  ];

  return (
    <FormModal<IApiLogsGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => Promise.resolve()} 
      mode={mode}
      config={apiData}
      fields={fields}
      title={{
        add: "Add Log API", 
        edit: "Edit Log API", 
        detail: "Log API Details",
      }}
      description={{
        add: "Create a new log API.", 
        edit: "Update log API details.", 
        detail: "See details of Log API below.",
      }}
      children={children}
    />
  );
};