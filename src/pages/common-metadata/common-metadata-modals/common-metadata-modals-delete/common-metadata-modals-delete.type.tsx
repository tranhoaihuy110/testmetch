import { ICommonMetadataGetApi } from "../../../../models";
export interface DeleteCommonMetadataConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: ICommonMetadataGetApi | null;
}
