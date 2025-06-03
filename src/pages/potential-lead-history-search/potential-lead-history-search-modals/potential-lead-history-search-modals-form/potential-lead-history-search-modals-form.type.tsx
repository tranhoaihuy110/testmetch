import { IPotentialLeadHistorySearchGetApi } from "../../../../models";

export interface IPotentialLeadHistorySearchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: IPotentialLeadHistorySearchGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IPotentialLeadHistorySearchGetApi | null;
  children?: React.ReactNode;
}
