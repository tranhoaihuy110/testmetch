import { IMetaDataApi } from "../../../../models";

export interface IDeletePartnerConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  partner: IMetaDataApi | null;
  children?: React.ReactNode;
}
