import { Plus } from "lucide-react";
import {IAddButtonProps} from './index'


export const AddButton: React.FC<IAddButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 flex items-center gap-2 rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Add new item"
    >
      <Plus size={16} />
      Add
    </button>
  );
};