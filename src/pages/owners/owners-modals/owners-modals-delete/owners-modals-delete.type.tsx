import { IOwnersGetApi } from "../../../../models";
export interface DeleteOwnersConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: IOwnersGetApi | null;
}
