import { ILeadAssignmentGetApi } from "../../../../models";
export interface IDeleteLeadAssignmentConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    config: ILeadAssignmentGetApi | null;
    children?: React.ReactNode;
  }