import { IApiLogsGetApi } from "../../../../models";
export interface IApiLogsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "detail"; 
  config?: IApiLogsGetApi| null; 
  children?: React.ReactNode;
}