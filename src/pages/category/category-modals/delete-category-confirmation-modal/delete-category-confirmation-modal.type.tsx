import { IMetaDataApi } from "../../../../models";

export interface IDeleteCategoryConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  category: IMetaDataApi | null;
  children?: React.ReactNode;
}
