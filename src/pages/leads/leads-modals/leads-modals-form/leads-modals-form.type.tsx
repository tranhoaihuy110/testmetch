import { ILeadsGetApi } from "../../../../models";
export interface ILeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ILeadsGetApi) => Promise<void>;
    mode: "add" | "edit" | "detail";
    config?: ILeadsGetApi;
    children?: React.ReactNode;
  }