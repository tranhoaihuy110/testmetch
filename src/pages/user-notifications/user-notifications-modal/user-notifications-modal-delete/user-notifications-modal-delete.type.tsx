import { IUserNotificationsGetApi } from "../../../../models";
export interface DeleteUserNotificationsConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: IUserNotificationsGetApi | null;
}
