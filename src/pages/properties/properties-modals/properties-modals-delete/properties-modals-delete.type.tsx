import { IPropertiesGetApi } from "../../../../models";

export interface IDeletePropertiesConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: IPropertiesGetApi | null;
}