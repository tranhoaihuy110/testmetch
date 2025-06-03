import { IUserFcmTokenGetApi } from "../../../../models";

export interface IDeleteUserFcmTokenConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: IUserFcmTokenGetApi | null;
}