import { IOwnersGetApi } from "../../../../models";
export interface OwnersFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IOwnersGetApi) => Promise<void>;
  mode: "add" | "edit" | "detail";
  config?: IOwnersGetApi;
  children?: React.ReactNode;
}
