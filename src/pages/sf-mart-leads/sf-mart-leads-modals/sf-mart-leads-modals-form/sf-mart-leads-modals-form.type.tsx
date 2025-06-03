import { ISfMartLeadsGetApi } from "../../../../models";
export interface SfMartLeadsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ISfMartLeadsGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ISfMartLeadsGetApi;
  children?: React.ReactNode;
}
