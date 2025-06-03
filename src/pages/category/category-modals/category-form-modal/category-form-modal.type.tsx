import { IMetaDataApi } from "../../../../models";

export interface ICategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onSubmit: (service: IMetaDataApi) => void;
  mode: "add" | "edit" | "detail";
  category: IMetaDataApi | null;
  children?: React.ReactNode; 
}

