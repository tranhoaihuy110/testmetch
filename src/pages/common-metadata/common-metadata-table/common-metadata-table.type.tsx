import { ICommonMetadataGetApi } from "../../../models";
export interface ICommonMetaDataTableProps {
  children?: React.ReactNode;
}

export const columns = [
    { key: "id" as keyof ICommonMetadataGetApi, header: "ID" },
    {
      key: "meta_key" as keyof ICommonMetadataGetApi,
      header: "Key",
      render: (item: ICommonMetadataGetApi) => {
        const maxLength = 50;
        const displayKey =
          (item.meta_key || "").length > maxLength
            ? (item.meta_key || "").substring(0, maxLength) + "..."
            : item.meta_key || "";
        return <div>{displayKey}</div>;
      },
    },
    {
      key: "meta_values" as keyof ICommonMetadataGetApi,
      header: "Values",
      render: (item: ICommonMetadataGetApi) => {
        const maxLength = 80;
        const displayValues =
          (item.meta_values || "").length > maxLength
            ? (item.meta_values || "").substring(0, maxLength) + "..."
            : item.meta_values || "";
        return <div>{displayValues}</div>;
      },
    },
    {
      key: "created_at" as keyof ICommonMetadataGetApi,
      header: "Created At",
      render: (item: ICommonMetadataGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "actions" as keyof ICommonMetadataGetApi,
      header: "Actions",
    },
  ];