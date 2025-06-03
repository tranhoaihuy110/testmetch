import { IAppUserGetApi } from "../../../../models";
export interface IDeleteAppUserConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: IAppUserGetApi | null;
  children?: React.ReactNode;
}