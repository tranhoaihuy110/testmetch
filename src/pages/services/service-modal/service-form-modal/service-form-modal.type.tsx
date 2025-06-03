import { IMetaDataApi } from "../../../../models";

export interface IServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: IMetaDataApi) => void;
  mode: "add" | "edit" | "detail";
  service: IMetaDataApi | null;
  children?: React.ReactNode;
}
