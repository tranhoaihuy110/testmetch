import React, { useState, useEffect } from "react";
import { useModal } from "../../../hooks/use-modal";
import { Modal, Button, Input, Label } from "../..";
import { toast } from "react-toastify";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {IFormModalProps,IFormField} from './index'

export const FormModal = <T extends Record<string, any>>({
  isOpen: initialIsOpen,
  onClose: externalOnClose,
  onSubmit,
  mode,
  config,
  fields,
  title,
  description,
  children,
}: IFormModalProps<T>) => {
  const { isOpen, openModal, closeModal } = useModal(initialIsOpen);
  const [formData, setFormData] = useState<T>(config || ({} as T));
  const [loading, setLoading] = useState(false);
  const [urlLists, setUrlLists] = useState<
    Record<string, { url: string; zoom: number }[]>
  >(
    fields.reduce((acc, field) => {
      if (field.type === "urlList") {
        acc[field.name as string] = field.defaultValue || [{ url: "", zoom: 1 }];
      }
      return acc;
    }, {} as Record<string, { url: string; zoom: number }[]>)
  );

  useEffect(() => {
    if (initialIsOpen !== isOpen) {
      if (initialIsOpen) {
        openModal();
        setLoading(false);
      } else {
        closeModal();
      }
    }
  }, [initialIsOpen, isOpen, openModal, closeModal]);

  useEffect(() => {
    if (isOpen && config) {
      console.log("Form config updated:", config);
      setFormData(config);
      fields.forEach((field) => {
        if (field.type === "urlList") {
          setUrlLists((prev) => ({
            ...prev,
            [field.name as string]: Array.isArray(config[field.name]) && config[field.name].length > 0
              ? config[field.name].map((item: any) => ({
                  url: item.url || "",
                  zoom: typeof item.zoom === "number" ? item.zoom : 1,
                }))
              : [{ url: "", zoom: 1 }],
          }));
        }
      });
    }
  }, [isOpen, config, fields]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: IFormField<T>
  ) => {
    const { name, value } = e.target;
    console.log("Input change:", { name, value });
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    field.onChange?.(e);
  };

  const handleAceEditorChange = (name: string, newValue: string) => {
    try {
      const parsedValue = newValue.trim() ? JSON.parse(newValue) : {};
      setFormData((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));
    } catch (error) {

    }
  };

  
  const handleUrlListChange = (
    fieldName: string,
    index: number,
    subField: "url" | "zoom",
    value: string
  ) => {
    setUrlLists((prev) => {
      const newList = [...prev[fieldName]];
      newList[index] = {
        ...newList[index],
        [subField]: subField === "zoom" ? parseInt(value) || 1 : value,
      };
      const updatedFormData = {
        ...formData,
        [fieldName]: newList.filter((item) => item.url.trim() !== ""),
      };
      setFormData(updatedFormData);
      return { ...prev, [fieldName]: newList };
    });
  };

  const addUrlListItem = (fieldName: string) => {
    setUrlLists((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], { url: "", zoom: 1 }],
    }));
  };

  const removeUrlListItem = (fieldName: string, index: number) => {
    setUrlLists((prev) => {
      const newList = prev[fieldName].filter((_, i) => i !== index);
      const updatedFormData = {
        ...formData,
        [fieldName]: newList.filter((item) => item.url.trim() !== ""),
      };
      setFormData(updatedFormData);
      return { ...prev, [fieldName]: newList };
    });
  };

  const handleClear = (field: IFormField<T>) => {
    const updates = field.onClear?.() || { [field.name]: "" };
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    for (const field of fields) {
      if (field.required) {
        if (field.type === "urlList") {
          const urls = formData[field.name];
          if (!urls || urls.every((item: any) => !item.url.trim())) {
            toast.error(`${field.label} must have at least one valid URL.`);
            setLoading(false);
            return;
          }
        } else if (!(formData[field.name]?.toString().trim() ?? "").length) {
          toast.error(`${field.label} is required.`);
          setLoading(false);
          return;
        }
      }
    }

    try {
      await onSubmit(formData);
      toast.success(
        mode === "add"
          ? `${title.add} added successfully!`
          : `${title.edit} updated successfully!`
      );
      closeModal();
      externalOnClose();
    } catch (err) {
      const error = err as { message: string; error?: string };
      const errorMessage =
        error.message || error.error || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isDetailMode = mode === "detail";

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        closeModal();
        externalOnClose();
      }}
      className="max-w-[900px] m-4"
    >
      <div className="no-scrollbar relative w-full max-w-[900px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {mode === "add"
              ? title.add
              : mode === "edit"
              ? title.edit
              : title.detail}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            {mode === "add"
              ? description.add
              : mode === "edit"
              ? description.edit
              : description.detail}
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
              {fields.map((field) => (
                <div
                  key={String(field.name)}
                  className={
                    field.type === "textarea" || field.type === "aceEditor" || field.type === "urlList" || field.type === "custom" || field.type === "array"
                      ? "lg:col-span-3"
                      : ""
                  }
                >
                  <Label>
                    {field.label}{" "}
                    {field.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </Label>
                  {field.type === "custom" ? (
                    field.renderValue ? (
                      <div className="mt-1">
                        {field.renderValue()}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No custom rendering provided.
                      </p>
                    )
                  ) : field.renderValue ? (
                    field.renderValue()
                  ) : field.type === "text" ? (
                    <div className="relative" ref={field.suggestionRef}>
                      <div className="flex items-center">
                        <Input
                          type={field.inputType || "text"}
                          name={String(field.name)}
                          value={formData[field.name] ?? ""}
                          onChange={(e) => handleInputChange(e, field)}
                          placeholder={field.placeholder}
                          disabled={loading || isDetailMode || field.disabled}
                        />
                        {field.clearable && formData[field.name] && !isDetailMode && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleClear(field)}
                            className="ml-2"
                            disabled={loading || field.disabled}
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
                          </Button>
                        )}
                      </div>
                      {field.suggestions && field.suggestions.length > 0 && (
                        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                          {field.suggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                              onClick={() => {
                                const updates = suggestion.onSelect();
                                setFormData((prev) => ({ ...prev, ...updates }));
                              }}
                            >
                              {suggestion.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={String(field.name)}
                      value={formData[field.name] ?? ""}
                      onChange={(e) => handleInputChange(e, field)}
                      placeholder={field.placeholder}
                      disabled={loading || isDetailMode || field.disabled}
                      rows={field.rows || 5}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-600"
                    />
                  ) : field.type === "aceEditor" ? (
                    <AceEditor
                      mode={field.aceOptions?.mode || "json"}
                      theme={field.aceOptions?.theme || "github"}
                      value={
                        formData[field.name]
                          ? JSON.stringify(formData[field.name], null, 2)
                          : ""
                      }
                      onChange={(value) =>
                        handleAceEditorChange(String(field.name), value)
                      }
                      name={String(field.name)}
                      editorProps={{ $blockScrolling: true }}
                      placeholder={field.placeholder}
                      setOptions={{
                        enableBasicAutocompletion:
                          field.aceOptions?.enableBasicAutocompletion ?? true,
                        enableLiveAutocompletion:
                          field.aceOptions?.enableLiveAutocompletion ?? true,
                        enableSnippets: field.aceOptions?.enableSnippets ?? true,
                        showLineNumbers:
                          field.aceOptions?.showLineNumbers ?? true,
                        tabSize: field.aceOptions?.tabSize ?? 2,
                        fontSize: field.aceOptions?.fontSize ?? 16,
                      }}
                      style={{
                        width: "100%",
                        height: field.aceOptions?.height || "150px",
                      }}
                      readOnly={loading || isDetailMode || field.disabled}
                    />
                  ) 
                  : field.type === "array" ? (
                    <textarea
                      name={String(field.name)}
                      value={(() => {
                        try {
                          const parsed = JSON.parse(
                            formData[field.name] || "[]"
                          );
                          return Array.isArray(parsed)
                            ? parsed.join("\n")
                            : formData[field.name] ?? "";
                        } catch (e) {
                          return formData[field.name] ?? "";
                        }
                      })()}
                      onChange={(e) => handleInputChange(e, field)}
                      placeholder={field.placeholder}
                      disabled={loading || isDetailMode || field.disabled}
                      rows={field.rows || 5}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-blue-400 dark:focus:ring-blue-600"
                    />
                  ): field.type === "urlList" ? (
                    <div>
                      {urlLists[field.name as string]?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center mb-2 gap-2"
                        >
                          <div className="flex-1">
                            <Input
                              type="text"
                              value={item.url || ""}
                              onChange={(e) =>
                                handleUrlListChange(
                                  String(field.name),
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                              placeholder={`Enter ${field.label} ${index + 1}`}
                              disabled={loading || isDetailMode || field.disabled}
                            />
                          </div>
                          <div className="w-20">
                            <Input
                              type="number"
                              value={item.zoom || 1}
                              onChange={(e) =>
                                handleUrlListChange(
                                  String(field.name),
                                  index,
                                  "zoom",
                                  e.target.value
                                )
                              }
                              placeholder="Zoom"
                              disabled={loading || isDetailMode || field.disabled}
                            />
                          </div>
                          {!isDetailMode && (
                            <div className="ml-2">
                              {index === urlLists[field.name as string].length - 1 && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addUrlListItem(String(field.name))}
                                  disabled={loading}
                                  className="mr-2"
                                >
                                  Add
                                </Button>
                              )}
                              {urlLists[field.name as string].length > 1 && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    removeUrlListItem(String(field.name), index)
                                  }
                                  disabled={loading}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                closeModal();
                externalOnClose();
              }}
              disabled={loading}
            >
              Close
            </Button>
            {!isDetailMode && (
              <Button size="sm" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
      {children}
    </Modal>
  );
};