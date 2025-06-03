import { ICommonBranchPostcodeGetApi } from "../../../../models";

export interface IDeleteCommonBranchPostcodeConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id:string) => void;
  config: ICommonBranchPostcodeGetApi | null;
}