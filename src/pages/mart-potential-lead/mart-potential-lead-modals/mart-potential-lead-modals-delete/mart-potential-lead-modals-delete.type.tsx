import { IMartPotentialLeadGetApi } from "../../../../models";
export interface DeleteMartPotentialLeadConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: IMartPotentialLeadGetApi | null;
}
