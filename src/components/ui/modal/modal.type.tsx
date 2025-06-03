export interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: React.ReactNode;
    showCloseButton?: boolean; // New prop to control close button visibility
    isFullscreen?: boolean; // Default to false for backwards compatibility
  }