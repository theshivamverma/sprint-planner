import { monthNames } from "./constant";
import { Milestone, Sprint } from "./types";

export const getMonthsArray = (startIndex: number, endIndex: number) => {
  let result = [];
  for (let i = startIndex; i <= endIndex; i++) {
    result.push({ mIndex: i, mName: monthNames[i] });
  }
  return result;
};

export const calculateWidth = (
  startDate: Date,
  endDate: Date,
  timeUnitWidth: number
) => {
  const result = (endDate.getTime() - startDate.getTime()) * timeUnitWidth;
  return result > 0 ? result : 10;
};

export const calculateOffset = (
  milestoneStartDate: string,
  startDate: Date,
  timeUnitWidth: number
) => {
  return (
    (new Date(milestoneStartDate).getTime() - startDate.getTime()) *
    timeUnitWidth
  );
};

export const pickColorBasedOnPriority = (priority: string): string => {
  switch (priority) {
    case "High":
      return "red";
    case "Medium":
      return "yellow";
    case "Low":
      return "green";
    default:
      return "gray";
  }
};

export const getTotalWidth = (
  startIndex: number,
  endIndex: number,
  year: number,
  timeUnitWidth: number
) => {
  let result = 0;
  for (let i = startIndex; i <= endIndex; i++) {
    result += calculateWidth(
      new Date(year, i, 1),
      new Date(year, i + 1, 0),
      timeUnitWidth
    );
  }
  return result;
};

export const getGanttChartDetails = (sprintData: Sprint[]) => {
  let startDate = new Date(sprintData[0]?.startDate);
  let startMonth = startDate.getMonth();
  let startYear = startDate.getFullYear();
  startDate = new Date(startYear, startMonth, 1);

  let endDate = new Date(sprintData[sprintData.length - 1]?.endDate);
  let endMonth = endDate.getMonth();
  let endYear = endDate.getFullYear();
  endDate = new Date(endYear, endMonth + 1, 0);

  let totalTime = endDate.getTime() - startDate.getTime();

  let timeUnitWidth = (0.8 * (window.innerWidth - 64)) / totalTime;

  const totalWidth = getTotalWidth(
    startMonth,
    endMonth,
    startYear,
    timeUnitWidth
  );

  return {
    startDate,
    endDate,
    startYear,
    startMonth,
    endMonth,
    totalTime,
    totalWidth,
    timeUnitWidth
  }
};

export const getSprintDetails = (sprint: Milestone) => {
  const sprintEndDate = new Date(sprint.endDate);
  let completedTasks = 0;
  let overFlowingTasks = 0;
  let isSprintOverflowing = false;
  for(const task of sprint.tasks){
    const taskEndDate = new Date(task.endDate);
    if(taskEndDate > sprintEndDate){
      isSprintOverflowing = true;
      overFlowingTasks += 1;
    }
    if (task.status === "Done") {
      completedTasks += 1;
    }
  }
  let sprintCompletedPercent = (100 * completedTasks) / sprint.tasks.length;

  let overflowingTasksPercent = (100 * overFlowingTasks) / sprint.tasks.length;

  return {isSprintOverflowing, sprintCompletedPercent, overflowingTasksPercent};
}

export const searchMilestones = (sprintData: Sprint[], searchString: string) => {
  const matchingMilestones = [];

  for (const sprint of sprintData) {
    for (const milestone of sprint.milestones) {
      if (milestone.milestoneName.toLowerCase().includes(searchString.toLowerCase())) {
        matchingMilestones.push(milestone);
      }
    }
  }

  return matchingMilestones;
}

export const getSprints = (sprintData: Sprint[]) => {
  const milestones = [];

  for (const sprint of sprintData) {
    for (const milestone of sprint.milestones) {
      milestones.push(milestone);
    }
  }

  return milestones;
}