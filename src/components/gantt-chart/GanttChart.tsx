import React from "react";
import { Box, Flex, Separator, Text, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Milestone, Sprint } from "../../common/types";
import {
  calculateWidth,
  getGanttChartDetails,
  getMonthsArray,
  getSprints,
  searchMilestones,
} from "../../common/utils";
import { weeks } from "../../common/constant";

import styles from "./GanttChart.module.css";
import SprintRow from "./SprintRow";

type GanttChartProps = {
  sprintData: Sprint[];
};

const GanttChart: React.FC<GanttChartProps> = ({ sprintData }) => {
  const {
    startDate,
    startYear,
    startMonth,
    endMonth,
    timeUnitWidth,
    totalWidth,
  } = getGanttChartDetails(sprintData);

  const [searchText, setSearchText] = React.useState<string>("");
  const [filteredData, setFilteredData] = React.useState<Milestone[]>([]);

  React.useEffect(() => {}, [window.innerWidth]);

  React.useEffect(() => {
    setFilteredData([...searchMilestones(sprintData, searchText)]);
  }, [searchText]);

  return (
    <Box className={styles.ganttContainer}>
      <Flex className={styles.ganttHeader}>
        <Box className={styles.filters}>
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search milestones"
            />
          </TextField.Root>
        </Box>
        <Flex className={styles.months} align="center">
          {getMonthsArray(startMonth, endMonth).map((month) => {
            return (
              <Flex
                style={{
                  width: calculateWidth(
                    new Date(startYear, month.mIndex, 1),
                    new Date(startYear, month.mIndex + 1, 0),
                    timeUnitWidth
                  ),
                }}
                className={styles.month}
                align="center"
                justify="between"
                direction="column"
              >
                <Flex align="center">
                  <Text className={styles.monthName} size={"3"}>
                    {month.mName}
                  </Text>
                </Flex>
                <Flex className={styles.weeks} align="center">
                  {weeks.map((week, index) => (
                    <>
                      <Box className={styles.week}>
                        <Text size="2">{week}</Text>
                      </Box>
                      {index !== weeks.length - 1 && (
                        <Separator size={"2"} orientation="vertical" />
                      )}
                    </>
                  ))}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Box className={styles.ganttData}>
        {(searchText !== "" ? filteredData : getSprints(sprintData)).map(
          (milestone) => (
            <SprintRow
              milestone={milestone}
              timeUnitWidth={timeUnitWidth}
              totalWidth={totalWidth}
              startDate={startDate}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default GanttChart;
