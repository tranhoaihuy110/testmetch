import { IEntityFileMappingGetApi } from "../../../../models";
export interface EntityFileMappingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IEntityFileMappingGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config: IEntityFileMappingGetApi;
  children?: React.ReactNode;
}
