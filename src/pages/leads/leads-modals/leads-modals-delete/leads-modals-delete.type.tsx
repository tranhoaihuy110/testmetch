import { ILeadsGetApi } from "../../../../models";
export interface IDeleteLeadConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    config: ILeadsGetApi | null;
    children?: React.ReactNode;
  }