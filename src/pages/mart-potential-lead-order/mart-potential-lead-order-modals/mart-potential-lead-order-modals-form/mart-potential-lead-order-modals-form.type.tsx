import { IMartPotentialLeadOrderGetApi } from "../../../../models";
export interface MartPotentialLeadOrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IMartPotentialLeadOrderGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IMartPotentialLeadOrderGetApi;
  children?: React.ReactNode;
}
