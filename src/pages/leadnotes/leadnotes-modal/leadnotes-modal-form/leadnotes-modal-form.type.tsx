import { ILeadNotesGetApi } from "../../../../models";

export interface ILeadNotesFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ILeadNotesGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadNotesGetApi | null;
  children?: React.ReactNode;
}
