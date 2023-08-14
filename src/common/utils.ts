import { Sprint } from "./types";

export const getStartAndEndMonth = (sprints: Sprint[]) => {
  let startMonth = 0, endMonth = 0;
  sprints.forEach(sprint => {
    let sprintStartMonth = new Date(sprint.startDate).getMonth();
    let sprintEndMonth = new Date(sprint.endDate).getMonth();
    console.log({sprintStartMonth, sprintEndMonth})
    if(sprintStartMonth < startMonth) {
      startMonth = sprintStartMonth;
    }
    if(sprintEndMonth > endMonth){
      endMonth = sprintEndMonth;
    }
  })
  return { startMonth, endMonth };
}

const calculateWidth = (start: string, end: string) => {
  // Calculate the width of the bar
  // You'll need to implement this based on your scale
};

const calculateOffset = (date: string) => {
  // Calculate the offset of the segment
  // You'll need to implement this based on your scale
};

const pickColorBasedOnPriority = (priority: string): string => {
  // Choose a color based on priority
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