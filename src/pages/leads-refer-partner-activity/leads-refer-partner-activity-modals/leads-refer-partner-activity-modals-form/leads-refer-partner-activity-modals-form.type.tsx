import { ILeadsReferPartnerActivityGetApi } from "../../../../models";

export interface ILeadsReferPartnerActivityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ILeadsReferPartnerActivityGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: ILeadsReferPartnerActivityGetApi | null;
  children?: React.ReactNode;
}