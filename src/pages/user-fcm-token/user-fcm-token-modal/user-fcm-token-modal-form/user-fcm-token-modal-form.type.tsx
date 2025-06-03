import { IUserFcmTokenGetApi } from "../../../../models";
export interface UserFcmTokenFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IUserFcmTokenGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IUserFcmTokenGetApi;
  children?: React.ReactNode;
}
