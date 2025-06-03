import { ICommonBranchPostcodeGetApi } from "../../../../models";
export interface ICommonBranchPostcodeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ICommonBranchPostcodeGetApi) => Promise<void>;
  mode: "detail" | "edit" | "add";
  config?: ICommonBranchPostcodeGetApi | null;
  children?: React.ReactNode;
}