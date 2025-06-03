import {IAppUserGetApi } from "../../../../models";

export interface IAppUserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: IAppUserGetApi) => Promise<void>;
  mode: "add"| "edit" | "detail";
  config?: IAppUserGetApi | null;
  children?: React.ReactNode;
}
