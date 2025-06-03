import { IUserProfileUrlMapGetApi } from "../../../../models";
export interface UserProfileUrlMapFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IUserProfileUrlMapGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IUserProfileUrlMapGetApi;
  children?: React.ReactNode;
}
