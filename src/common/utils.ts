import { monthNames } from "./constant";
import { Milestone, Sprint } from "./types";

// returns month index and name between startMonth-index and endMonth-index
export const getMonthsArray = (startIndex: number, endIndex: number) => {
  let result = [];
  for (let i = startIndex; i <= endIndex; i++) {
    result.push({ mIndex: i, mName: monthNames[i] });
  }
  return result;
};

// calculate width of a sprint based on sprint startDate,sprint endDate and scale
export const calculateWidth = (
  startDate: Date,
  endDate: Date,
  timeUnitWidth: number
) => {
  const result = (endDate.getTime() - startDate.getTime()) * timeUnitWidth;
  return result > 0 ? result : 10;
};

// position of sprint bar based on sprint startDate and graph startDate
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

// returns totalWidth of the sprint bar baed on first month and last month among all the sprints
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


// return a list of values being used inside the gantt chart
export const getGanttChartDetails = (sprintData: Sprint[]) => {
  // start date of first sprint
  let startDate = new Date(sprintData[0]?.startDate);
  let startMonth = startDate.getMonth();
  let startYear = startDate.getFullYear();

  // set graph start date to 1st of the month
  startDate = new Date(startYear, startMonth, 1);

  // end date of last sprint
  let endDate = new Date(sprintData[sprintData.length - 1]?.endDate);
  let endMonth = endDate.getMonth();
  let endYear = endDate.getFullYear();

  // set end date to last day of the ending month
  endDate = new Date(endYear, endMonth + 1, 0);

  // calculate total time between the start date and end date
  let totalTime = endDate.getTime() - startDate.getTime();

  // generate scale based on total time and width allocated to the graph
  // total-screen-width - padding * percent based on UI
  let timeUnitWidth = (0.8 * (window.innerWidth - 64)) / totalTime;

  // width of the graph
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

// get details of each sprint, completion-percent, any task overflowing
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

// filtered sprints based on searchText
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

// get sprints out of JSON data
export const getSprints = (sprintData: Sprint[]) => {
  const milestones = [];

  for (const sprint of sprintData) {
    for (const milestone of sprint.milestones) {
      milestones.push(milestone);
    }
  }

  return milestones;
}