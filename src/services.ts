import axios from "./Common/services";
import { ITableData } from "./types";

export const getTableData = (): Promise<ITableData[]> => {
  const uri =
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
  return axios.get<ITableData[]>(uri).then((result) => {
    return result.data;
  });
};
