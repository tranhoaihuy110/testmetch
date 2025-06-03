import { ILeadPropertyFloorsGetApi } from "../../../../models";
export interface LeadsPropertyFloorsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ILeadPropertyFloorsGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadPropertyFloorsGetApi;
  children?: React.ReactNode;
}
