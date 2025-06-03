import { ICommonMetadataGetApi } from "../../../../models";
export interface CommonMetadataFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ICommonMetadataGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ICommonMetadataGetApi;
  children?: React.ReactNode;
}
