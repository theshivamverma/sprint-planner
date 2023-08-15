import React from "react";
import {
  Box,
  Flex,
  Text,
} from "@radix-ui/themes";
import * as HoverCard from "@radix-ui/react-hover-card";

import {  Task } from "../../common/types";
import {
  calculateOffset,
  calculateWidth,
} from "../../common/utils";
import { TaskColor } from "../../common/constant";

import styles from "./GanttChart.module.css";

type TaskRowProps = {
  task: Task;
  totalWidth: number;
  timeUnitWidth: number;
  startDate: Date;
};

const TaskRow: React.FC<TaskRowProps> = ({
  task,
  totalWidth,
  timeUnitWidth,
  startDate,
}) => {
  return (
    <Flex key={task.name} className={styles.milestone} style={{ margin: 0 }}>
      <Box
        className={styles.milestoneDetails}
        style={{ backgroundColor: "var(--sky-2)" }}
      >
        <Text size="2" weight="regular" style={{ marginLeft: "0.5rem" }}>
          {task.name}
        </Text>
      </Box>
      <Box
        className={styles.milestoneGraph}
        style={{
          width: totalWidth,
          backgroundColor: "var(--sky-2)",
        }}
      >
        <HoverCard.Root>
          <HoverCard.Trigger asChild>
            <Box
              key={task.name}
              className={styles.milestoneSegment}
              style={{
                left: calculateOffset(task.startDate, startDate, timeUnitWidth),
                width: calculateWidth(
                  new Date(task.startDate),
                  new Date(task.endDate),
                  timeUnitWidth
                ),
                backgroundColor: `${TaskColor[task.type] as string}`,
              }}
            ></Box>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content className={styles.sprintHoverCard}>
              <Flex direction="column" style={{ backgroundColor: "#fff" }}>
                <Flex>
                  <Text size={"2"} style={{ width: "40%" }}>
                    <b>Task Name</b>:
                  </Text>
                  <Text size={"2"} style={{ width: "50%" }}>
                    {task.name}
                  </Text>
                </Flex>
                <Flex style={{ marginTop: "0.5rem" }}>
                  <Text size={"2"} style={{ width: "40%" }}>
                    <b>Summary</b>:
                  </Text>
                  <Text size={"2"} style={{ width: "50%" }}>
                    {task.summary}
                  </Text>
                </Flex>
                <Flex style={{ marginTop: "0.5rem" }}>
                  <Text size={"2"} style={{ width: "40%" }}>
                    <b>Assignee</b>:
                  </Text>
                  <Text size={"2"} style={{ width: "50%" }}>
                    {task.assignee}
                  </Text>
                </Flex>
                <Flex style={{ marginTop: "0.5rem" }}>
                  <Text size={"2"} style={{ width: "40%" }}>
                    <b>Type</b>:
                  </Text>
                  <Text size={"2"} style={{ width: "50%" }}>
                    {task.type}
                  </Text>
                </Flex>
                <Flex style={{ marginTop: "0.5rem" }}>
                  <Text size={"2"} style={{ width: "40%" }}>
                    <b>Start date</b>:
                  </Text>
                  <Text size={"2"} style={{ width: "50%" }}>
                    {task.startDate}
                  </Text>
                </Flex>
                <Flex style={{ marginTop: "0.5rem" }}>
                  <Text size={"2"} style={{ width: "40%" }}>
                    <b>End date</b>:
                  </Text>
                  <Text size={"2"} style={{ width: "50%" }}>
                    {task.endDate}
                  </Text>
                </Flex>
              </Flex>
              <HoverCard.Arrow className={styles.hoverCardArrow} />
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </Box>
    </Flex>
  );
};

export default TaskRow;