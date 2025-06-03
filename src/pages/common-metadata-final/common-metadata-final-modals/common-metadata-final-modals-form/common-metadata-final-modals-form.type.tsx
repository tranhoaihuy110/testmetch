import { ICommonMetadataFinalGetApi } from "../../../../models";
export interface CommonMetadataFinalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ICommonMetadataFinalGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ICommonMetadataFinalGetApi;
  children?: React.ReactNode;
}
