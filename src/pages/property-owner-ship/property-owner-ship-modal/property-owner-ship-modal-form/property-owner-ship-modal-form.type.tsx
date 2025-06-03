import { IPropertyOwnerShipGetApi,IPropertyOwnerShipPostApi } from "../../../../models";
export interface PropertyOwnerShipFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IPropertyOwnerShipPostApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IPropertyOwnerShipGetApi;
  children?: React.ReactNode;
}
