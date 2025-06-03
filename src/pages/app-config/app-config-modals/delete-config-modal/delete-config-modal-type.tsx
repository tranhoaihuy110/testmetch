import { IAppConfigGetApi } from "../../../../models";

export interface IDeleteAppConfigConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: IAppConfigGetApi | null;
}