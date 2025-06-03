import { IRentalsGetApi } from "../../../../models";
export interface DeleteRentalsConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
  config: IRentalsGetApi | null;
}
