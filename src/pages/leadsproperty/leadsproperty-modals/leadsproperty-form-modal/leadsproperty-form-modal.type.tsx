import { ILeadsPropertyGetApi } from "../../../../models";

export interface ILeadsPropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ILeadsPropertyGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadsPropertyGetApi | null;
  children?: React.ReactNode;
}
