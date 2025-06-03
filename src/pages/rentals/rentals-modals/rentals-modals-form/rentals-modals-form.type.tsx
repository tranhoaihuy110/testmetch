import { IRentalsGetApi } from "../../../../models";

export interface IRentalsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: IRentalsGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IRentalsGetApi | null;
  children?: React.ReactNode;
}
