import { ICommonMetadataFinalGetApi } from "../../../../models";
export interface DeleteCommonMetadataFinalConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: ICommonMetadataFinalGetApi | null;
}
