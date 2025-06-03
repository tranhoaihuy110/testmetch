import { ILeadsReferPartnerActivityGetApi } from "../../../../models";

export interface IDeleteLeadsReferPartnerActivityConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset?: () => void;
  onConfirm: () => void;
  config: ILeadsReferPartnerActivityGetApi | null;
}