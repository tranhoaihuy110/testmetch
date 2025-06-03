import { ILeadPropertyFloorsGetApi } from "../../../../models";
export interface DeleteLeadPropertyFloorsConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: ILeadPropertyFloorsGetApi | null;
}
