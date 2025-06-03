export type TNavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: TSubItem[];
};
export type TSubItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
  icon?: React.ReactNode; 
};