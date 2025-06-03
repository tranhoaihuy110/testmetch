import { IEntityFileMappingGetApi } from "../../../../models";
export interface DeleteEntityFileMappingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: IEntityFileMappingGetApi | null;
}