import { IUserProfileUrlMapGetApi } from "../../../../models";
export interface DeleteUserProfileUrlMapConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: IUserProfileUrlMapGetApi | null;
}
