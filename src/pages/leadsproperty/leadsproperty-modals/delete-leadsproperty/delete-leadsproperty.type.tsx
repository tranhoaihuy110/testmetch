import { ILeadsPropertyGetApi } from "../../../../models";

export interface IDeleteLeadPropertyConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: ILeadsPropertyGetApi | null;
}