import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BiSortDown, BiSortUp } from "react-icons/bi";

import { CountDashboard } from "./Components/CountDashboard";
import { Table } from "./Components/Table";
import { PageSelector } from "./Components/PageSelector";

import { Dropdown } from "./Common/Components/Dropdown";
import RenderWhen from "./Common/helpers/RenderWhen";

import { ITableData, SORT_TYPE, TSortType } from "./types";

import { getTableData } from "./services";

import styles from "./app.module.css";

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

  const totalPages = useRef<number>(0);

  const [recordsPerPage, setRecordsPerPage] = useState<number>(5);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [sort, setSort] = useState<TSortType>({
    order: SORT_TYPE.ASC,
  });

  useEffect(() => {
    setIsLoading(true);
    getTableData().then((res) => {
      totalPages.current = Math.ceil(res.length / recordsPerPage);
      tableDataRef.current = res;
      setIsLoading(false);
    });
  }, []);

  const paginatedData = useMemo(() => {
    totalPages.current = Math.ceil(
      (tableDataRef?.current?.length ?? 0) / recordsPerPage
    );

    const startIndex = (currentPage - 1) * recordsPerPage;
    return tableDataRef.current?.slice(startIndex, startIndex + recordsPerPage);
  }, [tableDataRef?.current, currentPage, sort, recordsPerPage]);

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
      <h2 className={styles.header}>Highly-rated kickstarter projects</h2>

      <div className={styles.recordSelector}>
        <div>Records per page:</div>
        <Dropdown
          value={String(recordsPerPage)}
          options={["5", "10", "15", "20"]}
          onSelect={(val) => {
            setRecordsPerPage(Number(val));
            setCurrentPage(1);
          }}
        />
      </div>

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
                  className={styles.clickable}
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
                  className={styles.clickable}
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
          totalPages={totalPages.current}
          onPageChange={(page) => {
            setIsLoading(true);
            // why timeout?
            // to delay set, so until the skeleton loads
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
