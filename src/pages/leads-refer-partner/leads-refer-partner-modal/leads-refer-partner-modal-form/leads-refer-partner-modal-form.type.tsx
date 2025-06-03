import { ILeadsReferPartnerGetApi } from "../../../../models";

export interface ILeadsReferPartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ILeadsReferPartnerGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadsReferPartnerGetApi | null;
  children?: React.ReactNode;
}