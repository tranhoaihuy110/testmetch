import { IAppConfigGetApi } from "../../../../models";

export interface IAppConfigFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: (config: IAppConfigGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IAppConfigGetApi | null;
  children?: React.ReactNode;
}