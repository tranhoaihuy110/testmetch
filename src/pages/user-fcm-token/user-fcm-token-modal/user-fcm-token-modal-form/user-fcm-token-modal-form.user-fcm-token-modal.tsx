/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { FormModal } from "../../../../index";
import { toast } from "react-toastify";
import { IUserFcmTokenGetApi,IAppUserGetApi } from "../../../../models";
import {  searchAppUserApi } from "../../../../services";
import { UserFcmTokenFormModalProps } from "./index";
import { IFormField } from "../../../../components";
import debounce from "lodash/debounce";

export const UserFcmTokenFormModal: React.FC<UserFcmTokenFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  config,
  children = "",
}) => {
  const [formData, setFormData] = useState<IUserFcmTokenGetApi>(
    typeof config === "object" && config !== null
      ? {
          id: config.id || "",
          user_id: config.user_id || "",
          user_email: config.user_email || "",
          token: config.token || "",
          device_id: config.device_id || "",
          created_at: config.created_at || "",
          updated_at: config.updated_at || "",
        }
      : {
          id: "",
          user_id: "",
          user_email: "",
          token: "",
          device_id: "",
          created_at: "",
          updated_at: "",
        }
  );

  const [emailSuggestions, setEmailSuggestions] = useState<IAppUserGetApi[]>([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const emailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      if ((mode === "edit" || mode === "detail") && config) {
        setFormData({
          id: config.id || "",
          user_id: config.user_id || "",
          user_email: config.user_email || "",
          token: config.token || "",
          device_id: config.device_id || "",
          created_at: config.created_at || "",
          updated_at: config.updated_at || "",
        });
      } else if (mode === "add") {
        setFormData({
          user_id: "",
          user_email: "",
          token: "",
          device_id: "",
          created_at: "",
          updated_at: "",
        });
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
      }
    }
  }, [isOpen, mode, config]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailRef.current && !emailRef.current.contains(event.target as Node)) {
        setShowEmailSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchEmailSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
        console.log("Empty email search value, clearing suggestions");
        return;
      }
      try {
        const results = await searchAppUserApi({
          page: 1,
          size: 15,
          user_email: value,
        });
        setEmailSuggestions(results);
        setShowEmailSuggestions(results.length > 0);
        console.log("Search results for email:", results);
        if (results.length === 0) {
          toast.warn("No users found for the given email.");
        }
      } catch (error) {
        console.error("Error searching users by email:", error);
        toast.error("Failed to search users by email.");
        setEmailSuggestions([]);
        setShowEmailSuggestions(false);
      }
    }, 500),
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof IUserFcmTokenGetApi
  ) => {
    const { value } = e.target;
    console.log("Input change for field:", fieldName, "value:", value);
    setFormData((prev) => {
      const newFormData = { ...prev, [fieldName]: value };
      console.log("formData updated after input change:", newFormData);
      return newFormData;
    });
  };

  const fields: IFormField<IUserFcmTokenGetApi>[] = [
    ...(mode === "edit" || mode === "detail"
      ? [
          {
            name: "id",
            label: "ID",
            type: "text" as const,
            disabled: true,
            placeholder: "ID",
            value: formData.id,
          } as const,
        ]
      : []),
    {
      name: "user_email",
      label: "User Email",
      type: "text" as const,
      inputType: "email" as const,
      required: true,
      placeholder: "Enter user email",
      disabled: mode === "detail",
      value: formData.user_email,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        handleInputChange(e, "user_email");
        if (e.target instanceof HTMLInputElement) {
          searchEmailSuggestions(e.target.value);
        }
      },
      suggestions:
        showEmailSuggestions && emailSuggestions.length > 0
          ? emailSuggestions.map((user) => ({
              value: user.user_email || "",
              label: `${user.user_email} (User ID: ${user.user_id})`,
              onSelect: () => {
                const updatedData = {
                  user_email: user.user_email || "",
                  user_id: user.user_id || "",
                };
                setFormData((prev) => ({
                  ...prev,
                  user_email: updatedData.user_email,
                  user_id: updatedData.user_id,
                }));
                setShowEmailSuggestions(false);
                console.log("Selected email suggestion:", updatedData);
                return updatedData;
              },
            }))
          : [],
      suggestionRef: emailRef,
      clearable: mode !== "detail" && !!formData.user_email,
      onClear: () => {
        setFormData((prev) => ({
          ...prev,
          user_email: "",
          user_id: "",
        }));
        return { user_email: "", user_id: "" };
      },
    } as const,
    {
      name: "user_id",
      label: "User ID",
      type: "text" as const,
      required: true,
      placeholder: "Enter user ID",
      disabled: mode === "detail",
      value: formData.user_id,
      onChange: (e) => handleInputChange(e, "user_id"),
    } as const,
    {
      name: "token",
      label: "Token",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter token",
      rows: 6,
      disabled: mode === "detail",
      value: formData.token,
      onChange: (e) => handleInputChange(e, "token"),
    } as const,
    {
      name: "device_id",
      label: "Device ID",
      type: "textarea" as const,
      required: true,
      placeholder: "Enter device ID",
      rows: 6,
      disabled: mode === "detail",
      value: formData.device_id,
      onChange: (e) => handleInputChange(e, "device_id"),
    } as const,
  ];

  return (
    <FormModal<IUserFcmTokenGetApi>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={async (data) => {
        if (!(String(data.user_id ?? "").trim().length)) {
          throw new Error("Missing user ID");
        }
        if (!(String(data.token ?? "").trim().length)) {
          throw new Error("Missing token");
        }
        if (!(String(data.device_id ?? "").trim().length)) {
          throw new Error("Missing device ID");
        }
        let newMetadata: any;
        if (mode === "add") {
        newMetadata = {
          user_id: data.user_id,
          token: data.token,
          device_id: data.device_id,
        };
    } else {
        const now = new Date().toISOString();
         newMetadata = {
          id: data.id || undefined,
          user_id: data.user_id,
          user_email: data.user_email,
          token: data.token,
          device_id: data.device_id,
          created_at: data.created_at || now,
          updated_at: data.updated_at || now,
        };
      }
        await onSubmit(newMetadata);
        onClose();
      }}
      mode={mode}
      config={formData}
      fields={fields}
      title={{
        add: "Add New User FCM Token",
        edit: "Edit User FCM Token",
        detail: "User FCM Token Details",
      }}
      description={{
        add: "Create a new user FCM token with the details below.",
        edit: "Update the user FCM token details to keep it up-to-date.",
        detail: "View the details of the user FCM token below.",
      }}
      children={children}
    />
  );
};