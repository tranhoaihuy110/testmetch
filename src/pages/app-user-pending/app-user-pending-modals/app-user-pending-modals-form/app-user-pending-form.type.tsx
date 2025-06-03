import { IAppUserPendingGetApi, } from "../../../../models";
export interface AppUserPendingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IAppUserPendingGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IAppUserPendingGetApi;
  children?: React.ReactNode;
}
