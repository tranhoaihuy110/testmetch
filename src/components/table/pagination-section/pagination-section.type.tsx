export interface IPaginationSectionProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}