import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import * as HoverCard from "@radix-ui/react-hover-card";
import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Milestone } from "../../common/types";
import {
  calculateOffset,
  calculateWidth,
  getSprintDetails,
} from "../../common/utils";

import styles from "./GanttChart.module.css";
import TaskRow from "./TaskRow";

type SprintRowProps = {
  milestone: Milestone;
  totalWidth: number;
  timeUnitWidth: number;
  startDate: Date;
};

const SprintRow: React.FC<SprintRowProps> = ({
  milestone,
  totalWidth,
  timeUnitWidth,
  startDate,
}) => {
  const [isRowExpanded, setIsRowExpanded] = React.useState<boolean>(false);
  const { sprintCompletedPercent, overflowingTasksPercent } =
    getSprintDetails(milestone);
  return (
    <Box>
      <Flex key={milestone.milestoneName} className={styles.milestone}>
        <Flex justify="between" className={styles.milestoneDetails}>
          <Text style={{ width: "90%" }} size="3" weight="medium">
            {milestone.milestoneName}
          </Text>
          <IconButton
            variant="soft"
            onClick={() => setIsRowExpanded(!isRowExpanded)}
          >
            {isRowExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </IconButton>
        </Flex>
        <Box
          className={styles.milestoneGraph}
          style={{
            width: totalWidth,
          }}
        >
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <Flex
                key={milestone.milestoneName}
                className={styles.milestoneSegment}
                style={{
                  left: calculateOffset(
                    milestone.startDate,
                    startDate,
                    timeUnitWidth
                  ),
                  width: calculateWidth(
                    new Date(milestone.startDate),
                    new Date(milestone.endDate),
                    timeUnitWidth
                  ),
                  border: `${
                    sprintCompletedPercent === 100
                      ? "none"
                      : "1px solid var(--sky-10)"
                  }`,
                }}
              >
                <Flex
                  style={{
                    height: "100%",
                    width: `${
                      sprintCompletedPercent - overflowingTasksPercent
                    }%`,
                    backgroundColor: `var(--sky-10)`,
                  }}
                  align="center"
                  justify="center"
                >
                  <Text style={{ fontSize: "0.7rem" }}>
                    {Math.round(sprintCompletedPercent)}%{" "}
                    {sprintCompletedPercent === 100 ? "Complete" : "Ongoing"}
                  </Text>
                </Flex>
                <Box
                  style={{
                    height: "100%",
                    width: `${overflowingTasksPercent}%`,
                    backgroundColor: `red`,
                  }}
                ></Box>
              </Flex>
            </HoverCard.Trigger>
            <HoverCard.Portal>
              <HoverCard.Content className={styles.sprintHoverCard}>
                <Flex direction="column" style={{ backgroundColor: "#fff" }}>
                  <Flex>
                    <Text size={"2"} style={{ width: "50%" }}>
                      <b>Sprint Name</b>:
                    </Text>
                    <Text size={"2"} style={{ width: "50%" }}>
                      {milestone.milestoneName}
                    </Text>
                  </Flex>
                  <Flex style={{ marginTop: "0.5rem" }}>
                    <Text size={"2"} style={{ width: "50%" }}>
                      <b>Summary</b>:
                    </Text>
                    <Text size={"2"} style={{ width: "50%" }}>
                      {milestone.milestoneSummary}
                    </Text>
                  </Flex>
                  <Flex style={{ marginTop: "0.5rem" }}>
                    <Text size={"2"} style={{ width: "50%" }}>
                      <b>Start date</b>:
                    </Text>
                    <Text size={"2"} style={{ width: "50%" }}>
                      {milestone.startDate}
                    </Text>
                  </Flex>
                  <Flex style={{ marginTop: "0.5rem" }}>
                    <Text size={"2"} style={{ width: "50%" }}>
                      <b>End date</b>:
                    </Text>
                    <Text size={"2"} style={{ width: "50%" }}>
                      {milestone.endDate}
                    </Text>
                  </Flex>
                </Flex>
                <HoverCard.Arrow className={styles.hoverCardArrow} />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </Box>
      </Flex>
      {isRowExpanded &&
        milestone.tasks.map((task) => (
          <TaskRow
            task={task}
            timeUnitWidth={timeUnitWidth}
            totalWidth={totalWidth}
            startDate={startDate}
          />
        ))}
    </Box>
  );
};

export default SprintRow;