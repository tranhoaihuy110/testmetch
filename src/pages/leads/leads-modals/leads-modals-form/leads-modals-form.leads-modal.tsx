import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { ILeadsGetApi } from "../../../../models";
import { searchLeadsApi } from "../../../../services";
import { ILeadFormModalProps } from "./index";
import { toast } from "react-toastify";
import {IFormField} from '../../../../components'
export const LeadFormModal: React.FC<ILeadFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [apiData, setApiData] = useState<ILeadsGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config?.lead_id) {
      const fetchLeadDetails = async () => {
        try {
          setApiData(undefined);
          const results = await searchLeadsApi({
            page: 1,
            size: 1,
            lead_id: config.lead_id,
          });
          console.log("API results for lead details:", results);

          if (results.length > 0) {
            const fetchedConfig = results[0];
            const jsonMoreData = fetchedConfig.json_moredata
              ? typeof fetchedConfig.json_moredata === "string"
                ? JSON.parse(fetchedConfig.json_moredata)
                : fetchedConfig.json_moredata
              : config.json_moredata
              ? typeof config.json_moredata === "string"
                ? JSON.parse(config.json_moredata)
                : config.json_moredata
              : {};
            setApiData({
              lead_id: fetchedConfig.lead_id || config.lead_id || "",
              first_name: fetchedConfig.first_name || config.first_name || null,
              last_name: fetchedConfig.last_name || config.last_name || null,
              email: fetchedConfig.email || config.email || null,
              phone_number:
                fetchedConfig.phone_number || config.phone_number || null,
              company_name:
                fetchedConfig.company_name || config.company_name || null,
              job_title: fetchedConfig.job_title || config.job_title || null,
              lead_source:
                fetchedConfig.lead_source || config.lead_source || null,
              lead_stage: fetchedConfig.lead_stage || config.lead_stage || null,
              lead_status:
                fetchedConfig.lead_status || config.lead_status || null,
              created_at: fetchedConfig.created_at || config.created_at || "",
              updated_at: fetchedConfig.updated_at || config.updated_at || "",
              json_moredata: jsonMoreData,
              salesforce_lead_id:
                fetchedConfig.salesforce_lead_id ||
                config.salesforce_lead_id ||
                null,
            });
          } else {
            const jsonMoreData = config.json_moredata
              ? typeof config.json_moredata === "string"
                ? JSON.parse(config.json_moredata)
                : config.json_moredata
              : {};
            setApiData({
              lead_id: config.lead_id || "",
              first_name: config.first_name || null,
              last_name: config.last_name || null,
              email: config.email || null,
              phone_number: config.phone_number || null,
              company_name: config.company_name || null,
              job_title: config.job_title || null,
              lead_source: config.lead_source || null,
              lead_stage: config.lead_stage || null,
              lead_status: config.lead_status || null,
              created_at: config.created_at || "",
              updated_at: config.updated_at || "",
              json_moredata: jsonMoreData,
              salesforce_lead_id: config.salesforce_lead_id || null,
            });
            toast.warn("No data returned from API, using provided data.");
          }
        } catch (error) {
          
          setApiData({
            lead_id: config.lead_id || "",
            first_name: config.first_name || null,
            last_name: config.last_name || null,
            email: config.email || null,
            phone_number: config.phone_number || null,
            company_name: config.company_name || null,
            job_title: config.job_title || null,
            lead_source: config.lead_source || null,
            lead_stage: config.lead_stage || null,
            lead_status: config.lead_status || null,
            created_at: config.created_at || "",
            updated_at: config.updated_at || "",
            json_moredata: {},
            salesforce_lead_id: config.salesforce_lead_id || null,
          });
        }
      };

      fetchLeadDetails();
    } else if (isOpen && mode === "add") {
      setApiData({
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null,
        company_name: null,
        job_title: null,
        lead_source: null,
        lead_stage: null,
        lead_status: null,
        created_at: "",
        updated_at: "",
        json_moredata: {},
        salesforce_lead_id: null,
      });
    }
  }, [isOpen, mode, config]);

  const fields: IFormField<ILeadsGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "lead_id",
            label: "Lead ID",
            type: "text" as const,
            disabled: true,
            placeholder: "Lead ID",
          } as const,
        ]
      : []),
    {
      name: "email",
      label: "Email",
      type: "text" as const,
      required: true,
      placeholder: "Enter email",
      disabled: mode === "detail",
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter first name",
      disabled: mode === "detail",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter last name",
      disabled: mode === "detail",
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "text" as const,
      required: true,
      placeholder: "Enter phone number",
      disabled: mode === "detail",
    },
    {
      name: "company_name",
      label: "Company Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter company name",
      disabled: mode === "detail",
    },
    {
      name: "job_title",
      label: "Job Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter job title",
      disabled: mode === "detail",
    },
    {
      name: "lead_source",
      label: "Lead Source",
      type: "text" as const,
      required: true,
      placeholder: "Enter lead source",
      disabled: mode === "detail",
    },
    {
      name: "lead_stage",
      label: "Lead Stage",
      type: "text" as const,
      required: true,
      placeholder: "Enter lead stage",
      disabled: mode === "detail",
    },
    {
      name: "lead_status",
      label: "Lead Status",
      type: "text" as const,
      required: true,
      placeholder: "Enter lead status",
      disabled: mode === "detail",
    },
    {
      name: "salesforce_lead_id",
      label: "Salesforce Lead ID",
      type: "text" as const,
      placeholder: "Enter Salesforce lead ID",
      disabled: mode === "detail",
    },
    {
      name: "json_moredata",
      label: "More Data (JSON)",
      type: "aceEditor" as const,
      required: true,
      placeholder: "Enter JSON data {Json Object}",
      disabled: mode === "detail",
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
    },
  ];

  return (
    <FormModal<ILeadsGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (mode !== "detail") {
          const email = data.email || "";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            
            throw new Error("Invalid email");
          }

          const phone_number = data.phone_number || "";
          const phoneRegex = /^[+]?[0-9\s-]{10,}$/;
          if (!phoneRegex.test(phone_number)) {
           
            throw new Error("Invalid phone number");
          }

          let parsedJson = data.json_moredata || {};
          if (
            typeof data.json_moredata === "string" &&
            data.json_moredata !== ""
          ) {
            try {
              parsedJson = JSON.parse(data.json_moredata);
              if (typeof parsedJson !== "object" || parsedJson === null) {
                throw new Error("Invalid JSON");
              }
            } catch (error) {
              throw new Error("Invalid JSON");
            }
          }

          const submitData: ILeadsGetApi = {
            lead_id: data.lead_id || undefined,
            first_name: data.first_name || null,
            last_name: data.last_name || null,
            email: data.email || null,
            phone_number: data.phone_number || null,
            company_name: data.company_name || null,
            job_title: data.job_title || null,
            lead_source: data.lead_source || null,
            lead_stage: data.lead_stage || null,
            lead_status: data.lead_status || null,
            created_at: data.created_at || "",
            updated_at: data.updated_at || "",
            json_moredata: parsedJson,
            salesforce_lead_id: data.salesforce_lead_id || null,
          };
          await onSubmit(submitData);
        }
        onClose();
      }}
      mode={mode}
      config={apiData}
      fields={fields}
      title={{
        add: "Add New Lead",
        edit: "Edit Lead",
        detail: "Lead Details",
      }}
      description={{
        add: "Create a new Lead with the details below.",
        edit: "Update the Lead details to keep it up-to-date.",
        detail: "View the details of the Lead below.",
      }}
      children={children}
    />
  );
};
