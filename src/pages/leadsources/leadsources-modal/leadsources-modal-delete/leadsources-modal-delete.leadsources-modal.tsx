/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Modal, Button } from "../../../../components/index";
import { IDeleteLeadsourcesConfirmationModalProps } from "./index";
import { toast } from "react-toastify";

export const DeleteLeadsourcesConfirmationModal: React.FC<IDeleteLeadsourcesConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  config,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen || !config) return null;

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onClose();
      toast.success(`Lead sources "${config.source_id}" deleted successfully!`);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="relative w-full max-w-[500px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Delete Lead sources
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the Lead sources with ID{" "}
            <span className="font-medium">{config.source_id}</span>? This
            action cannot be undone.
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 lg:justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};