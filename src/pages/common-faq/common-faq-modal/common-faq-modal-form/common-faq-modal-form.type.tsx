import { ICommonFaqGetApi } from "../../../../models";

export interface ICommonFaqFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ICommonFaqGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ICommonFaqGetApi | null;
  children?: React.ReactNode;
}