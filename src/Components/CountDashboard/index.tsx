import { useMemo } from "react";
import { FaSackDollar } from "react-icons/fa6";
import { LiaMountainSolid } from "react-icons/lia";
import { FaChartBar } from "react-icons/fa";

import { ITableData } from "../../types";
import styles from "./dashboard.module.css";

type TCountDashboard = {
  tableData: ITableData[] | undefined;
};

export const CountDashboard = (props: TCountDashboard): JSX.Element => {
  const getStats = useMemo(() => {
    if (!props?.tableData || props.tableData.length === 0) {
      return {
        totalProjects: 0,
        highestAmount: 0,
        highestPercentage: 0,
      };
    }

    let highestPercentage = 0;
    let highestAmount = 0;

    for (const item of props.tableData) {
      if (item["percentage.funded"] > highestPercentage) {
        highestPercentage = item["percentage.funded"];
      }
      if (item["amt.pledged"] > highestAmount) {
        highestAmount = item["amt.pledged"];
      }
    }

    return {
      totalProjects: props.tableData.length,
      highestAmount,
      highestPercentage,
    };
  }, [props?.tableData]);

  return (
    <section className={styles.dashboardContainer}>
      <div className={styles.statsContainer}>
        <FaChartBar color="var(--info-base)" size="24" />
        <div className={styles.header}>
          <span>Total Projects</span>
          <div className={styles.counts}>{getStats?.totalProjects}</div>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <FaSackDollar color="var(--warning-base)" size="24" />
        <div className={styles.header}>
          <span>Highest Percentage funded</span>
          <div className={styles.counts}>{getStats?.highestPercentage}</div>
        </div>
      </div>
      <div className={styles.statsContainer}>
        <LiaMountainSolid size="24" color="var(--info-base)" />
        <div className={styles.header}>
          <span>Highest Amount pledged</span>
          <div className={styles.counts}>{getStats?.highestAmount}</div>
        </div>
      </div>
    </section>
  );
};
