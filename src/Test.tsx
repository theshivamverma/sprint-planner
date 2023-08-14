import React from "react";
import { Sprint } from "./common/types"; // Define types as needed

interface GanttChartProps {
  sprints: Sprint[];
}

const GanttChart: React.FC<GanttChartProps> = ({ sprints }) => {
  const startDate = new Date(sprints[0]?.startDate);
  const endDate = new Date(sprints[sprints.length - 1]?.endDate);
  const totalTime = endDate.getTime() - startDate.getTime();
  const sprintHeight = 40;
  const taskHeight = 20;
  const timeUnitWidth = 800 / totalTime; // Adjust width based on your layout

  return (
    <div className="gantt-chart">
      {sprints.map((sprint, sprintIndex) => (
        <div
          key={sprintIndex}
          className="sprint-bar"
          style={{
            height: sprintHeight,
            marginTop: sprintIndex === 0 ? 0 : 20, // Adjust margin as needed
          }}
        >
          {sprint.milestones.map((milestone, milestoneIndex) => (
            <div
              key={milestoneIndex}
              className="milestone-segment"
              style={{
                left:
                  (new Date(milestone.startDate).getTime() -
                    startDate.getTime()) *
                  timeUnitWidth,
                width:
                  (new Date(milestone.endDate).getTime() -
                    new Date(milestone.startDate).getTime()) *
                  timeUnitWidth,
                height: taskHeight,
                backgroundColor: "blue", // Set task color as needed
              }}
            >
              {/* You can add task details or labels here */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GanttChart;
