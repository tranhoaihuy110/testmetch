import { ISfMartLeadsGetApi } from "../../../../models";
export interface DeleteSfMartLeadsConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: ISfMartLeadsGetApi | null;
}
