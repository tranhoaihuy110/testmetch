import { IPropertyOwnerShipGetApi } from "../../../../models";
export interface IDeletePropertyOwnerShipConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    config: IPropertyOwnerShipGetApi | null;
    children?: React.ReactNode;
  }