export type ITableData = {
  "s.no": number;
  "amt.pledged": number;
  "percentage.funded": number;
};

export enum SORT_TYPE {
  ASC = "asc",
  DES = "des",
}

export type TSortType = {
  order: SORT_TYPE;
  key?: keyof ITableData;
};
