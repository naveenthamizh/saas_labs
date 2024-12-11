export interface CellProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  isLoading?: boolean;
}

export interface RowProps {
  children: React.ReactNode;
  isTableHeader?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  gridTemplateColumns?: string;
  height?: string;
  isLoading?: boolean;
}

export interface TableProps {
  children: React.ReactNode;
  gridTemplateColumns: string;
  className?: string;
  isLoading?: boolean;
}
