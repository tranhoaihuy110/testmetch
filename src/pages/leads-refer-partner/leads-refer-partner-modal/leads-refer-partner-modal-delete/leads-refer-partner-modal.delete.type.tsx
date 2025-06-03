import { ILeadsReferPartnerGetApi } from "../../../../models";

export interface IDeleteLeadsReferPartnerConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: ILeadsReferPartnerGetApi | null;
}