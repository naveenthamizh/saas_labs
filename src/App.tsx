import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiSortDown, BiSortUp } from "react-icons/bi";

import { Table } from "./Components/Table";
import { PageSelector } from "./Components/PageSelector";

import { ITableData, SORT_TYPE } from "./types";

import styles from "./app.module.css";
import { CountDashboard } from "./Components/CountDashboard";
import RenderWhen from "./Common/RenderWhen";
import { getTableData } from "./services";

const tableHeader: Array<{ id: keyof ITableData; label: string }> = [
  {
    id: "s.no",
    label: "S.no",
  },
  { id: "percentage.funded", label: "Percentage Funded" },
  {
    id: "amt.pledged",
    label: "Amount Pledged",
  },
];

function App() {
  const tableDataRef = useRef<Array<ITableData> | undefined>();

  const [totalPages, setTotalPages] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sort, setSort] = useState<{
    order: SORT_TYPE;
    key?: keyof ITableData;
  }>({
    order: SORT_TYPE.ASC,
  });

  useEffect(() => {
    getTableData().then((res) => {
      setTotalPages(Math.ceil(res.length / 5));
      tableDataRef.current = res;
    });
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * 5;
    return tableDataRef.current?.slice(startIndex, startIndex + 5);
  }, [tableDataRef?.current, currentPage, sort]);

  const handleSortBasedonColumn = useCallback(
    (sortType: SORT_TYPE, key: keyof ITableData) => {
      if (sortType === SORT_TYPE.ASC) {
        tableDataRef.current?.sort((a, b) => a[key] - b[key]);
      } else {
        tableDataRef.current?.sort((a, b) => b[key] - a[key]);
      }
      setSort({
        order: sortType,
        key,
      });
    },
    [paginatedData, tableDataRef.current]
  );

  return (
    <section className={styles.tableContainer}>
      <div className={styles.CountDashboard}>
        <CountDashboard tableData={tableDataRef.current} />
      </div>
      <Table
        isLoading={isLoading}
        className={styles.tableWrapper}
        gridTemplateColumns={"1fr 1fr 1fr"}
      >
        <Table.Row isTableHeader>
          {tableHeader.map((header) => (
            <Table.Cell key={header.id}>
              {header.label} &nbsp;
              <RenderWhen.If
                isTrue={sort.order === SORT_TYPE.DES && header.id === "s.no"}
              >
                <BiSortDown
                  data-testid="sortSno"
                  size="20"
                  onClick={() =>
                    handleSortBasedonColumn(SORT_TYPE.ASC, header.id)
                  }
                />
              </RenderWhen.If>
              <RenderWhen.If
                isTrue={sort.order === SORT_TYPE.ASC && header.id === "s.no"}
              >
                <BiSortUp
                  data-testid="sortSno"
                  size="20"
                  onClick={() =>
                    handleSortBasedonColumn(SORT_TYPE.DES, header.id)
                  }
                />
              </RenderWhen.If>
            </Table.Cell>
          ))}
        </Table.Row>
        {paginatedData?.map((data) => (
          <Table.Row key={data["s.no"]}>
            <Table.Cell>{data["s.no"] + 1}</Table.Cell>
            <Table.Cell>{data["percentage.funded"]}</Table.Cell>
            <Table.Cell>{data["amt.pledged"]}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
      <div className={styles.paginationContainer}>
        <PageSelector
          totalPages={totalPages}
          onPageChange={(page) => {
            setIsLoading(true);
            setTimeout(() => {
              setCurrentPage(page);
              setIsLoading(false);
            }, 500);
          }}
          siblingCount={1}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}

export default App;
