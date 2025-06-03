import { IPotentialLeadHistorySearchGetApi } from "../../../../models";

export interface IDeletePotentialLeadHistorySearchConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: IPotentialLeadHistorySearchGetApi | null;
}