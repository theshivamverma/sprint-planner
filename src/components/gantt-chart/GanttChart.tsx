import React from "react";
import { Sprint } from "../../common/types";
import { getStartAndEndMonth } from "../../common/utils";

import styles from "./GanttChart.module.css";

type GanttChartProps = {
  sprintData: Sprint[];
};

const GanttChart: React.FC<GanttChartProps> = ({ sprintData }) => {
  getStartAndEndMonth(sprintData);

  let startDate = new Date(sprintData[0]?.startDate);
  let startMonth = startDate.getMonth();
  let startYear = startDate.getFullYear();
  startDate = new Date(startYear, startMonth, 1);
  let endDate = new Date(sprintData[sprintData.length - 1]?.endDate);
  let endMonth = endDate.getMonth();
  let endYear = endDate.getFullYear();
  endDate = new Date(endYear, endMonth + 1, 0)
  let totalTime = endDate.getTime() - startDate.getTime();
  let timeUnitWidth = (0.8 * (window.innerWidth - 64)) / totalTime;

  console.log({ totalTime, timeUnitWidth, startDate, endDate });

  return (
    <div className={styles.ganttContainer}>
      <div className={styles.ganttHeader}>
        <div className={styles.filters}></div>
        <div className={styles.months}>
          {}
        </div>
      </div>
      <div className={styles.ganttData}>
        {sprintData.map((sprint, sprintIndex) => (
          <div
            key={sprintIndex}
            className={styles.sprint}
            style={{
              marginTop: sprintIndex === 0 ? 0 : 20,
            }}
          >
            {sprint.milestones.map((milestone, milestoneIndex) => (
              <div className={styles.milestone}>
                <div className={styles.milestoneDetails}>
                  <p>{milestone.milestoneName}</p>
                </div>
                <div key={sprintIndex} className={styles.milestoneGraph}>
                  <div
                    key={milestoneIndex}
                    className={styles.milestoneSegment}
                    style={{
                      left:
                        (new Date(milestone.startDate).getTime() -
                          startDate.getTime()) *
                        timeUnitWidth,
                      width:
                        (new Date(milestone.endDate).getTime() -
                          new Date(milestone.startDate).getTime()) *
                        timeUnitWidth,
                      backgroundColor: "blue", // Set task color as needed
                    }}
                  >
                    {/* task details or labels here */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
