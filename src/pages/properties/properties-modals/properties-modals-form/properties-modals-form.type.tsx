import { IPropertiesGetApi } from "../../../../models";

export interface IPropertiesFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: IPropertiesGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IPropertiesGetApi | null;
  children?: React.ReactNode;
}
