import { ILeadNotesGetApi } from "../../../../models";

export interface IDeleteLeadNotesConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: ILeadNotesGetApi | null;
}