import { ICommonFaqGetApi } from "../../../../models";

export interface IDeleteCommonFaqConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: ICommonFaqGetApi | null;
}