import { IAppUserPendingGetApi } from "../../../../models";
export interface DeleteAppUserPendingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: IAppUserPendingGetApi | null;
}
