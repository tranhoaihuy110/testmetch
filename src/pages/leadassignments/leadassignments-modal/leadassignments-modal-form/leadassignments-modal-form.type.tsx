import { ILeadAssignmentGetApi,ILeadAssignmentPostApi } from "../../../../models";
export interface LeadAssignmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ILeadAssignmentPostApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadAssignmentGetApi;
  children?: React.ReactNode;
}
