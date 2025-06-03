import React, { useEffect, useState } from "react";
import { FormModal } from "../../../../index";
import { IAppUserGetApi } from "../../../../models";
import { searchAppUserApi } from "../../../../services";
import { IAppUserFormModalProps } from "./index";
import { toast } from "react-toastify";
import {IFormField} from '../../../../components'
export const AppUserFormModal: React.FC<IAppUserFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [apiData, setApiData] = useState<IAppUserGetApi | undefined>(
    typeof config === "object" && config !== null ? config : undefined
  );

  useEffect(() => {
    if (isOpen && (mode === "edit" || mode === "detail") && config?.user_id) {
      const fetchAppUserDetails = async () => {
        try {
          setApiData(undefined);
          const results = await searchAppUserApi({
            page: 1,
            size: 1,
            user_id: config.user_id,
          });
          console.log("API results for app user details:", results);

          if (results.length > 0) {
            const fetchedConfig = results[0];
            setApiData({
              user_id: fetchedConfig.user_id || config.user_id || "",
              user_email: fetchedConfig.user_email || config.user_email || "",
              username: fetchedConfig.username || config.username || "",
              user_firstname: fetchedConfig.user_firstname || config.user_firstname || "",
              user_lastname: fetchedConfig.user_lastname || config.user_lastname || "",
              user_fullname: fetchedConfig.user_fullname || config.user_fullname || "",
              user_status: fetchedConfig.user_status ?? config.user_status ?? 0,
              phone_number: fetchedConfig.phone_number || config.phone_number || "",
              user_gender: fetchedConfig.user_gender ?? config.user_gender ?? null,
              user_avatar: fetchedConfig.user_avatar ?? config.user_avatar ?? null,
              date_of_birth: fetchedConfig.date_of_birth ?? config.date_of_birth ?? null,
              job: fetchedConfig.job ?? config.job ?? null,
              created_at: fetchedConfig.created_at || config.created_at || "",
              updated_at: fetchedConfig.updated_at || config.updated_at || "",
              group_id: fetchedConfig.group_id ?? config.group_id ?? null,
              user_session: fetchedConfig.user_session || config.user_session || "",
              parent_id: fetchedConfig.parent_id ?? config.parent_id ?? null,
              province_id: fetchedConfig.province_id ?? config.province_id ?? null,
              district_id: fetchedConfig.district_id ?? config.district_id ?? null,
              ward_id: fetchedConfig.ward_id ?? config.ward_id ?? null,
              object_id: fetchedConfig.object_id ?? config.object_id ?? null,
              user_type: fetchedConfig.user_type || config.user_type || "",
              department: fetchedConfig.department ?? config.department ?? null,
              department_code: fetchedConfig.department_code ?? config.department_code ?? null,
              language_session: fetchedConfig.language_session ?? config.language_session ?? null,
              rank: fetchedConfig.rank ?? config.rank ?? null,
              company_name: fetchedConfig.company_name ?? config.company_name ?? null,
              date_start_work: fetchedConfig.date_start_work ?? config.date_start_work ?? null,
              profession: fetchedConfig.profession ?? config.profession ?? null,
              job_title: fetchedConfig.job_title ?? config.job_title ?? null,
              manager_email: fetchedConfig.manager_email ?? config.manager_email ?? null,
              is_head: fetchedConfig.is_head || config.is_head || "",
              department_v2: fetchedConfig.department_v2 ?? config.department_v2 ?? null,
              department_level2: fetchedConfig.department_level2 ?? config.department_level2 ?? null,
              test_mh: fetchedConfig.test_mh ?? config.test_mh ?? null,
              otp: fetchedConfig.otp ?? config.otp ?? null,
              otp_expired_at: fetchedConfig.otp_expired_at ?? config.otp_expired_at ?? null,
              json_data: fetchedConfig.json_data ?? config.json_data ?? null,
              keycloak_id: fetchedConfig.keycloak_id || config.keycloak_id || "",
              salesforce_id: fetchedConfig.salesforce_id ?? config.salesforce_id ?? null,
              salesforce_token: fetchedConfig.salesforce_token ?? config.salesforce_token ?? null,
              expertise: fetchedConfig.expertise ?? config.expertise ?? null,
              fcm_token: fetchedConfig.fcm_token ?? config.fcm_token ?? null,
              profile_url: fetchedConfig.profile_url ?? config.profile_url ?? null,
              partner_code: fetchedConfig.partner_code ?? config.partner_code ?? null,
              auth_provider: fetchedConfig.auth_provider ?? config.auth_provider ?? null,
            });
          } else {
            setApiData({
              user_id: config.user_id || "",
              user_email: config.user_email || "",
              username: config.username || "",
              user_firstname: config.user_firstname || "",
              user_lastname: config.user_lastname || "",
              user_fullname: config.user_fullname || "",
              user_status: config.user_status ?? 0,
              phone_number: config.phone_number || "",
              user_gender: null,
              user_avatar: null,
              date_of_birth: null,
              job: null,
              created_at: "",
              updated_at: "",
              group_id: null,
              user_session: "",
              parent_id: null,
              province_id: null,
              district_id: null,
              ward_id: null,
              object_id: null,
              user_type: "",
              department: null,
              department_code: null,
              language_session: null,
              rank: null,
              company_name: null,
              date_start_work: null,
              profession: null,
              job_title: null,
              manager_email: null,
              is_head: "",
              department_v2: null,
              department_level2: null,
              test_mh: null,
              otp: null,
              otp_expired_at: null,
              json_data: null,
              keycloak_id: "",
              salesforce_id: null,
              salesforce_token: null,
              expertise: null,
              fcm_token: null,
              profile_url: null,
              partner_code: null,
              auth_provider: null,
            });
            toast.warn("No data returned from API, using provided data.");
          }
        } catch (error) {
          console.error("Error fetching app user details:", error);
          toast.error("Failed to fetch app user details.");
          setApiData({
            user_id: config.user_id || "",
            user_email: config.user_email || "",
            username: config.username || "",
            user_firstname: config.user_firstname || "",
            user_lastname: config.user_lastname || "",
            user_fullname: config.user_fullname || "",
            user_status: config.user_status ?? 0,
            phone_number: config.phone_number || "",
            user_gender: null,
            user_avatar: null,
            date_of_birth: null,
            job: null,
            created_at: "",
            updated_at: "",
            group_id: null,
            user_session: "",
            parent_id: null,
            province_id: null,
            district_id: null,
            ward_id: null,
            object_id: null,
            user_type: "",
            department: null,
            department_code: null,
            language_session: null,
            rank: null,
            company_name: null,
            date_start_work: null,
            profession: null,
            job_title: null,
            manager_email: null,
            is_head: "",
            department_v2: null,
            department_level2: null,
            test_mh: null,
            otp: null,
            otp_expired_at: null,
            json_data: null,
            keycloak_id: "",
            salesforce_id: null,
            salesforce_token: null,
            expertise: null,
            fcm_token: null,
            profile_url: null,
            partner_code: null,
            auth_provider: null,
          });
        }
      };

      fetchAppUserDetails();
    } else if (isOpen && mode === "add") {
      setApiData({
        user_id: "",
        user_email: "",
        username: "",
        user_firstname: "",
        user_lastname: "",
        user_fullname: "",
        user_status: 0,
        phone_number: "",
        user_gender: null,
        user_avatar: null,
        date_of_birth: null,
        job: null,
        created_at: "",
        updated_at: "",
        group_id: null,
        user_session: "",
        parent_id: null,
        province_id: null,
        district_id: null,
        ward_id: null,
        object_id: null,
        user_type: "",
        department: null,
        department_code: null,
        language_session: null,
        rank: null,
        company_name: null,
        date_start_work: null,
        profession: null,
        job_title: null,
        manager_email: null,
        is_head: "",
        department_v2: null,
        department_level2: null,
        test_mh: null,
        otp: null,
        otp_expired_at: null,
        json_data: null,
        keycloak_id: "",
        salesforce_id: null,
        salesforce_token: null,
        expertise: null,
        fcm_token: null,
        profile_url: null,
        partner_code: null,
        auth_provider: null,
      });
    }
  }, [isOpen, mode, config]);

  const fields : IFormField<IAppUserGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "user_id",
            label: "User ID",
            type: "text" as const,
            disabled: true,
            placeholder: "User ID",
          } as const,
        ]
      : []),
      
    {
      name: "user_email",
      label: "Email",
      type: "text" as const,
      required: true,
      placeholder: "Enter email",
      disabled: mode === "detail",
    },
    {
      name: "username",
      label: "Username",
      type: "text" as const,
      required: true,
      placeholder: "Enter username",
      disabled: mode === "detail",
    },
    {
      name: "user_firstname",
      label: "First Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter first name",
      disabled: mode === "detail",
    },
    {
      name: "user_lastname",
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
      name: "user_status",
      label: "Status",
      type: "text" as const,
      required: true,
      placeholder: "Enter status (1 for Active, 0 for Inactive)",
      disabled: mode === "detail",
    },
  ];

  return (
    <FormModal<IAppUserGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (Number(data.user_status) !== 0 && Number(data.user_status) !== 1) {
          toast.error("Status must be 0 (Inactive) or 1 (Active).");
          return;
        }
        const submitData: IAppUserGetApi = {
          ...data,
          user_fullname: `${data.user_firstname} ${data.user_lastname}`,
          user_status: Number(data.user_status),
          user_gender: data.user_gender ?? null,
          user_avatar: data.user_avatar ?? null,
          date_of_birth: data.date_of_birth ?? null,
          job: data.job ?? null,
          group_id: data.group_id ?? null,
          parent_id: data.parent_id ?? null,
          province_id: data.province_id ?? null,
          district_id: data.district_id ?? null,
          ward_id: data.ward_id ?? null,
          object_id: data.object_id ?? null,
          department: data.department ?? null,
          department_code: data.department_code ?? null,
          language_session: data.language_session ?? null,
          rank: data.rank ?? null,
          company_name: data.company_name ?? null,
          date_start_work: data.date_start_work ?? null,
          profession: data.profession ?? null,
          job_title: data.job_title ?? null,
          manager_email: data.manager_email ?? null,
          department_v2: data.department_v2 ?? null,
          department_level2: data.department_level2 ?? null,
          test_mh: data.test_mh ?? null,
          otp: data.otp ?? null,
          otp_expired_at: data.otp_expired_at ?? null,
          json_data: data.json_data ?? null,
          salesforce_id: data.salesforce_id ?? null,
          salesforce_token: data.salesforce_token ?? null,
          expertise: data.expertise ?? null,
          fcm_token: data.fcm_token ?? null,
          profile_url: data.profile_url ?? null,
          partner_code: data.partner_code ?? null,
          auth_provider: data.auth_provider ?? null,
        };
        await onSubmit(submitData);
      }}
      mode={mode}
      config={apiData}
      fields={fields}
      title={{
        add: "Add New App User",
        edit: "Edit App User",
        detail: "App User Details",
      }}
      description={{
        add: "Create a new App User with the details below.",
        edit: "Update the App User details to keep it up-to-date.",
        detail: "View the details of the App User below.",
      }}
      children={children}
    />
  );
};