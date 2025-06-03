
import { useState } from "react";
import { toast } from "react-toastify";

export const useModal = <FormT>(initialFormData: FormT) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "detail">("add");
  const [currentItem, setCurrentItem] = useState<FormT | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

  const openAddModal = () => {
    setModalMode("add");
    setCurrentItem(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = async (
    fetchItemById: (id: string) => Promise<FormT>,
    id: string
  ) => {
    try {
      const formattedItem = await fetchItemById(id);
      setModalMode("edit");
      setCurrentItem(formattedItem);
      setIsModalOpen(true);
    } catch (err) {
      toast.error("Failed to fetch item for editing");
    }
  };

  const openDetailModal = async (
    fetchItemById: (id: string) => Promise<FormT>,
    id: string
  ) => {
    try {
      const formattedItem = await fetchItemById(id);
      setModalMode("detail");
      setCurrentItem(formattedItem);
      setIsModalOpen(true);
    } catch (err) {
      toast.error("Failed to fetch item for viewing details");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return {
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    openAddModal,
    openEditModal,
    openDetailModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
  };
};
