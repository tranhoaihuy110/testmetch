import { ILeadsPropertyRoomsGetApi } from "../../../../models";

export interface IDeleteLeadsPropertyRoomsConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  config: ILeadsPropertyRoomsGetApi | null;
}