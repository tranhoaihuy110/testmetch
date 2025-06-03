import { ILeadsourcesGetApi } from "../../../../models";

export interface ILeadsourcesFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ILeadsourcesGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadsourcesGetApi | null;
  children?: React.ReactNode;
}
