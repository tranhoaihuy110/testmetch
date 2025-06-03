import { IMetaDataApi } from "../../../../models";

export interface IDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  service: IMetaDataApi | null;
  children?: React.ReactNode;
}
