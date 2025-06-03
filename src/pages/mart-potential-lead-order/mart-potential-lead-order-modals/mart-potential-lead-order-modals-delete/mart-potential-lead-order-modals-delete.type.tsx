import { IMartPotentialLeadOrderGetApi } from "../../../../models";
export interface DeleteMartPotentialLeadOrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: IMartPotentialLeadOrderGetApi | null;
}
