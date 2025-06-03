import { IPotentialLeadActionGetApi } from "../../../../models";

export interface IDeletePotentialLeadActionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: IPotentialLeadActionGetApi | null;
}