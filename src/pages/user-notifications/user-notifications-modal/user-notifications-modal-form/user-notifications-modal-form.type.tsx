import { IUserNotificationsGetApi } from "../../../../models";
export interface UserNotificationsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IUserNotificationsGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IUserNotificationsGetApi;
  children?: React.ReactNode;
}
