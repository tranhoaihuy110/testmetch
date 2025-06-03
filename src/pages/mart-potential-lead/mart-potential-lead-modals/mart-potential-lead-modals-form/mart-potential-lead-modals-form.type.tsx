import { IMartPotentialLeadGetApi } from "../../../../models";
export interface MartPotentialLeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IMartPotentialLeadGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IMartPotentialLeadGetApi;
  children?: React.ReactNode;
}
