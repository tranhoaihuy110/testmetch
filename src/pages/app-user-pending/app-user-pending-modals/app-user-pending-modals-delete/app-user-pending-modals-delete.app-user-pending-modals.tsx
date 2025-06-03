import React, { useState } from "react";
import { Modal, Button } from "../../../../components/index";
import { DeleteAppUserPendingConfirmationModalProps } from "./index";
import { toast } from "react-toastify";

export const DeleteAppUserPendingConfirmationModal: React.FC<
  DeleteAppUserPendingConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, config }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !config) return null;

  const handleConfirm = async () => {
    if (!config?.user_id) return;

    try {
      setIsDeleting(true);
      await onConfirm(config.user_id);
      onClose();
      toast.success(`Metadata with key "${config.username}" deleted successfully!`);
    } catch (error) {
      const err = error as { message: string; error?: string };
      const errorMessage =
        err.message || err.error || `Failed to delete metadata with key "${config.username}".`;
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[500px] m-4">
      <div className="relative w-full max-w-[500px] rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-8">
        <div className="px-2">
          <h4 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white/90">
            Delete Metadata
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete the metadata with key{" "}
            <span className="font-medium">
              {config.username.length > 50
                ? `${config.username.substring(0, 50)}...`
                : config.username}
            </span>
            ? This action cannot be undone.
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 lg:justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            className="rounded-full bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};