import { ILeadsPropertyRoomsGetApi } from "../../../../models";
export interface LeadsPropertyRoomsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ILeadsPropertyRoomsGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadsPropertyRoomsGetApi;
  children?: React.ReactNode;
}
