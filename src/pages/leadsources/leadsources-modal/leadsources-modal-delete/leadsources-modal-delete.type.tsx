import { ILeadsourcesGetApi } from "../../../../models";

export interface IDeleteLeadsourcesConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: ILeadsourcesGetApi | null;
}